import React from "react";
import { BeatLoader } from "react-spinners";
import style from './userLoader.module.scss';

export const UserLoader = () => {
  return (
    <div className={style.isUpdating}>
      <BeatLoader color="#36d7b7" />
    </div>
  );
};
