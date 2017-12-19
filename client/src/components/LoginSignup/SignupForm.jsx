import React from 'react';
import { TabPane, Form, Label, Input, FormGroup, FormText, Button } from 'reactstrap';

const placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
const SignupForm = () => (
  <TabPane tabId="2" id="register-form-div">
    <h4 className="text-center">Register for a New Account</h4>
    <hr />
    <p className="text-center">
      <small className="text-muted mx-auto text-center">
        Fields marked
        <span className="text-danger">*</span> are important
      </small>
    </p>
    <Form id="register-form" className="mt-4 mb-3 px-5">
      <FormGroup>
        <Label for="firstname" className="col-form-label col-form-label-lg">
          First Name
          <span className="text-danger">*</span>
        </Label>
        <Input type="text" id="firstname" placeholder="Jane" />
      </FormGroup>
      <FormGroup>
        <Label for="lastname" className="col-form-label col-form-label-lg">
          Last Name
        </Label>
        <Input type="text" id="lastname" placeholder="Smith" />
      </FormGroup>
      <FormGroup>
        <Label for="username" className="col-form-label col-form-label-lg">
          Username
          <span className="text-danger">*</span>
        </Label>
        <Input type="text" id="username" placeholder="janesmith" />
      </FormGroup>
      <FormGroup>
        <Label for="email" className="col-form-label col-form-label-lg">
          Email Address
          <span className="text-danger">*</span>
        </Label>
        <Input type="email" id="email" placeholder="janesmith@me.com" />
      </FormGroup>
      <FormGroup>
        <Label for="signup-password" className="col-form-label col-form-label-lg">
          Password
          <span className="text-danger">*</span>
        </Label>
        <Input type="password" id="signup-password" placeholder={placeholder} />
        <FormText tag="small" className="text-muted">
          Password should be more than 8 characters!
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="signup-passwordconfirm" className="col-form-label col-form-label-lg">
          Password Confirmation
          <span className="text-danger">*</span>
        </Label>
        <Input type="password" id="signup-passwordconfirm" placeholder={placeholder} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="user-info" className="col-form-label col-form-label-lg">
          Tell Us Something About Yourself
        </Label>
        <Input type="textarea" rows={3} id="user-info" placeholder="I love to cook..." />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="occupation" className="col-form-label col-form-label-lg">
          Occupation
        </Label>
        <Input type="text" id="occupation" placeholder="Chef" />
      </FormGroup>
      <Button className="btn-block">REGISTER</Button>
    </Form>
  </TabPane>
);

export default SignupForm;
