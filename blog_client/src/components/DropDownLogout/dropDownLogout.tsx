import React, { FC } from "react";
import style from './dropDownLogout.module.scss';

interface Props{
  title: string;
  icon: string;
  action?: () => void
};

export const DropDownLogout: FC<Props> = ({title, icon, action}) => {
  return (
    <li onClick={action} className={style.dropdown_item}>
        <img src={icon} alt='icon' />
        <p>{title}</p>
    </li>
  );
};
