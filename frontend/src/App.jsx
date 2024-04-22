import React, { useState, useEffect } from 'react';
import UserList from './components/UserList/UserList';
import UserForm from './components/userForm/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8080/user');
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const resetFormAndExitEditMode = () => {
    fetchUsers();
    setCurrentUser(null);
    setEditMode(false);
  };

  return (
    <div className="app">
      <UserForm
        currentUser={currentUser}
        editMode={editMode}
        onUserAdded={resetFormAndExitEditMode}
        onUserUpdated={resetFormAndExitEditMode}
      />
      <UserList users={users} setUsers={setUsers} onEditUser={handleEditUser} />
    </div>
  );
}

export default App;
