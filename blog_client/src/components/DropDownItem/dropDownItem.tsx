import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from './dropDownItem.module.scss';

interface Props{
  title: string;
  icon: string;
  action?: () => void
};

export const DropDownItem: FC<Props> = ({title, icon}) => {
  return (
    <li>
      <Link className={style.dropdown_item} to="/personalInfo">
        <img src={icon} alt='icon' />
        {title}
      </Link>
    </li>
  );
};
