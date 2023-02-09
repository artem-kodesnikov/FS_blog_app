import React, { useState, FC, useEffect } from 'react';
import { UseFormRegister, UseFormSetFocus } from 'react-hook-form';
import { F, FormValues } from '../../pages/PersonalInfoPage';
import style from './personalInfoRow.module.scss';

interface Props {
  name: string,
  username: string,
  register: UseFormRegister<FormValues>,
  setFocus: UseFormSetFocus<FormValues>,
}


export const PersonalInfoRow: FC<Props> = ({ name, username, register, setFocus}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFocus(name as F);
  }, [isUpdating]);
  return (
    <div className={style.info_row}>
              <div className={style.info_values}>
                <p className={style.info_title}>
                  {name || 'Info not found'}
                </p>
                {isUpdating
                  ?
                  <input
                    {...register(name as F, {
                      minLength: {
                        value: 5,
                        message: 'Can\'t be less than 5 characters'
                      },
                    })}
                    className={style.update_input}
                    type="text"
                  />
                  : <p className={style.info_value}>
                    {username || 'Info not found'}
                  </p>
                }
              </div>
              {!isUpdating
                ? <button onClick={() => setIsUpdating(true)} className={style.update_btn} type="submit">
                    Update
                    <img className={style.info_ico} src="./icon/editing.png" />
                  </button>
                : <button onClick={() => setIsUpdating(false)} className={style.update_btn}>
                    Save
                    <img className={style.info_ico} src="./icon/approve.png" />
                  </button>
              }
            </div>
  );
};
