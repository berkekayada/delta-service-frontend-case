import { useState } from 'react';
import { Table, Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import './index.css';
import DeleteModal from '../DeleteModal';

const UserList = ({ users, onEditUser, onDeleteUser }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id);
      setToastMessage(`${selectedUser.firstName} ${selectedUser.lastName} deleted successfully.`);
      setShowToast(true);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
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
                  <Button onClick={() => onEditUser(user)} className="custom-edit-button" color="primary" size="sm">
                    <i className="bi bi-pen"></i>
                  </Button>
                  <Button onClick={() => handleDeleteClick(user)} className="custom-delete-button" color="danger" size="sm">
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        onConfirm={handleConfirmDelete}
        user={selectedUser}
      />

      {showToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <Toast isOpen={showToast}>
            <ToastHeader icon="success">Success</ToastHeader>
            <ToastBody>{toastMessage}</ToastBody>
          </Toast>
        </div>
      )}
    </>
  );
};

export default UserList;
