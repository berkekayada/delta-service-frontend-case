import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap';

const UserForm = () => {
  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="First Name" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Last Name" />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" name="email" placeholder="Email" type="email" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="Phone" />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input id="username" name="username" placeholder="Username" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" name="password" placeholder="Password" type="password" />
          </FormGroup>
        </Col>
      </Row>

      <div className="d-flex mt-4">
        <Button color="primary" type="submit" className="me-2">
          Add User
        </Button>
        <Button color="secondary" type="button">
          Cancel Edit
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
