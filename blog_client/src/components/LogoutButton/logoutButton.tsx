import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../api/requests';
import style from './logoutButton.module.scss';
import {  toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { changeStateLoader } from '../../features/loader/loaderSlice';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const successNotif = () => {
    return toast.success('Logout successful!');
  };

  const errorNotif = (message: string) => {
    return toast.error(message);
  };

  const handleLogout = async () => {
    dispatch(changeStateLoader(true));
    try {
      await Logout();
      localStorage.clear();
      navigate('/signIn');
      successNotif();
    }
    catch (error) {
      errorNotif(error.response.data.message);
      if (error.response.status === 401) {
        navigate('/signIn');
        localStorage.clear();
      }
    }
    finally {
      dispatch(changeStateLoader(false));
    }
  };
  return (
    <>
      <div className={style.btn__wrapper}>
        <button className={style.btn} onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};
