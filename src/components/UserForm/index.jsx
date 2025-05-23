import { useState, useEffect } from 'react';
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Row, 
  Col,
  FormFeedback
} from 'reactstrap';

const UserForm = ({ user, onSubmit, resetForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    username: false,
    password: false,
  });


  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
        password: user.password || '',
      });

      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
      });
      setTouched({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        username: false,
        password: false,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
      });
    }
  }, [user]);

  const validate = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.trim().length < 3) {
          error = 'Username must be at least 3 characters';
        }
        break;
      case 'password':
        if (!user && !value) {
          error = 'Password is required for new users';
        } else if (value && value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      if (key === 'password' && user && !formData[key]) {
        return;
      }
      
      const error = validate(key, formData[key]);
      newErrors[key] = error;
      
      if (error) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      username: true,
      password: true,
    });
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }
    
    console.log('Form submit with user ID:', user?.id);
    const submitData = {
      ...formData,
      id: user?.id
    };
    console.log('Submitting data:', submitData);
    onSubmit(submitData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.firstName && !!errors.firstName}
            />
            {touched.firstName && errors.firstName && (
              <FormFeedback>{errors.firstName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.lastName && !!errors.lastName}
            />
            {touched.lastName && errors.lastName && (
              <FormFeedback>{errors.lastName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <FormFeedback>{errors.email}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.phone && !!errors.phone}
            />
            {touched.phone && errors.phone && (
              <FormFeedback>{errors.phone}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.username && !!errors.username}
            />
            {touched.username && errors.username && (
              <FormFeedback>{errors.username}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.password && !!errors.password}
              required={!user}
            />
            {touched.password && errors.password && (
              <FormFeedback>{errors.password}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <div className="d-flex mt-4">
        <Button color="primary" type="submit" className="me-2">
          {user ? 'Update User' : 'Add User'}
        </Button>
        {user && (
          <Button color="secondary" onClick={resetForm}>
            Cancel Edit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UserForm;
