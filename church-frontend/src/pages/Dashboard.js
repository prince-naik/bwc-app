import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
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
        console.error('Error fetching dashboard counts:', err);
      }
    };
    fetchCounts();
  }, []);

  const StatCard = ({ icon, label, value, color }) => (
    <Card className="text-center border-0 bg-light">
      <Card.Body>
        <div className={`fs-2 ${color}`}>{icon}</div>
        <Card.Title className="mt-2">{label}</Card.Title>
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
          <Card.Title className="mb-3 text-primary fw-bold">
            ⛪ Welcome to Bethal Worship Center Dashboard
          </Card.Title>
          <Card.Text className="text-muted">
            Use the navigation bar above to manage church members, events, sermons, and more.
          </Card.Text>

          <Row className="mt-4">
            <Col md={4}>
              <StatCard icon="👥" label="Members" value={counts.members} color="text-success" />
            </Col>
            <Col md={4}>
              <StatCard icon="📅" label="Events" value={counts.events} color="text-primary" />
            </Col>
            <Col md={4}>
              <StatCard icon="📖" label="Sermons" value={counts.sermons} color="text-warning" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;