import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { Form, PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';
import { UserLoader } from "../../components/UserLoader/userLoader";
import { updateDisplayNameById, updateUserNameById } from "../../features/userInfo/userInfoSlice";

export const userData = {
  username: 'username',
  displayname: 'displayname',
};

export const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const userIsUpdating = useAppSelector(state => state.userInfo.isUpdating);
  const userInfo = useAppSelector(state => state.userInfo.user);

  const updateUserName = (data: Form) => {
    dispatch(updateUserNameById(data));
  };

  const updateDisplayName = (data: Form) => {
    dispatch(updateDisplayNameById(data));
  };

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.content}>
          {userIsUpdating && <UserLoader />}
          <h3 className={style.title}>
            Main information
          </h3>
          <PersonalInfoRow
            name={userData.username}
            infoValue={userInfo.username}
            id={userInfo.id}
            updateInfo={updateUserName}
          />
          <PersonalInfoRow
            name={userData.displayname}
            infoValue={userInfo.displayname}
            id={userInfo.id}
            updateInfo={updateDisplayName}
          />
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};
