import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { setIsAdding } from "../../features/Post/postSlice";
import { Post } from "../../types/post";
import { FormFieldError } from "../FormFieldError";
import style from './newPostModal.module.scss';

export const NewPostModal = () => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<Post>();

  const [textCount, setTextCount] = useState(0);
  const dispatch = useAppDispatch();

  const onSubmit = () => {

  };
  return (
    <div className={style.container}>
      <div className={style.modal}>
        <div className={style.modal_content}>
          <form className={style.form} action="submit" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter title"
              className={style.input_field}
              {...register('title', {
                required: 'Field is requared',
                minLength: {
                  value: 1,
                  message: 'Type something'
                }
              })}
            />
            <FormFieldError error={errors?.title?.message} />
            <textarea
              rows={7}
              maxLength={300}
              placeholder="Enter content"
              className={style.input_field}
              {...register('content', {
                required: 'Field is requared',
                minLength: {
                  value: 1,
                  message: 'Type something'
                },
                maxLength: {
                  value: 300,
                  message: 'Maximum '
                }
              })}
              onChange={(e) => setTextCount(e.target.value.length)}
            />
            <p>{300-textCount}/300</p>
            <FormFieldError error={errors?.content?.message} />
            <button className={style.form_btn}>
              ADD POST
            </button>
          </form>
        <div onClick={() => dispatch(setIsAdding(false))} className={style.close_btn}>
          <span>X</span>
        </div>
        </div>
      </div>
    </div>
  );
};
