import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

function UserList({ searchTerm = '', filterRole = '' }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
      toast.success('User list loaded!');
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Role updated!');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const deleteUser = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('User deleted!');
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;

    return matchesSearch && matchesRole;
  });

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-danger fw-bold">🧑‍💼 Manage Users</Card.Title>
        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No users match your filters.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Form.Select
                      value={user.role}
                      onChange={e => updateRole(user._id, e.target.value)}
                    >
                      <option>Admin</option>
                      <option>Pastor</option>
                      <option>Volunteer</option>
                      <option>Member</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default UserList;