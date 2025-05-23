import {
  Container, 
  Row, 
  Col, 
  Button, 
  Card, 
  CardHeader,
  CardBody, 
  Alert
} from 'reactstrap';
import './App.css';
import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserModal from './components/UserModal';
import apiService from './services/api';
import localStorageService from './services/localStorage';
import PaginationComponent from './components/Pagination';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

 useEffect(() => {
  const fetchInitialUsers = async () => {
    try {
      const data = await apiService.getUsers();
      const existingUsers = localStorageService.getUsers();

      const existingIds = new Set(existingUsers.map(user => user.id));

      const newUsers = data.users.filter(user => !existingIds.has(user.id));

      newUsers.forEach(user => localStorageService.addUser(user));

      setUsers(localStorageService.getUsers());
    } catch (error) {
      console.error('Error fetching initial users:', error);
    }
  };

  fetchInitialUsers();
}, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

const handleAddUser = (user) => {
  const newUser = localStorageService.addUser(user);
  setUsers(prev => [...prev, newUser]);
};

const handleUpdateUser = (user) => {
  const updated = localStorageService.updateUser(user);
  if (updated) {
    setUsers(prev =>
      prev.map(u => u.id === updated.id ? updated : u)
    );
  }
};

const handleEditUser = (user) => {
  setSelectedUser(user);
  setIsModalOpen(true);
};

const handleDeleteUser = (userId) => {
  const success = localStorageService.deleteUser(userId);
  if (success) {
    setUsers(prev => prev.filter(u => u.id !== userId));
  }
};

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
                    Showing {users.length} total users
                  </small>
                </div>
              </div>
              <div className='button-group'>
                <Button 
                  color="primary"
                  onClick={toggleModal}
                >
                  Add New User
                </Button>
                <Button 
                  color="success" 
                  size="sm"
                  onClick={() => setUsers(localStorageService.getUsers())}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <UserList 
  users={currentUsers} 
  onEditUser={handleEditUser}
  onDeleteUser={handleDeleteUser}
/>
              <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

<UserModal 
  isOpen={isModalOpen} 
  toggle={toggleModal} 
  onAddUser={handleAddUser}
  onUpdateUser={handleUpdateUser}
  selectedUser={selectedUser}
/>
    </Container>
  );
}

export default App;