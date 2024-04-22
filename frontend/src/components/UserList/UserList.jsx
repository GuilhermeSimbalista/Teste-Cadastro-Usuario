import React, { useCallback } from 'react';
import './UserList.css';

function UserList({ onEditUser, users, setUsers }) {
  const BASE_URL = 'http://localhost:8080/user/';

  const deleteUser = useCallback(async (userId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmDelete) {
      const response = await fetch(`${BASE_URL}${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = users.filter(user => user.code !== userId);
        setUsers(updatedUsers);
        alert('Usuário excluído com sucesso!');
      } else {
        alert('Falha ao excluir o usuário.');
      }
    }
  }, [users, setUsers]);

  return (
    <div className="list-container">
      <h2 className="list-title">Lista de Usuários</h2>
      <UserTable users={users} onEditUser={onEditUser} onDeleteUser={deleteUser} />
    </div>
  );
}

function UserTable({ users, onEditUser, onDeleteUser }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Foto</th>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow key={user.code} user={user} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
        ))}
      </tbody>
    </table>
  );
}

function UserRow({ user, onEditUser, onDeleteUser }) {
  return (
    <tr className="user-item">
      <td>{user.code}</td>
      <td>{user.photo && <img src={`http://localhost:8080/uploads/${user.photo}`} alt="User" className="user-image" />}</td>
      <td>{user.name}</td>
      <td>{user.birthDate}</td>
      <td>
        <span className="icon-edit" onClick={() => onEditUser(user)}>✏️</span>
        <span className="icon-delete" onClick={() => onDeleteUser(user.code)}>🗑️</span>
      </td>
    </tr>
  );
}

export default UserList;
