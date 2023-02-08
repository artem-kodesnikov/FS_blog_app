import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { PersonalInfoRow } from "../../components/PersonalInfoRow";
import style from './personalInfoPage.module.scss';


export const PersonalInfoPage = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.content}>
          <h3 className={style.title}>
            Main information
          </h3>
          <PersonalInfoRow title={'UserName'} value={'UserName'} />
          <PersonalInfoRow title={'DisplayName'} value={'DisplayName'} />
        </div>
      </div>
      {isLoading && <Loader/>}
    </>
  );
};
