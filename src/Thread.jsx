// Thread.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams, Link, useLocation } from 'react-router-dom';

function Thread() {
  const { id } = useParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchPosts = (newOffset) => {
    if (newOffset >= 0) {
      fetch(`https://railway.bulletinboard.techtrain.dev/threads/${id}/posts?offset=${newOffset}`)
        .then(response => response.json())
        .then(data => {
          setPosts(data.posts);
          setOffset(newOffset); // offsetを更新
        })
        .catch(error => console.error('Error fetching posts:', error));
      } else {
      console.error('Invalid offset value. Please provide a non-negative integer.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const post = form.elements.post.value;

    const newPost = { post };
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
      fetchPosts(0); // 投稿成功後に最新の投稿一覧を再取得
    })
    .catch(error => console.error('Error posting:', error));
  };

  useEffect(() => {
    fetchPosts(offset); // 初回読み込み時にoffsetを指定してスレッドを取得
  }, [id, offset]);

  const showPreviousButton = offset > 0;
  const showNextButton = (posts.length > 0 && posts.length == 10);

  return (
    <>
    <header className="app-header">
      <h1 className="title">Bulletin Board</h1>
    </header>
    <main className="threads-section">
      <h2 className="section-title">
        {location.state?.title || 'スレッド'}
      </h2>
      <Link to="/" className="btn">
        <span className="btn-text-default">→　Back to Top</span>
        <span className="btn-text-hover">Back to Top</span>
      </Link>
    </main>

    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="post">text:</label>
        <input
          className="input-text"
          type="text"
          id="post"
          name="post"
          placeholder="Write a new post..."
          required
        />
      </div>
      <button className="input-btn" type="submit">Post</button>
    </form>

    <ul className="threads-list">
      {posts.map(post => (
        <li key={post.id} className="card">
          {post.post}
        </li>
      ))}
    </ul>

    {showPreviousButton && (
      <button className="page" onClick={() => fetchPosts(offset - 10)}>
        前の10件
      </button>
    )}
    {showNextButton && (
      <button className="page" onClick={() => fetchPosts(offset + 10)}>
        次の10件
      </button>
    )}
    </>
  );
}

export default Thread;
