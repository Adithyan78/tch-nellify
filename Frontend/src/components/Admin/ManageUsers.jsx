import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css'; // Import the CSS file

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/users');
        console.log('Fetched users:', response.data); // Log the data for debugging
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (uid) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${uid}`);
      setUsers(users.filter(user => user.uid !== uid));
    } catch (error) {
      setError('Error deleting user.');
      console.error('Error deleting user:', error);
    }
  };

  const googleLogins = users.filter(user => user.avatar);
  const normalLogins = users.filter(user => !user.avatar);

  return (
    <div className="admin-page">
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <h2>Google Logins</h2>
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>UID</th>
                <th>Login Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {googleLogins.map((user) => (
                <tr key={user.uid}> {/* Ensure uid is unique */}
                  <td>
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <span>No avatar</span>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.uid}</td>
                  <td>{user.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}</td> {/* Handle undefined or null loginTime */}
                  <td>
                    <button onClick={() => handleDelete(user.uid)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Normal Logins</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Login Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {normalLogins.map((user) => (
                <tr key={user.uid}> {/* Ensure uid is unique */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}</td> {/* Handle undefined or null loginTime */}
                  <td>
                    <button onClick={() => handleDelete(user.uid)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ManageUsers;
