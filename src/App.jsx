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
      <Link to="/threads/new">スレッドをたてる</Link>
      <h2>新着スレッド</h2>
      <ul className="threads_list">
        {threads.map(thread => (
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`} state={{ title: thread.title }}>
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
      {showPreviousButton && <button onClick={() => fetchThreads(offset - 10)}>前の10件</button>}
      {showNextButton && <button onClick={() => fetchThreads(offset + 10)}>次の10件</button>}
    </>
  );
}

export default App;
