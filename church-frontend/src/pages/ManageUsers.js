import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ManageUsers() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    if (role !== 'Admin') {
      toast.error('Access denied');
      navigate('/');
    } else {
      toast.info('Welcome to User Management');
    }
  }, [role, navigate]);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-danger fw-bold">🧑‍💼 User Management Panel</Card.Title>
          <Card.Text className="text-muted">
            View, filter, and manage all registered users. You can change roles or remove accounts.
          </Card.Text>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="🔍 Search by name or email"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
              >
                <option value="">Filter by role</option>
                <option>Admin</option>
                <option>Pastor</option>
                <option>Volunteer</option>
                <option>Member</option>
              </Form.Select>
            </Col>
          </Row>

          <UserList searchTerm={searchTerm} filterRole={filterRole} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManageUsers;