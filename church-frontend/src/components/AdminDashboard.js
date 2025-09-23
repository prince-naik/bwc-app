import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [counts, setCounts] = useState({
    members: null,
    events: null,
    sermons: null
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [membersRes, eventsRes, sermonsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/members/count', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('http://localhost:5000/api/events/count', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('http://localhost:5000/api/sermons/count', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        setCounts({
          members: membersRes.data.count,
          events: eventsRes.data.count,
          sermons: sermonsRes.data.count
        });
        toast.success('Dashboard stats loaded!');
      } catch (err) {
        toast.error('Failed to load dashboard stats');
        console.error('Error fetching admin stats:', err);
      }
    };
    fetchCounts();
  }, []);

  const StatCard = ({ label, value, color }) => (
    <Card className="text-center border-0 bg-light">
      <Card.Body>
        <Card.Title className={`fw-bold ${color}`}>{label}</Card.Title>
        <div className="fs-4 fw-bold">
          {value === null ? <Spinner animation="border" size="sm" /> : value}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-danger fw-bold">🛠️ Admin Dashboard</Card.Title>
          <Card.Text className="text-muted">
            Welcome, Admin. You have full access to manage users, content, and system settings.
          </Card.Text>

          <Row className="mt-4">
            <Col md={4}>
              <StatCard label="👥 Members" value={counts.members} color="text-success" />
            </Col>
            <Col md={4}>
              <StatCard label="📅 Events" value={counts.events} color="text-primary" />
            </Col>
            <Col md={4}>
              <StatCard label="📖 Sermons" value={counts.sermons} color="text-warning" />
            </Col>
          </Row>

          <Card className="mt-4 bg-light border-0">
            <Card.Body>
              <Card.Title className="fw-bold text-secondary">🔧 Admin Tools</Card.Title>
              <ButtonGroup className="d-flex flex-wrap gap-2 mt-2">
                <Button variant="outline-danger" as={Link} to="/users">
                  🧑‍💼 Manage Users
                </Button>
                <Button variant="outline-info" as={Link} to="/youth">
                  🧒 Youth Tracker
                </Button>
                <Button variant="outline-success" as={Link} to="/members">
                  ➕ Add Member
                </Button>
                <Button variant="outline-primary" as={Link} to="/events">
                  ➕ Add Event
                </Button>
                <Button variant="outline-warning" as={Link} to="/sermons">
                  ➕ Add Sermon
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminDashboard;