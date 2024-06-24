// Thread.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';

function Thread() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const fetchThreads = (offset) => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${id}/posts?offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(error => console.error('Error fetching threads:', error));
  };

  useEffect(() => {
    fetchThreads(0);
  }, [id]);

  return (
    <>
      <h2>新着投稿</h2>
      <ul className="threads_list">
        {posts.map(post => (
          <li key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Thread;
