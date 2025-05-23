import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

const DeleteModal = ({ isOpen, toggle, onConfirm, user }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you sure you want to delete <strong>{user?.firstName} {user?.lastName}</strong>?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>Delete</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
