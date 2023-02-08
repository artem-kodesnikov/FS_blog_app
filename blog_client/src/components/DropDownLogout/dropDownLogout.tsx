import React, { FC } from "react";
import style from './dropDownLogout.module.scss';

interface Props{
  title: string;
  icon: string;
  handleLogout: () => void
};

export const DropDownLogout: FC<Props> = ({title, icon, handleLogout}) => {
  return (
    <li onClick={handleLogout} className={style.dropdown_item}>
        <img src={icon} alt='icon' />
        <p>{title}</p>
    </li>
  );
};
