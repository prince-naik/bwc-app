import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddSermonForm from './AddSermonForm';

function SermonList({ viewOnly = false }) {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSermon, setEditSermon] = useState(null);

  const userRole = localStorage.getItem('role');
  const isReadOnly = viewOnly || userRole === 'Member';

  const fetchSermons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sermons', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSermons(res.data);
      toast.success('Sermons loaded!');
    } catch (err) {
      toast.error('Failed to load sermons');
      console.error('Error fetching sermons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const deleteSermon = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/sermons/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSermons(sermons.filter(s => s._id !== id));
      toast.success('Sermon deleted!');
    } catch (err) {
      toast.error('Failed to delete sermon');
      console.error('Error deleting sermon:', err);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3 text-warning">📖 Sermon Archive</Card.Title>

        {!isReadOnly && !editSermon && (
          <AddSermonForm onSubmitComplete={fetchSermons} />
        )}

        <Table responsive bordered hover className="align-middle mt-4">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Speaker</th>
              <th>Date</th>
              <th>Video</th>
              <th>Tags</th>
              {!isReadOnly && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={!isReadOnly ? 6 : 5} className="text-center py-4">
                  Loading sermons...
                </td>
              </tr>
            ) : sermons.length === 0 ? (
              <tr>
                <td colSpan={!isReadOnly ? 6 : 5} className="text-center text-muted py-4">
                  No sermons uploaded yet.
                </td>
              </tr>
            ) : (
              sermons.map(sermon => (
                <tr key={sermon._id}>
                  <td>{sermon.title}</td>
                  <td>{sermon.speaker}</td>
                  <td>{sermon.date?.substring(0, 10)}</td>
                  <td>
                    {sermon.videoLink ? (
                      <a href={sermon.videoLink} target="_blank" rel="noopener noreferrer">
                        ▶ Watch
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>{sermon.tags?.join(', ')}</td>
                  {!isReadOnly && (
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => setEditSermon(sermon)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteSermon(sermon._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {!isReadOnly && editSermon && (
          <AddSermonForm
            initialData={editSermon}
            onSubmitComplete={() => {
              setEditSermon(null);
              fetchSermons();
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default SermonList;