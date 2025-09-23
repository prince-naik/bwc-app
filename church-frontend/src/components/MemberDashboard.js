import React, { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MemberDashboard() {
  useEffect(() => {
    toast.info('Welcome to your dashboard!');
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-warning fw-bold">👥 Member Dashboard</Card.Title>
          <Card.Text className="text-muted">
            Welcome! Explore sermons, upcoming events, and church announcements.
          </Card.Text>

          <div className="mt-4">
            <Button variant="outline-primary" as={Link} to="/sermonm">
              View Sermons
            </Button>{' '}
            <Button variant="outline-success" as={Link} to="/eventm">
              View Events
            </Button>{' '}
            <Button variant="outline-warning" as={Link} to="/announcements">
              Read Announcements
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MemberDashboard;