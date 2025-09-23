import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RoleControl() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'Admin') {
      toast.error('Access denied');
      navigate('/');
    } else {
      toast.info('Welcome to Role Control');
    }
  }, [role, navigate]);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-secondary fw-bold">🛡️ Role Control Panel</Card.Title>
          <Card.Text className="text-muted">
            This section is under construction. Soon you'll be able to assign roles, manage permissions, and control access levels.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RoleControl;