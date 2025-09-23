import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddSermonForm({ initialData = null, onSubmitComplete }) {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    notes: '',
    videoLink: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date?.substring(0, 10) || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : ''
      });
    }
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    try {
      const url = initialData
        ? `http://localhost:5000/api/sermons/${initialData._id}`
        : 'http://localhost:5000/api/sermons';
      const method = initialData ? 'put' : 'post';

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success(initialData ? 'Sermon updated successfully!' : 'Sermon uploaded successfully!');
      setFormData({
        title: '',
        speaker: '',
        date: '',
        notes: '',
        videoLink: '',
        tags: ''
      });
      if (onSubmitComplete) onSubmitComplete();
    } catch (err) {
      toast.error(initialData ? 'Failed to update sermon' : 'Failed to upload sermon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3 text-warning">
          {initialData ? '✏️ Edit Sermon' : '📖 Upload New Sermon'}
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
                  placeholder="e.g. Faith Over Fear"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Speaker</Form.Label>
                <Form.Control
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleChange}
                  placeholder="e.g. Pastor John"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
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
            <Col md={8}>
              <Form.Group>
                <Form.Label>Video Link</Form.Label>
                <Form.Control
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="e.g. https://youtube.com/..."
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Summary or key points from the sermon"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. faith, hope, grace"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            {initialData && (
              <Button variant="secondary" onClick={onSubmitComplete}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="warning" disabled={loading}>
              {loading
                ? initialData
                  ? 'Saving...'
                  : 'Uploading...'
                : initialData
                ? 'Save Changes'
                : 'Add Sermon'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddSermonForm;