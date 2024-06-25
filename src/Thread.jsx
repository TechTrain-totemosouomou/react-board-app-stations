// Thread.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams, Link, useLocation } from 'react-router-dom';

function Thread() {
  const { id } = useParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);

  const fetchPosts = (offset) => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${id}/posts?offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(error => console.error('Error fetching posts:', error));
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
    fetchPosts(0);
  }, [id]);

  return (
    <>
      <Link to="/threads/new">スレッドをたてる</Link>
      <h2>{location.state?.title || 'スレッド'}</h2>
      <ul className="threads_list">
        {posts.map(post => (
          <li key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              name="post"
              placeholder='投稿しよう！'
              required
            />
          </div>
          <button type="submit">投稿</button>
        </form>
      </div>
    </>
  );
}

export default Thread;
