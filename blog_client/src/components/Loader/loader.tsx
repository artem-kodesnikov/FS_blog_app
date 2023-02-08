import React from 'react';
import { ClipLoader } from 'react-spinners';
import style from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={style.loading}>
          <ClipLoader
            color="#36d7b7"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
  );
};
