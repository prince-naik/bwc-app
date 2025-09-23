import React, { useEffect } from 'react';
import AddMemberForm from '../components/AddMemberForm';
import MemberList from '../components/MemberList';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Members() {
  useEffect(() => {
    toast.info('Welcome to the Members page!');
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-success fw-bold">👥 Church Members</h3>
      <AddMemberForm />
      <hr />
      <MemberList />
    </Container>
  );
}

export default Members;