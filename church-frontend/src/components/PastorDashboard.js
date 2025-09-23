import React, { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function PastorDashboard() {
  useEffect(() => {
    toast.info('Welcome, Pastor! Ready to lead and inspire.');
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-primary fw-bold">📖 Pastor Dashboard</Card.Title>
          <Card.Text className="text-muted">
            Welcome, Pastor. You can manage sermons, post announcements, and guide the congregation.
          </Card.Text>

          <div className="mt-4">
            <Button variant="primary" as={Link} to="/sermons">
              Manage Sermons
            </Button>{' '}
            <Button variant="warning" as={Link} to="/announcements/new">
              Post Announcement
            </Button>{' '}
            <Button variant="outline-info" as={Link} to="/announcements">
              View Announcements
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PastorDashboard;