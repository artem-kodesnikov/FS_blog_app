import React from 'react';
import '../../styles/container.scss';
import { SingInForm } from '../../components/SignInForm';
import { SignUpLink } from '../../components/SignUpLink';
import { FormHeader } from '../../components/FormHeader';
import 'react-toastify/dist/ReactToastify.css';

export const SignInPage = () => {

  return (
    <div className="container">
      <FormHeader title={'Sign In'} />
      <SingInForm />
      <SignUpLink />
    </div>
  );
};
