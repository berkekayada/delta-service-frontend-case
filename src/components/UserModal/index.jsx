import { Table, Button, ButtonGroup, Alert } from 'reactstrap';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <Alert color="info">
        No users found. Try adjusting your search filter or add a new user.
      </Alert>
    );
  }
  
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <ButtonGroup>
                <Button 
                  color="primary" 
                  size="sm" 
                  onClick={() => onEditUser(user)}
                >
                    <i className="bi bi-pen" style={{ fontSize: '1rem', color: 'cornflowerblue' }}></i>
                </Button>
                <Button 
                  color="danger" 
                  size="sm" 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
                      onDeleteUser(user.id);
                    }
                  }}
                >
                  <i class="bi bi-trash"></i>
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
