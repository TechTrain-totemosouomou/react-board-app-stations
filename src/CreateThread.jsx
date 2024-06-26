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
    <>
    <header className="app-header">
      <h1 className="title">Bulletin Board</h1>
    </header>
    <main className="threads-section">
      <h2 className="section-title">Create New Thread</h2>
      <Link to="/" className="btn">
        Back to Top
      </Link>
    </main>

    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="body">text:</label>
        <input
          className="input-text"
          type="text"
          id="body"
          name="body"
          placeholder="Thread Title"
          required
        />
      </div>
      <button className="input-btn" type="submit">Create Thread</button>
    </form>
    </>
  );
};

export default CreateThread;
