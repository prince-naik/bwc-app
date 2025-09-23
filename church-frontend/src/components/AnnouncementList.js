import React, { useEffect, useState } from 'react';
import { Container, Card, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/announcements', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAnnouncements(res.data);
        toast.success('Announcements loaded!');
      } catch (err) {
        toast.error('Failed to fetch announcements');
        console.error('Error:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-info fw-bold">📣 Church Announcements</Card.Title>
          {announcements === null ? (
            <Spinner animation="border" />
          ) : announcements.length === 0 ? (
            <p className="text-muted">No announcements yet.</p>
          ) : (
            announcements.map(a => (
              <Card className="mb-3" key={a._id}>
                <Card.Body>
                  <Card.Title>
                    {a.title}{' '}
                    <Badge bg={
                      a.urgency === 'High' ? 'danger' :
                      a.urgency === 'Medium' ? 'warning' : 'secondary'
                    }>
                      {a.urgency}
                    </Badge>
                  </Card.Title>
                  <Card.Text>{a.message}</Card.Text>
                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Posted on {new Date(a.createdAt).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AnnouncementList;