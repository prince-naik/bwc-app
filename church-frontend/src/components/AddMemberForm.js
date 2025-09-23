import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddMemberForm({ initialData = null, onSubmitComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Member',
    email: '',
    phone: '',
    birthday: ''
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const url = initialData
        ? `http://localhost:5000/api/members/${initialData._id}`
        : 'http://localhost:5000/api/members';
      const method = initialData ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success(initialData ? 'Member updated successfully!' : 'Member added successfully!');
      setFormData({
        name: '',
        role: 'Member',
        email: '',
        phone: '',
        birthday: ''
      });
      if (onSubmitComplete) onSubmitComplete();
    } catch (error) {
      toast.error(initialData ? 'Failed to update member' : 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3 text-success">
          {initialData ? '✏️ Edit Member' : '👤 Add New Member'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  <option>Member</option>
                  <option>Pastor</option>
                  <option>Volunteer</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9845.."
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={formData.birthday?.substring(0, 10) || ''}
                  onChange={handleChange}
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
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? (initialData ? 'Saving...' : 'Adding...') : initialData ? 'Save Changes' : 'Add Member'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddMemberForm;