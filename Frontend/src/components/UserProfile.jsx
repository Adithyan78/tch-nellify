import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    // Fetch all users if an authenticated user is logged in
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <h3>Users List</h3>
          <ul>
            {users.map((userData) => (
              <li key={userData.id}>{userData.email}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

export default UserProfile;
