// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [threads, setThreads] = useState([]);

  const fetchThreads = (offset) => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`)
      .then(response => response.json())
      .then(data => {
          setThreads(data);
      })
      .catch(error => console.error('Error fetching threads:', error));
  };

  useEffect(() => {
    fetchThreads(0);
  }, []);

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
    </>
  );
}

export default App;
