import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      toast.success('Login successful!');
      setTimeout(() => {
        if (res.data.role === 'Admin') navigate('/admin');
        else if (res.data.role === 'Pastor') navigate('/pastor');
        else if (res.data.role === 'Volunteer') navigate('/volunteer');
        else navigate('/member');
      }, 1500);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(message);
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3 text-success">🔐 Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;