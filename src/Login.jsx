import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(errorMessages);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (errors.email === '' && errors.password === '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log('Çalıştı');
  }, [errors]);
  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
    if (type === 'email' && !validateEmail(value)) {
      setErrors((previousState) => {
        return { ...previousState, email: errorMessages.email };
      });
    } else if (type === 'email' && validateEmail(value)) {
      setErrors((previousState) => {
        return { ...previousState, email: '' };
      });
    }
    if (type === 'password' && value.length < 4) {
      setErrors((previousState) => {
        return { ...previousState, password: errorMessages.password };
      });
    } else if (type === 'password' && value.length >= 4) {
      setErrors((previousState) => {
        return { ...previousState, password: '' };
      });
    }

    console.log(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      console.log('Gönderildi');
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm);
            history.push('/main');
          } else {
            history.push('/error');
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          invalid={errors.email.length > 0}
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          onInvalid={errors.email.length < 1}
        />
        {errors.email.length > 1 && (
          <FormFeedback className="text-danger">{errors.email}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          invalid={errors.password.length > 0}
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          onInvalid={errors.password.length < 1}
        />
        {errors.password.length > 1 && (
          <FormFeedback className="text-danger">{errors.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!(isValid && form.terms)}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
