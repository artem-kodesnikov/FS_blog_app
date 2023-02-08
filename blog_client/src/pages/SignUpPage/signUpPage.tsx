import React from 'react';
import '../../styles/container.scss';
import { SignUpForm } from '../../components/SignUpForm';
import { SignInLink } from '../../components/SignInLink/signInLink';
import { FormHeader } from '../../components/FormHeader';

export const SignUpPage = () => {

  return (
    <div className="container">
      <FormHeader title={'Sign Up'} />
      <SignUpForm />
      <SignInLink />
    </div>
  );
};
