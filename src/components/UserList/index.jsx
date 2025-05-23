import { Table, Button, ButtonGroup, Alert } from 'reactstrap';
import './index.css';

const UserList = ({users}) => {


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
            <div className="custom-button-group">
  <Button className="custom-edit-button" color="primary" size="sm">
    <i className="bi bi-pen"></i>
  </Button>
  <Button className="custom-delete-button" color="danger" size="sm">
    <i className="bi bi-trash"></i>
  </Button>
</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
