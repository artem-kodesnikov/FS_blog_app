import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../FormFieldError';
import style from './personalInfoRow.module.scss';

export interface Form {
  id: string,
  name: string,
  infoValue: string,
  updateInfo: (data: Form) => void
}

export type F = keyof Form;


export const PersonalInfoRow: FC<Form> = ({ id, name, infoValue, updateInfo }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    setFocus,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      id,
      [name]: infoValue,
    }
  });

  const onSubmit = (data: Form) => {
    try {
      updateInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = (e : any) => {
    e.preventDefault();
    setIsUpdating(true);
  };

  useEffect(() => {
    setFocus(name as F);
  }, [isUpdating]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              {infoValue || 'Info not found'}
            </p>
          }
        </div>
        {isUpdating
          ? <button
            onClick={() => setIsUpdating(false)}
            className={style.update_btn}
            type='submit'
            disabled={!isValid}
          >
            Save
            <img className={style.info_ico} src={"./icon/approve.png"} />
          </button>
          : <button onClick={(e) => update(e)}
            className={style.update_btn}
          >
            Update
            <img className={style.info_ico} src={"./icon/editing.png"} />
          </button>
        }
      </div >
      <FormFieldError error={errors.name?.message}/>
    </form>
  );
};
