import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeUserData, handleUserUpdate } from '../../features/userInfo/userInfoSlice';
import style from './personalInfoRow.module.scss';
import { useForm } from "react-hook-form";
import { userData } from '../../pages/PersonalInfoPage';



interface Props {
  title: string;
  register: () => void;
  onSubmit: () => void;
  setFocus: () => void;
}

// interface Input {
//   input: string;
// }

// export const PersonalInfoRow: FC<Props> = ({ title, register, onSubmit, setFocus }) => {

// };
