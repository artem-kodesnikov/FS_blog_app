import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeUsername, handleUserUpdate } from '../../features/userInfo/userInfoSlice';
import style from './personalInfoRow.module.scss';
import { useForm } from "react-hook-form";


interface Props {
  title: string;
  value: string;
}

interface Input {
  input: string;
}

export const PersonalInfoRow: FC<Props> = ({ title, value }) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(state => state.userInfo.isUpdating);
  const updateRow = useAppSelector(state => state.userInfo.updateRow);
  const { register, handleSubmit, setFocus } = useForm<Input>();

  const handleUpdateInput = () => {
    dispatch(handleUserUpdate([!isUpdating, title]));
  };

  const handlePress = (e: any) => {
    if(e.key === 'Escape'){
      dispatch(handleUserUpdate([false, title]));
    }
  };

  const onSubmit = (data: Input) => {
    const { input } = data;
    dispatch(changeUsername(input));
    dispatch(handleUserUpdate([false, title]));
  };

  useEffect(() => {
    setFocus('input');
  }, [isUpdating]);

  return (
    <div className={style.info_row}>
      <div className={style.info_values}>
        <p className={style.info_title}>
          {title || 'Info not found'}
        </p>
        {isUpdating && title === updateRow
          ? <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('input', {
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
