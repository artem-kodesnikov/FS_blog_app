import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeUserData, handleUserUpdate } from '../../features/userInfo/userInfoSlice';
import style from './personalInfoRow.module.scss';
import { useForm } from "react-hook-form";
import { userData } from '../../pages/PersonalInfoPage';



interface Props {
  title: userData
  value: string;
}

// interface Input {
//   input: string;
// }

export const PersonalInfoRow: FC<Props> = ({ title, value }) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(state => state.userInfo.isUpdating);
  const updatingRow = useAppSelector(state => state.userInfo.updateRow);
  const updatingInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setFocus,
  } = useForm<Input>({
    mode: "onChange",
    // defaultValues: {
    //   input: value
    // }
  });

  const handleUpdateInput = () => {
    dispatch(handleUserUpdate([!isUpdating, title]));
  };

  const handlePress = (e: any) => {
    if(e.key === 'Escape'){
      dispatch(handleUserUpdate([false, title]));
    }
  };

  const onSubmit = (data: Input) => {
    // const { input } = data;
    console.log(data);
    dispatch(changeUserData({updatingRow: data}));
    dispatch(handleUserUpdate([false, title]));
  };

  // useEffect(() => {
  //   setFocus('input');
  // }, [isUpdating]);

  // useEffect(() => {
  //   const handler = (e: any) => {
  //     if (!updatingInput.current?.contains(e.target)) {
  //       dispatch(handleUserUpdate(false));
  //     }
  //   };

  //   document.addEventListener('mousedown', handler);

  //   return () => {
  //     document.removeEventListener('mousedown', handler);
  //   };
  // });

  return (
    <div className={style.info_row}>
      <div className={style.info_values}>
        <p className={style.info_title}>
          {title || 'Info not found'}
        </p>
        {isUpdating
          ? <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register(title, {
                  minLength: {
                    value: 5,
                    message: 'Can\'t be less than 5 characters'
                  },
                })}
                className={style.update_input}
                type="text"
                onKeyDown={handlePress}
              />
            </form>
          : <p className={style.info_value}>
              {value || 'Info not found'}
            </p>
        }
      </div>
      <label onClick={() => handleUpdateInput()} className={style.info_update} htmlFor="update">
        Update
        <img id="update" className={style.info_ico} src="./icon/editing.png" />
      </label>
    </div>
  );
};
