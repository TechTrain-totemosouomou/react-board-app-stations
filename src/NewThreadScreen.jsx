// NewThreadScreen.jsx

import { Link } from 'react-router-dom';

const NewThreadScreen = () => {

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
          console.log(data);
      })
      .catch(error => console.error('Error fetching threads:', error));
  };

  return (
    <div>
      <Link to="/">新着スレッド</Link>
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="body">タイトル:</label>
          <input
            type="text"
            id="body"
            name="body"
            required
          />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default NewThreadScreen;
