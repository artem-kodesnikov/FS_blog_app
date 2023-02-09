import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';

export enum userData {
  username,
  displayname,
}

export const PersonalInfoPage = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const userInfo = useAppSelector(state => state.userInfo.user);
  console.log(userInfo);
  const {username, displayname} = userInfo;



  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.content}>
          <h3 className={style.title}>
            Main information
          </h3>
          <PersonalInfoRow title={userData.username} value={username} />
          <PersonalInfoRow title={userData.displayname} value={displayname} />
        </div>
      </div>
      {isLoading && <Loader/>}
    </>
  );
};
