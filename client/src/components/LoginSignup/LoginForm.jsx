import React from 'react';
import { TabPane, Form, Label, Input, FormGroup, Button } from 'reactstrap';

const LoginForm = () => (
  <TabPane tabId="1" id="signin-form-div" role="tabpanel">
    <h4 className="text-center">Sign In to Your Account</h4>
    <hr />
    <Form id="signin-form" className="mt-4 mb-3 px-5">
      <FormGroup>
        <Label for="login-email" className="col-form-label">
          Username/Email Address
        </Label>
        <Input type="email" id="login-email" placeholder="janesmith" />
      </FormGroup>
      <FormGroup>
        <Label for="login-password" className="col-form-label">
          Password
        </Label>
        <Input
          type="password"
          className="mb-4"
          id="login-password"
          placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
        />
      </FormGroup>
      <FormGroup check className="mb-0">
        <Label check for="remember-me" className="col-form-label col-form-label-lg">
          <Input type="checkbox" className="form-check-input" id="remember-me" /> Remember Me
        </Label>
      </FormGroup>
      <Button className="btn-block mt-0">SIGN IN</Button>
    </Form>
  </TabPane>
);

export default LoginForm;
