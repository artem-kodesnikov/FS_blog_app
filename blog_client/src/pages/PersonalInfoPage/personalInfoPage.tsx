import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { changeUserData } from "../../features/userInfo/userInfoSlice";
// import { PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';

export const userData = {
  username: 'username',
  displayname: 'displayname',
};

type FormValues = {
  username: string
  displayname: string
};

type F = keyof FormValues;

export const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const userInfo = useAppSelector(state => state.userInfo.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const { username, displayname } = userInfo;
  const {
    register,
    handleSubmit,
    // setFocus,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      username,
      displayname,
    }
  });

  const onSubmit = (data: FormValues) => {
    // const { input } = data;
    console.log(data);
    dispatch(changeUserData(data));
    setIsUpdating(false);
  };

  // const updating = () => {
  //   setIsUpdating(!isUpdating);
  //   onSubmit();
  // };

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.content}>
          <h3 className={style.title}>
            Main information
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.info_row}>
              <div className={style.info_values}>
                <p className={style.info_title}>
                  {userData.username || 'Info not found'}
                </p>
                {isUpdating
                  ?
                  <input
                    {...register(userData.username as F, {
                      minLength: {
                        value: 5,
                        message: 'Can\'t be less than 5 characters'
                      },
                    })}
                    className={style.update_input}
                    type="text"
                  />
                  : <p className={style.info_value}>
                    {userInfo.username || 'Info not found'}
                  </p>
                }
              </div>
              <label onClick={() => setIsUpdating(!isUpdating)} className={style.info_update} htmlFor="update">
                {isUpdating ? 'update' : 'save'}
                <img id="update" className={style.info_ico} src="./icon/editing.png" />
              </label>
              <button type="submit">123</button>
            </div>
            <div className={style.info_row}>
              <div className={style.info_values}>
                <p className={style.info_title}>
                  {userData.displayname || 'Info not found'}
                </p>
                {isUpdating
                  ?
                  <input
                    {...register(userData.displayname as F, {
                      minLength: {
                        value: 5,
                        message: 'Can\'t be less than 5 characters'
                      },
                    })}
                    className={style.update_input}
                    type="text"
                  />
                  : <p className={style.info_value}>
                    {userInfo.displayname || 'Info not found'}
                  </p>
                }
              </div>
              <label onClick={() => setIsUpdating(!isUpdating)} className={style.info_update} htmlFor="update">
                {isUpdating ? 'update' : 'save'}
                <img id="update" className={style.info_ico} src="./icon/editing.png" />
              </label>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};
