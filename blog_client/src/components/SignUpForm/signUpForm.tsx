import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../../api/requests';
import { FormType } from '../../types/form';
import { Loader } from '../Loader';
import style from './signUpForm.module.scss';
import { FormFieldError } from '../FormFieldError';
import { toast } from 'react-toastify';
import view from '../../image/icon/view.png';
import hide from '../../image/icon/hide.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeStateLoader } from '../../features/loader/loaderSlice';

export const SignUpForm = () => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    watch,
  } = useForm<FormType>();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);

  const handleSignUp = async (data: FormType) => {
    const { username, displayname, password } = data;
    console.log(data);
    try {
      dispatch(changeStateLoader(true));
      const newUser = await RegisterUser(username, displayname, password);
      if (newUser.status === 201) {
        toast.success('User created!');
        return newUser;
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(changeStateLoader(false));
    }
  };

  const handleVisiblePass = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const handleVisibleConfirmPass = () => {
    setIsVisibleConfirmPass(!isVisibleConfirmPass);
  };
  return (
    <form
      action="submit"
      className={style.form}
      onSubmit={handleSubmit(handleSignUp)}
    >
      <label htmlFor='nameInput'>
        <p className={style.input_title}>User Name</p>
      </label>
      <div className={style.input__row}>
        <input
          placeholder='Enter user name'
          id='nameInput'
          className={style.input__field}
          {...register('username', {
            required: 'Field is requared',
            minLength: {
              value: 5,
              message: 'Can\'t be less than 5 characters'
            }
          })}
        />
      </div>
      <FormFieldError error={errors?.username?.message} />
      <label htmlFor='userInput'>
        <p className={style.input_title}>Full Name</p>
      </label>
      <div className={style.input__row}>
        <input
          id='userInput'
          placeholder='Enter full name'
          className={style.input__field}
          {...register('displayname', {
            required: 'Field is requared',
            minLength: {
              value: 5,
              message: 'Can\'t be less than 5 characters'
            }
          })}
        />
      </div>
      <FormFieldError error={errors?.displayName?.message} />
      <label htmlFor='passInput'>
        <p className={style.input_title}>Password</p>
      </label>
      <div className={style.input__row}>
        <input
          type={isVisiblePass ? 'text' : 'password'}
          id='passInput'
          placeholder='Enter password'
          className={style.input__field}
          {...register('password', {
            required: 'Field is requared',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })}
        />

        <img
          src={isVisiblePass ? view : hide}
          alt=""
          className={style.input__icon}
          onClick={handleVisiblePass}

        />

      </div>
      <FormFieldError error={errors?.password?.message} />
      <label htmlFor='confInput'>
        <p className={style.input_title}>Confirm Password</p>
      </label>
      <div className={style.input__row}>
        <input
          type={isVisibleConfirmPass ? 'text' : 'password'}
          id='confInput'
          placeholder='Confirm password'
          className={style.input__field}
          {...register('confirmPassword', {
            required: 'Field is requared',
            validate: (val: string | undefined) => {
              if (watch('password') !== val) {
                return 'Your passwords do no match';
              }
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })}
        />

        <img
          src={isVisibleConfirmPass ? view : hide}
          alt=""
          className={style.input__icon}
          onClick={handleVisibleConfirmPass}
        />

      </div>
      <FormFieldError error={errors?.confirmPassword?.message} />
      <button className={style.form__btn}>Sign Up</button>
      {isLoading && <Loader />}
    </form>
  );
};
