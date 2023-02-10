import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import style from './dropDownItem.module.scss';

interface Props{
  title: string;
  icon: string;
  action?: () => void
};

export const DropDownItem: FC<Props> = ({title, icon}) => {
  const id = useAppSelector(state => state.userInfo.user.id);
  return (
    <li>
      <Link className={style.dropdown_item} to={`/personalInfo/${id}`}>
        <img src={icon} alt='icon' />
        {title}
      </Link>
    </li>
  );
};
