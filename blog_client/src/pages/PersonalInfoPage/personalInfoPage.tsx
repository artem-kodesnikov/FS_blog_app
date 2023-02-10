import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { changeUserData } from "../../features/userInfo/userInfoSlice";
import { PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';
import { UpdateUserNameById, UpdateDisplayNameById } from "../../api/requests";
import { toast } from "react-toastify";

export const userData = {
  username: 'username',
  displayname: 'displayname',
};

export type FormValues = {
  username: string
  displayname: string
};

export type F = keyof FormValues;

export const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const userInfo = useAppSelector(state => state.userInfo.user);

  const { username, displayname } = userInfo;
  const {
    register,
    handleSubmit,
    setFocus,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      username,
      displayname,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      console.log(userInfo);
      dispatch(changeUserData(data));
      if (data.username !== userInfo.username) {
        await UpdateUserNameById(data.username, userInfo.id);
        toast.success('Username is updated');
      }
      if (data.displayname !== userInfo.displayname) {
        await UpdateDisplayNameById(data.displayname, userInfo.id);
        toast.success('Displayname is updated');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.content}>
          <h3 className={style.title}>
            Main information
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalInfoRow
              name={userData.username}
              username={userInfo.username}
              register={register}
              setFocus={setFocus}
            />
            <PersonalInfoRow
              name={userData.displayname}
              username={userInfo.displayname}
              register={register}
              setFocus={setFocus}
            />
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};
