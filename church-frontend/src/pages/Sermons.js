import React, { useEffect } from 'react';
// import AddSermonForm from '../components/AddSermonForm';
import SermonList from '../components/SermonList';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Sermons() {
  useEffect(() => {
    toast.info('Welcome to the Sermon Archive!');
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-warning fw-bold">📖 Sermon Archive</h3>
      {/* <AddSermonForm /> */}
      <hr />
      <SermonList />
    </Container>
  );
}

export default Sermons;