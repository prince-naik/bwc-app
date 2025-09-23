import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddEventForm from './AddEventForm'; // adjust path if needed

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEvent, setEditEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents(res.data);
      toast.success('Events loaded!');
    } catch (err) {
      toast.error('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents(events.filter(e => e._id !== id));
      toast.success('Event deleted!');
    } catch (err) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3 text-primary">📅 Upcoming Events</Card.Title>

        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Loading events...</td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No events found. Add one above!
                </td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.date?.substring(0, 10)}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>{event.description}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => setEditEvent(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteEvent(event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {editEvent && (
          <AddEventForm
            initialData={editEvent}
            onSubmitComplete={() => {
              setEditEvent(null);
              fetchEvents();
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default EventList;