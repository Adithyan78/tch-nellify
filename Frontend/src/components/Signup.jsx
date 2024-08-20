import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://tch-nellify-2.onrender.com/signup', { name, email, password });
      console.log('Sign-Up successful:', response.data);
      alert(`Account created for email: ${email}`);
      navigate('/signin');
      setState({
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Sign-Up error:', error);
      setError('Error signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
          width: 100%;
          max-width: 400px;
          margin: auto;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        button {
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
          background-color: #4ecdc4;
          color: #fff;
        }

        button:hover {
          background-color: #36b7a7;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 15px;
            max-width: 90%;
          }

          input {
            padding: 8px;
          }

          button {
            padding: 8px 16px;
            font-size: 14px;
          }

          h1 {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 10px;
            max-width: 95%;
          }

          input {
            padding: 6px;
          }

          button {
            padding: 6px 12px;
            font-size: 12px;
          }

          h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default SignUp;
