import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { updateUserNameById, updateDisplayNameById } from "../../features/userInfo/userInfoSlice";
import { PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';
import { toast } from "react-toastify";
import { UserLoader } from "../../components/UserLoader/userLoader";
import { FormFieldError } from "../../components/FormFieldError";

export const userData = {
  username: 'username',
  displayname: 'displayname',
};

export type FormValues = {
  id: string
  username: string
  displayname: string
};

export type F = keyof FormValues;

export const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const userIsUpdating = useAppSelector(state => state.userInfo.isUpdating);
  const userInfo = useAppSelector(state => state.userInfo.user);
  const [isUpdating, setIsUpdating] = useState(false);


  const { id, username, displayname } = userInfo;
  const {
    register,
    handleSubmit,
    setFocus,
    formState: {
      errors,
      isValid,
    }
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      id,
      username,
      displayname,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (data.username !== userInfo.username) {
        dispatch(updateUserNameById(data));
      }
      if (data.displayname !== userInfo.displayname) {
        dispatch(updateDisplayNameById(data));
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
          {userIsUpdating && <UserLoader/>}
          <h3 className={style.title}>
            Main information
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalInfoRow
              name={userData.username}
              username={userInfo.username}
              register={register}
              setFocus={setFocus}
              isValid={isValid}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
            />
            <PersonalInfoRow
              name={userData.displayname}
              username={userInfo.displayname}
              register={register}
              setFocus={setFocus}
              isValid={isValid}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
            />
          </form>
          <FormFieldError error={errors.username?.message}/>
          <FormFieldError error={errors.displayname?.message}/>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};
