import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddYouthForm from '../components/AddYouthForm';
import YouthList from '../components/YouthList';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Youth() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!['Admin', 'Pastor', 'Volunteer'].includes(role)) {
      toast.error('Access denied');
      navigate('/');
    } else {
      toast.info('Welcome to the Youth Tracker!');
    }
  }, [role, navigate]);

  return (
    <Container className="mt-4">
      <h3 className="text-info fw-bold">🧒 Youth Tracker</h3>
      <AddYouthForm />
      <hr />
      <YouthList />
    </Container>
  );
}

export default Youth;