import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddWorshipVideoForm from './AddWorshipVideoForm';

function WorshipVideoList({ viewOnly = false }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editVideo, setEditVideo] = useState(null);

  const userRole = localStorage.getItem('role');
  const isReadOnly = viewOnly || userRole !== 'Admin';

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/worshipvideos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setVideos(res.data);
      toast.success('Worship videos loaded!');
    } catch (err) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteVideo = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/worshipvideos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setVideos(videos.filter(v => v._id !== id));
      toast.success('Video deleted!');
    } catch (err) {
      toast.error('Failed to delete video');
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3 text-success">🎵 Worship Video Archive</Card.Title>

        {!isReadOnly && !editVideo && (
          <AddWorshipVideoForm onSubmitComplete={fetchVideos} />
        )}

        <Table responsive bordered hover className="align-middle mt-4">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Artist</th>
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
                  Loading...
                </td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan={!isReadOnly ? 6 : 5} className="text-center text-muted py-4">
                  No worship videos uploaded yet.
                </td>
              </tr>
            ) : (
              videos.map(video => (
                <tr key={video._id}>
                  <td>{video.title}</td>
                  <td>{video.artist}</td>
                  <td>{video.date?.substring(0, 10)}</td>
                  <td>
                    {video.videoLink ? (
                      <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                        ▶ Watch
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>{video.tags?.join(', ')}</td>
                  {!isReadOnly && (
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => setEditVideo(video)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteVideo(video._id)}
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

        {!isReadOnly && editVideo && (
          <AddWorshipVideoForm
            initialData={editVideo}
            onSubmitComplete={() => {
              setEditVideo(null);
              fetchVideos();
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default WorshipVideoList;