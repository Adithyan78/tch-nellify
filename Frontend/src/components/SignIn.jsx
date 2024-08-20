import React from 'react';
import axios from 'axios';
import { auth } from './firebaseConfig'; // Ensure firebaseConfig is correctly set up
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const googleAuthProvider = new GoogleAuthProvider();

function SignIn() {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    resetEmail: ''
  });
  const [isResetFormVisible, setResetFormVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
  
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
  
      // Send the ID token to your backend server
      const response = await axios.post('http://localhost:3000/login/google', { token: idToken });
      const { token, isAdmin } = response.data;
  
      // Store the token in local storage
      localStorage.setItem('token', token);
      console.log(token);
  
      // Route based on isAdmin flag
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/homeuser');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Error during Google Sign-In. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    setLoading(true);
    setError('');

    try {
      // Send email and password to the backend for authentication
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { token, isAdmin } = response.data; // Get token and isAdmin from backend response

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Route based on isAdmin flag
      if (isAdmin) {
        navigate('/admin'); // Redirect to admin page
      } else {
        navigate('/'); // Redirect to user page
      }
      setState({
        email: '',
        password: '',
        resetEmail: ''
      });
    } catch (error) {
      console.error('Sign-In error:', error);
      setError('Error signing in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/resetPassword', { email: state.resetEmail });
      alert('Password reset email sent!');
      setState({ ...state, resetEmail: '' });
      setResetFormVisible(false);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Error sending password reset email. Please check the email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      {isResetFormVisible ? (
        <div className="reset-password-form">
          <h1>Reset Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            name="resetEmail"
            value={state.resetEmail}
            onChange={handleChange}
          />
          <button onClick={handlePasswordReset} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
          <button onClick={() => setResetFormVisible(false)} disabled={loading}>
            Back to Sign In
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <a href="#" onClick={() => setResetFormVisible(true)}>Forgot your password?</a>
          <div className="button-container">
            <button
              type="button"
              className="google-sign-in-button"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <span className="google-icon"></span>
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      )}
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        button {
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
        }

        .google-sign-in-button {
          background-color: transparent;
          color: #333;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .google-sign-in-button:hover {
          background-color: transparent;
        }

        .google-icon {
          width: 34px;
          height: 34px;
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png');
          background-size: cover;
          background-repeat: no-repeat;
        }

        .reset-password-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .reset-password-form input {
          margin-bottom: 10px;
          width: 100%;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 10px;
          }

          button {
            font-size: 14px;
            padding: 8px 16px;
          }

          .google-icon {
            width: 28px;
            height: 28px;
          }

          .reset-password-form input,
          .form-container input {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 5px;
          }

          button {
            font-size: 12px;
            padding: 6px 12px;
          }

          .google-icon {
            width: 24px;
            height: 24px;
          }

          .reset-password-form input,
          .form-container input {
            font-size: 12px;
            padding: 8px;
          }

          .error {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default SignIn;
