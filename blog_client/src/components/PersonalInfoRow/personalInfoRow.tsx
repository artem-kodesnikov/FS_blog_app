import React, { FC, useEffect } from 'react';
import { UseFormRegister, UseFormSetFocus } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUpdatingRow } from '../../features/userInfo/userInfoSlice';
import { F, FormValues } from '../../pages/PersonalInfoPage';
import style from './personalInfoRow.module.scss';

interface Props {
  name: string,
  username: string,
  register: UseFormRegister<FormValues>,
  setFocus: UseFormSetFocus<FormValues>,
  isValid: boolean,
  isUpdating: boolean,
  setIsUpdating: (val: boolean) => void;
}


export const PersonalInfoRow: FC<Props> = ({ name, username, register, setFocus, isValid, isUpdating, setIsUpdating }) => {

  useEffect(() => {
    setFocus(name as F);
  }, [isUpdating]);

  const dispatch = useAppDispatch();
  const updatingRow = useAppSelector(state => state.userInfo.updatingRow);
  // const [localUpd, setLocalUpd] = useState(false);

  const update = () => {
    dispatch(setUpdatingRow(name));
    setIsUpdating(true);
    // setLocalUpd(true);
  };

  console.log({name, updatingRow});
  console.log(isUpdating);

  return (
    <div className={style.info_row}>
      <div className={style.info_values}>
        <p className={style.info_title}>
          {name || 'Info not found'}
        </p>
        {isUpdating && name === updatingRow
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
        <button
          onClick={() => !isUpdating ? update() : setIsUpdating(false)}
          // onClick={() => !isUpdating ? update() : isUpdating && name === updatingRow && setIsUpdating(false)}
          className={style.update_btn}
          disabled={!isValid}
        >
          {!isUpdating ? 'Update' : 'Save'}
          <img className={style.info_ico} src={!isUpdating ? "./icon/editing.png" : "./icon/approve.png"} />
        </button>
      </div>
  );
};
