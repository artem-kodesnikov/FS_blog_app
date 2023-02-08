import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './signInForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { FormType } from '../../types/form';
import { Login } from '../../api/requests.js';
import { Loader } from '../Loader';
import { FormFieldError } from '../FormFieldError';
import { toast } from 'react-toastify';
import view from '../../image/icon/view.png';
import hide from '../../image/icon/hide.png';
import { changeStateLoader } from '../../features/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserInfo } from '../../features/userInfo/userInfoSlice';

export const SingInForm = () => {
  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const navigate = useNavigate();

  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<FormType>();

  const handleSignIn = async (data: FormType) => {
    const { username, password } = data;
    dispatch(changeStateLoader(true));
    try {
      const login = await Login(username, password);
      const userInfo = {
        username: login.data.user.username,
        displayname:login.data.user.displayname,
      };
      dispatch(getUserInfo(userInfo));

      if (login.status === 201) {
        toast.success('Login successful!');
        navigate('/', { replace: true });
        return login;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(changeStateLoader(false));
    }
  };

  const handleVisiblePass = () => {
    setIsVisiblePass(!isVisiblePass);
  };
  return (
    <form
      action="submit"
      className={style.for}
      onSubmit={handleSubmit(handleSignIn)}
    >
      <label htmlFor='userInput'>
        <p className={style.input_title}>User Name</p>
      </label>
      <div className={style.input__row}>
        <input
          type="text"
          id='userInput'
          placeholder='Enter name'
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
              message: 'Can\'t be less than 8 characters'
            }
          })}
        />

        <img
          src={isVisiblePass ? view : hide}
          alt="eye_icon"
          className={style.input__icon}
          onClick={handleVisiblePass}
        />
      </div>
      <FormFieldError error={errors?.password?.message} />
      <button className={style.form__btn}>Sign In</button>
      {isLoading && <Loader/>}
    </form>
  );
};
