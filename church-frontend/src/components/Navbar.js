import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    toast.info('You have been logged out');
    setTimeout(() => navigate('/login'), 1000);
  };

  const isActive = path => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">
          BWC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link
                  as={Link}
                  to={
                    role === 'Admin' ? '/admin' :
                    role === 'Pastor' ? '/pastor' :
                    role === 'Volunteer' ? '/volunteer' :
                    '/member'
                  }
                  active={['/admin', '/pastor', '/volunteer', '/member'].includes(location.pathname)}
                >
                  Dashboard
                </Nav.Link>

                {(role === 'Admin' || role === 'Pastor') && (
                  <Nav.Link as={Link} to="/members" active={isActive('/members')}>
                    Members
                  </Nav.Link>
                )}

                {(role === 'Admin' || role === 'Pastor' || role === 'Volunteer') && (
                  <Nav.Link
                    as={Link}
                    to={role === 'Volunteer' ? '/eventm' : '/events'}
                    active={isActive(role === 'Volunteer' ? '/eventm' : '/events')}
                  >
                    Events
                  </Nav.Link>
                )}

                {(role === 'Admin' || role === 'Pastor') && (
                  <Nav.Link as={Link} to="/sermons" active={isActive('/sermons')}>
                    Sermons
                  </Nav.Link>
                )}

                {(role === 'Admin' || role === 'Pastor' || role === 'Volunteer') && (
                  <Nav.Link
                    as={Link}
                    to={role === 'Volunteer' ? '/youthm' : '/youth'}
                    active={isActive(role === 'Volunteer' ? '/youthm' : '/youth')}
                  >
                    Youth Tracker
                  </Nav.Link>
                )}

                {token && (
                  <Nav.Link
                    as={Link}
                    to={role === 'Admin' ? '/worshipvideos' : '/worshipvideosm'}
                    active={isActive(role === 'Admin' ? '/worshipvideos' : '/worshipvideosm')}
                  >
                    Worship Videos
                  </Nav.Link>
                )}

                {role === 'Admin' && (
                  <Nav.Link as={Link} to="/users" active={isActive('/users')}>
                    Manage Users
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>

          <Nav>
            {token ? (
              <>
                <Navbar.Text className="me-3 text-light">
                  Logged in as: <span className="text-info">{role}</span>
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={isActive('/login')}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" active={isActive('/signup')}>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;