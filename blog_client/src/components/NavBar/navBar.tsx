import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "../../api/requests";
import { DropDownItem } from "../DropDownItem/dropDownItem";
import { DropDownLogout } from "../DropDownLogout";
import style from './navBar.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { changeStateLoader } from '../../features/loader/loaderSlice';


export const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dropDownRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handler = (e: any) => {
      if (!dropDownRef.current.contains(e.target)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleOpenMenu = () => {
    setIsOpenMenu(prev => !prev);
  };

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
    <div className={style.wrapper}>
      <nav>
        <Link to='/' className={style.logo}>LOGO</Link>
        <div className={style.menu_container} ref={dropDownRef}>
          <div onClick={handleOpenMenu} className={style.user}>
            <img className={style.user_icon} src="./icon/user.png" alt="user icon" />
          </div>
          <div className={classNames(style.dropdown_menu,{
            [style.active]: isOpenMenu, [style.inactive]: !isOpenMenu })}
          >
            <ul>
              <DropDownItem title={'My Profile'} icon={'./icon/dropuser.png'}/>
              <DropDownLogout handleLogout={handleLogout} title={'Logout'} icon={'./icon/exit.png'}/>
            </ul>
          </div>
        </div >
      </nav>
    </div>
  );
};
