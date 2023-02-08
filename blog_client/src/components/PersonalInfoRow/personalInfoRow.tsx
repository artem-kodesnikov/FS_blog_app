import React, { FC } from 'react';
import style from './personalInfoRow.module.scss';

interface Props {
  title: string;
  value: string;
}

export const PersonalInfoRow: FC<Props> = ({title, value}) => {
  return (
    <div className={style.info_row}>
      <div className={style.info_values}>
          <p className={style.info_title}>
            {title}
          </p>
          <p className={style.info_value}>
            {value}
          </p>
      </div>
      <label className={style.info_update} htmlFor="update">
        Update
        <img id="update" className={style.info_ico} src="./icon/editing.png"/>
      </label>
    </div>
  );
};
