import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddYouthForm from './AddYouthForm';

function YouthList() {
  const [youth, setYouth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mentorFilter, setMentorFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [editYouth, setEditYouth] = useState(null);

  const userRole = localStorage.getItem('role');
  const isReadOnly = userRole === 'Volunteer';

  const fetchYouth = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/youth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setYouth(res.data);
      toast.success('Youth list loaded!');
    } catch (err) {
      toast.error('Failed to load youth');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  const deleteYouth = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/youth/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setYouth(youth.filter(y => y._id !== id));
      toast.success('Youth deleted!');
    } catch (err) {
      toast.error('Failed to delete youth');
    }
  };

  const filteredYouth = youth.filter(y => {
    const mentorMatch = y.mentor?.toLowerCase().includes(mentorFilter.toLowerCase());
    const ageMatch =
      ageFilter === '' ||
      (ageFilter === 'under18' && y.age < 18) ||
      (ageFilter === '18plus' && y.age >= 18);
    return mentorMatch && ageMatch;
  });

  const mentorCount = [...new Set(youth.map(y => y.mentor).filter(Boolean))].length;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-info fw-bold">👦 Youth Profiles</Card.Title>

        <Card className="mb-3 bg-light border-0">
          <Card.Body className="d-flex justify-content-around text-center">
            <div>
              <div className="fs-4 fw-bold text-info">{youth.length}</div>
              <div className="text-muted">Total Youth</div>
            </div>
            <div>
              <div className="fs-4 fw-bold text-success">
                {youth.filter(y => y.age < 18).length}
              </div>
              <div className="text-muted">Under 18</div>
            </div>
            <div>
              <div className="fs-4 fw-bold text-warning">{mentorCount}</div>
              <div className="text-muted">Mentors</div>
            </div>
          </Card.Body>
        </Card>

        <Form className="mb-3 d-flex gap-3">
          <Form.Control
            type="text"
            placeholder="Filter by mentor"
            value={mentorFilter}
            onChange={e => setMentorFilter(e.target.value)}
          />
          <Form.Select value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
            <option value="">All Ages</option>
            <option value="under18">Under 18</option>
            <option value="18plus">18+</option>
          </Form.Select>
        </Form>

        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mentor</th>
              <th>Notes</th>
              {!isReadOnly && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={isReadOnly ? 5 : 6} className="text-center py-4">Loading...</td></tr>
            ) : filteredYouth.length === 0 ? (
              <tr><td colSpan={isReadOnly ? 5 : 6} className="text-center text-muted py-4">No youth profiles found.</td></tr>
            ) : (
              filteredYouth.map(y => (
                <tr key={y._id}>
                  <td>{y.name}</td>
                  <td>{y.age}</td>
                  <td>{y.gender}</td>
                  <td>{y.mentor}</td>
                  <td>{y.notes}</td>
                  {!isReadOnly && (
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => setEditYouth(y)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteYouth(y._id)}
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

        {!isReadOnly && editYouth && (
          <AddYouthForm
            initialData={editYouth}
            onSubmitComplete={() => {
              setEditYouth(null);
              fetchYouth();
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default YouthList;