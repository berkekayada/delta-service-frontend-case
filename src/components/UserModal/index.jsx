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
import UserForm from "../UserForm";

const UserModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Add / Edit User
        <small className="ms-2 text-muted">(0 users)</small>
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
              value={""}
            />
            <div
              id="scrollableDiv"
              style={{ height: "400px", overflow: "auto" }}
            >
              <ListGroup>
                <ListGroupItem
                  action
                  active={false}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    John Doe
                    <div>
                      <small>john.doe@example.com</small>
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
            <Button
              color="secondary"
              className="mt-3 w-100"
            >
              Clear Selection
            </Button>
          </div>

          <div
            className="form-container"
            style={{ width: "60%", paddingLeft: "15px" }}
          >
            <UserForm />
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
