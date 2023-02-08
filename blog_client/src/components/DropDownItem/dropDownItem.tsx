import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from './dropDownItem.module.scss';

interface Props{
  title: string;
  icon: string;
  action?: () => void
};

export const DropDownItem: FC<Props> = ({title, icon, action}) => {
  return (
    <li onClick={action} className={style.dropdown_item}>
        <img src={icon} alt='icon' />
        <Link to="/personalInfo">{title}</Link>
    </li>
  );
};
