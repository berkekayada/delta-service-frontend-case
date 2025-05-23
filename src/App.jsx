import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Card, 
  CardHeader, 
  CardBody,
  Spinner,
  Badge,
  Toast,
  ToastHeader,
  ToastBody
} from 'reactstrap';
import './App.css';
import UserList from './components/UserList';
import FilterComponent from './components/FilterComponent';
import Pagination from './components/Pagination';
import UserModal from './components/UserModal';
import apiService from './services/api';
import localStorageService from './services/localStorage';

function App() {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [localUsers, setLocalUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [searchMetadata, setSearchMetadata] = useState({
    isAdvanced: false,
    fields: {},
    isPhoneSearch: false
  });

  const limit = 10;
  const showToast = (message, type = 'success') => {
  setToastMessage(message);
  setToastType(type);
  setToastOpen(true);
  setTimeout(() => setToastOpen(false), 3000);
};
  const lastRequestRef = useRef({
    page: 0,
    query: '',
    metadata: null
  });
  
  const fetchUsers = useCallback(async () => {
    try {
      const skip = (currentPage - 1) * limit;
      
      const currentRequest = {
        page: currentPage,
        query: searchQuery,
        metadata: JSON.stringify(searchMetadata)
      };
      
      if (lastRequestRef.current.page === currentRequest.page && 
          lastRequestRef.current.query === currentRequest.query && 
          lastRequestRef.current.metadata === currentRequest.metadata &&
          users.length > 0) {
        return;
      }
      
      lastRequestRef.current = currentRequest;
      
      setLoading(true);
      
      const data = await apiService.getUsers(limit, skip, searchQuery, 
        searchMetadata.isPhoneSearch ? { 
          isPhoneSearch: true, 
          phoneQuery: searchMetadata.fields?.phone || searchQuery 
        } : undefined);
      
      
      setTotalUsers(data.total);
      setTotalPages(Math.max(1, Math.ceil(data.total / limit)));
      
      if (searchQuery) {
        
        const filteredLocalUsers = localUsers.filter(user => {
          
          if (searchMetadata.isPhoneSearch) {
            const phoneQuery = searchMetadata.fields.phone;
            
            
            const normalizedPhoneQuery = phoneQuery.replace(/[\s\-+]/g, '');
            const normalizedUserPhone = user.phone ? user.phone.replace(/[\s\-+]/g, '') : '';
            
            
            const matches = normalizedUserPhone.includes(normalizedPhoneQuery);
            return matches;
          }
          
          
          if (searchMetadata.isAdvanced && Object.values(searchMetadata.fields).some(f => f !== '')) {
            const { firstName, lastName, email, phone } = searchMetadata.fields;
            
            let matches = true;
            
            if (firstName && (!user.firstName || 
                !user.firstName.toLowerCase().includes(firstName.toLowerCase()))) {
              matches = false;
            }
            
            if (lastName && (!user.lastName || 
                !user.lastName.toLowerCase().includes(lastName.toLowerCase()))) {
              matches = false;
            }
            
            if (email && (!user.email || 
                !user.email.toLowerCase().includes(email.toLowerCase()))) {
              matches = false;
            }
            
            if (phone && (!user.phone || 
                !user.phone.replace(/[\s\-+]/g, '').includes(phone.replace(/[\s\-+]/g, '')))) {
              matches = false;
            } else if (phone) {
              console.log(`Phone matched: ${user.phone} `);
            }
            
            return matches;
          }
    
          const searchTermLower = searchQuery.toLowerCase();
    
          const phoneMatch = user.phone && (
            user.phone.toLowerCase().includes(searchTermLower) || 
            user.phone.replace(/[\s\-+]/g, '').includes(searchTermLower.replace(/[\s\-+]/g, ''))
          );
          
          return (
            (user.firstName && user.firstName.toLowerCase().includes(searchTermLower)) ||
            (user.lastName && user.lastName.toLowerCase().includes(searchTermLower)) ||
            (user.email && user.email.toLowerCase().includes(searchTermLower)) ||
            phoneMatch
          );
        });
        
        
        setUsers([...data.users, ...filteredLocalUsers]);
      } else {
        
        const isLastServerPage = skip + limit >= data.total;
        if (isLastServerPage) {
          
          const filteredLocalUsers = localUsers;
          
          setUsers([...data.users, ...filteredLocalUsers]);
        } else {
          setUsers(data.users);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, localUsers, searchQuery, searchMetadata, users.length]);
  
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  
  useEffect(() => {
    const storedUsers = localStorageService.getUsers();
    setLocalUsers(storedUsers);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setSelectedUser(null);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = async (userData) => {
    try {
      
      await apiService.addUser(userData);
 
      const newUser = localStorageService.addUser(userData);

      setLocalUsers(prev => [...prev, newUser]);

      if (currentPage === totalPages) {
        setUsers(prev => [...prev, newUser]);
      }
 
      setIsModalOpen(false);
      showToast('User added successfully!', 'success');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {

      const isLocalUser = userData.id > 1000;
      
      if (isLocalUser) {
        
        const updatedUser = localStorageService.updateUser(userData);
        
        if (updatedUser) {

          setLocalUsers(prev => 
            prev.map(user => user.id === updatedUser.id ? updatedUser : user)
          );

          setUsers(prev => 
            prev.map(user => user.id === updatedUser.id ? updatedUser : user)
          );
        }
      } else {

        try {
          
          await apiService.updateUser(userData.id, userData);
          setUsers(prev => 
            prev.map(user => user.id === userData.id ? userData : user)
          );
        } catch (err) {
          console.error('Error simulating update for API user:', err);
        }
      }
      
      
      setIsModalOpen(false);
      setSelectedUser(null);
      showToast('User updated successfully!', 'info');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      
      const isLocalUser = userId > 1000;
      
      if (isLocalUser) {
        
        const success = localStorageService.deleteUser(userId);
        
        if (success) {
          
          setLocalUsers(prev => prev.filter(user => user.id !== userId));
          
          
          setUsers(prev => prev.filter(user => user.id !== userId));
        }
      } else {
        
        
        try {
          await apiService.deleteUser(userId);
          console.log('API user deletion simulation completed for ID:', userId);
          
          
          setUsers(prev => prev.filter(user => user.id !== userId));
        } catch (err) {
          console.error('Error simulating deletion for API user:', err);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
                    Showing page {currentPage} of {totalPages} ({totalUsers} total users)
                  </small>
                  {searchQuery && (
                    <Badge color="info" className="me-2" style={{ fontSize: '0.8rem' }}>
                      Filtered by: {searchQuery}
                      <Button 
                        color="link" 
                        size="sm" 
                        className="p-0 ms-2" 
                        style={{ color: '#fff' }}
                        onClick={() => {
                          setSearchQuery('');
                          setCurrentPage(1);
                        }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                </div>
              </div>
              <div className='button-group'>
                {searchQuery && (
                  <Button 
                    color="warning" 
                    size="sm" 
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filter
                  </Button>
                )}
                    <Button 
            color="primary" 
            onClick={toggleModal}
          >
            Add New User
          </Button>
                <Button 
                  color="success" 
                  size="sm" 
                  onClick={fetchUsers}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <FilterComponent onFilterApply={(query, metadata = {}) => {
                if (query !== searchQuery || JSON.stringify(metadata) !== JSON.stringify(searchMetadata)) {
                  setSearchQuery(query);
                  setSearchMetadata({
                    isAdvanced: metadata.isAdvanced || false,
                    fields: metadata.fields || {},
                    isPhoneSearch: metadata.isPhoneSearch || false
                  });
                  setCurrentPage(1);
                } else {
                  console.log('Ignoring duplicate filter apply with same parameters');
                }
              }} />
              
              {loading ? (
                <div className="text-center py-5">
                  <Spinner color="primary" />
                  <p className="mt-2">Loading users...</p>
                </div>
              ) : (
                <>
                  <UserList 
                    users={users} 
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                  />
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange}
                  />
                </>
              )}
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
      {toastOpen && (
  <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
    <Toast isOpen={toastOpen}>
      <ToastHeader icon={toastType}>
        {toastType === 'success' && 'Success'}
        {toastType === 'info' && 'Info'}
        {toastType === 'danger' && 'Error'}
      </ToastHeader>
      <ToastBody>{toastMessage}</ToastBody>
    </Toast>
  </div>
)}
    </Container>
  );
}

export default App;
