import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddEventForm({ initialData = null, onSubmitComplete }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date?.substring(0, 10) || ''
      });
    }
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData
        ? `http://localhost:5000/api/events/${initialData._id}`
        : 'http://localhost:5000/api/events';
      const method = initialData ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success(initialData ? 'Event updated successfully!' : 'Event added successfully!');
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      if (onSubmitComplete) onSubmitComplete();
    } catch (err) {
      toast.error(initialData ? 'Failed to update event' : 'Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3 text-primary">
          {initialData ? '✏️ Edit Event' : '📅 Add New Event'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sunday Service"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 10:00 AM"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Church Hall"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief details about the event"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            {initialData && (
              <Button variant="secondary" onClick={onSubmitComplete}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={loading}>
              {loading
                ? initialData
                  ? 'Saving...'
                  : 'Adding...'
                : initialData
                ? 'Save Changes'
                : 'Add Event'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddEventForm;