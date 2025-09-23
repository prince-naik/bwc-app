import React, { useEffect } from 'react';
import AddEventForm from '../components/AddEventForm';
import EventList from '../components/EventList';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Events() {
  useEffect(() => {
    toast.info('Welcome to the Events page!');
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-primary fw-bold">📅 Church Events</h3>
      <AddEventForm />
      <hr />
      <EventList />
    </Container>
  );
}

export default Events;