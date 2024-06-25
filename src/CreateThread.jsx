// CreateThread.jsx

import { Link, useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.elements.body.value;

    const newThread = { title };
    fetch(`https://railway.bulletinboard.techtrain.dev/threads`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newThread)
      })
      .then(response => response.json())
      .then(data => {
        navigate('/');
      })
      .catch(error => console.error('Error fetching threads:', error));
  };

  return (
    <div>
      <Link to="/threads/new">スレッドをたてる</Link>
      <h2>スレッド新規作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="body">タイトル:</label>
          <input
            type="text"
            id="body"
            name="body"
            placeholder='スレッドタイトル'
            required
          />
        </div>
        <Link to="/">Topに戻る</Link>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default CreateThread;
