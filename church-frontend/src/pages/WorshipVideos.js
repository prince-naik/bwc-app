import React, { useEffect } from 'react';
import WorshipVideoList from '../components/WorshipVideoList';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function WorshipVideos() {
  useEffect(() => {
    toast.info('Welcome to the Worship Video Archive!');
  }, []);

  return (
    <Container className="mt-4">
      <WorshipVideoList />
    </Container>
  );
}

export default WorshipVideos;