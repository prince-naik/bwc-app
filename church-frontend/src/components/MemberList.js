import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddMemberForm from './AddMemberForm'; // adjust path if needed

function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMember, setEditMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMembers(res.data);
      toast.success('Members loaded!');
    } catch (err) {
      toast.error('Failed to load members');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const deleteMember = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMembers(members.filter(m => m._id !== id));
      toast.success('Member deleted!');
    } catch (error) {
      toast.error('Failed to delete member');
      console.error('Error deleting member:', error);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3 text-success">👥 Church Members</Card.Title>

        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Loading members...</td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No members found. Add one above!
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.birthday?.substring(0, 10)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => setEditMember(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteMember(member._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {editMember && (
          <AddMemberForm
            initialData={editMember}
            onSubmitComplete={() => {
              setEditMember(null);
              fetchMembers();
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default MemberList;