import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddYouthForm({ initialData = null, onSubmitComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    mentor: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = initialData
        ? `http://localhost:5000/api/youth/${initialData._id}`
        : 'http://localhost:5000/api/youth';
      const method = initialData ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success(initialData ? 'Youth updated!' : 'Youth added!');
      setFormData({ name: '', age: '', gender: '', mentor: '', notes: '' });

      if (onSubmitComplete) onSubmitComplete();
    } catch (err) {
      toast.error(initialData ? 'Failed to update youth' : 'Failed to add youth');
    }
  };

  return (
    <Card className="shadow-sm mb-4 border-0 bg-light">
      <Card.Body>
        <Card.Title className="text-info fw-bold">
          {initialData ? '✏️ Edit Youth Profile' : '➕ Add Youth Profile'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>👤 Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>🎂 Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 16"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>⚧️ Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>🧑‍🏫 Mentor</Form.Label>
              <Form.Control
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                placeholder="Mentor's name"
              />
            </Col>
            <Col md={6}>
              <Form.Label>📝 Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special notes or background"
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            {initialData && (
              <Button variant="secondary" onClick={() => onSubmitComplete()}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="info" className="fw-bold">
              {initialData ? 'Save Changes' : '➕ Add Youth'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddYouthForm;