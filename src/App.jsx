import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Card, 
  CardHeader,
  CardBody, 
} from 'reactstrap';
import './App.css';
import UserList from './components/UserList';

function App() {

    const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    },
  ];

  if (users.length === 0) {
    return (
      <Alert color="info">
        No users found. Try adjusting your search filter or add a new user.
      </Alert>
    );
  }
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">User Management Application</h1>
          <p className="text-muted">
            This application demonstrates user management features using React, 
            including pagination, adding new users, editing existing users, and deleting users.
          </p>
          
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div className='text-start'>
                <h4 className="mb-0">User List</h4>
                <div>
                  <small className="text-muted me-2">
                    Showing page 1 of 1 (0 total users)
                  </small>
                </div>
              </div>
              <div className='button-group'>
                <Button 
            color="primary" 
          >
            Add New User
          </Button>
                <Button 
                  color="success" 
                  size="sm" 
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardBody>
               <UserList 
                    users={users} 
                  />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
