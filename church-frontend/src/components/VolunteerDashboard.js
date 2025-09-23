import React, { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function VolunteerDashboard() {
  useEffect(() => {
    toast.info('Welcome, Volunteer! Your service makes a difference.');
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-success fw-bold">🤝 Volunteer Dashboard</Card.Title>
          <Card.Text className="text-muted">
            Welcome, Volunteer. You play a vital role in supporting events, youth ministry, and community service.
          </Card.Text>

          <div className="mt-4">
            <Button variant="success" as={Link} to="/eventm">
              View Events
            </Button>{' '}
            <Button variant="info" as={Link} to="/youthm">
              Youth Tracker
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default VolunteerDashboard;