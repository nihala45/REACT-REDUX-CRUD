import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false); // State to manage Create User Modal visibility
  const navigate = useNavigate();
  return (
    <div>
      <div className="user-list-container">
        <div className="header">
          <h2>User List</h2>
          <button
          className='create-user-button'
         
          >
            Create User
          </button>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            {users.map((user)=> {
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                {user.is_active ?(
                  <button style={{ background: "yellow", color: "black" }}>
                      Block
                  </button>
                ):(
                  <button style={{ background: "green" }}>
                    Unblock
                  </button>
                )}
                <button>Edit</button>
                <button>Delete</button>
                </td>
              </tr>
            })}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome

