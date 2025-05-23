import { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Input,
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import apiService from "../../services/api";
import UserForm from "../UserForm";
const UserModal = ({
  isOpen,
  toggle,
  onAddUser,
  onUpdateUser,
  selectedUser: initialSelectedUser,
}) => {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const limit = 10;

  useEffect(() => {
    if (initialSelectedUser) {
      setSelectedUser(initialSelectedUser);
    }
  }, [initialSelectedUser]);

  const fetchMoreUsers = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const skip = page * limit;
      const data = await apiService.getUsers(limit, skip);

      setTotal(data.total);
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(skip + limit < data.total);
    } catch (error) {
      console.error("Error fetching more users:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, limit]);

  useEffect(() => {
    if (isOpen) {
      if (initialSelectedUser && users.length === 0) {
        fetchMoreUsers();
      } else if (!users.length) {
        fetchMoreUsers();
      }
    } else {
      if (!initialSelectedUser) {
        setUsers([]);
        setPage(0);
        setHasMore(true);
        setSelectedUser(null);
        setSearchTerm("");
      }
    }
  }, [isOpen, fetchMoreUsers, initialSelectedUser, users.length]);

  const handleSubmit = (formData) => {
    if (selectedUser) {
      onUpdateUser({ ...formData, id: selectedUser.id });
    } else {
      onAddUser(formData);
    }
    toggle();
  };

  const resetForm = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        {selectedUser ? "Edit User" : "Add New User"}
        {total > 0 && <small className="ms-2 text-muted">({total} users)</small>}
      </ModalHeader>
      <ModalBody>
        <div className="d-flex">
          <div
            className="user-list-container"
            style={{
              width: "40%",
              borderRight: "1px solid #dee2e6",
              paddingRight: "15px",
            }}
          >
            <h5>Select User to Edit</h5>
            <Input
              type="text"
              placeholder="Search users..."
              className="mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
<div
  id="scrollableDiv"
  style={{ height: "400px", overflow: "auto" }}
>
  {filteredUsers.length === 0 && searchTerm ? (
    <div className="text-center text-muted py-3">No users found</div>
  ) : (
    <InfiniteScroll
      dataLength={filteredUsers.length}
      next={fetchMoreUsers}
      hasMore={searchTerm ? false : hasMore} 
      loader={<h6 className="text-center my-2">Loading...</h6>}
      scrollableTarget="scrollableDiv"
    >
      <ListGroup>
        {filteredUsers.map((user) => (
          <ListGroupItem
            key={user.id}
            action
            active={selectedUser?.id === user.id}
            onClick={() => selectUser(user)}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              {user.firstName} {user.lastName}
              <div>
                <small>{user.email}</small>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </InfiniteScroll>
  )}
</div>
            <Button
              color="secondary"
              className="mt-3 w-100"
              onClick={resetForm}
            >
              Clear Selection
            </Button>
          </div>

          <div
            className="form-container"
            style={{ width: "60%", paddingLeft: "15px" }}
          >
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              resetForm={resetForm}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
