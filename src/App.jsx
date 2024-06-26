// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [threads, setThreads] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchThreads = (newOffset) => {
    if (newOffset >= 0) {
      fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${newOffset}`)
        .then(response => response.json())
        .then(data => {
          setThreads(data);
          setOffset(newOffset); // offsetを更新
        })
        .catch(error => console.error('Error fetching threads:', error));
    } else {
      console.error('Invalid offset value. Please provide a non-negative integer.');
    }
  };

  useEffect(() => {
    fetchThreads(offset); // 初回読み込み時にoffsetを指定してスレッドを取得
  }, [offset]);

  const showPreviousButton = offset > 0;
  const showNextButton = (threads.length > 0 && threads.length == 10);

  return (
    <>
    <header className="app-header">
      <h1 className="title">Bulletin Board</h1>
    </header>
    <main className="threads-section">
      <h2 className="section-title">Threads</h2>
      <Link to="/threads/new" className="btn">
        Create New Thread
      </Link>
    </main>

    <ul className="threads-list">
      {threads.map(thread => (
        <Link to={`/threads/${thread.id}`} state={{ title: thread.title }}>
          <li key={thread.id} className="card">
            {thread.title}
          </li>
        </Link>
      ))}
    </ul>

    {showPreviousButton && (
      <button className="page" onClick={() => fetchThreads(offset - 10)}>
        前の10件
      </button>
    )}
    {showNextButton && (
      <button className="page" onClick={() => fetchThreads(offset + 10)}>
        次の10件
      </button>
    )}
    </>
  );
}

export default App;
