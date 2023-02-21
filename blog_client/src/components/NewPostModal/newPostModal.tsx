import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewPost, setIsAdding } from "../../features/Post/postSlice";
import { Post } from "../../types/post";
import { FormFieldError } from "../FormFieldError";
import { Loader } from "../Loader";
import style from './newPostModal.module.scss';

export const NewPostModal = () => {
  const {
    register,
    reset,
    formState,
    formState: {
      errors,
      isSubmitSuccessful
    },
    handleSubmit
  } = useForm<Post>({ defaultValues: { title: '', content: '', url: '' } });

  const [textCount, setTextCount] = useState(0);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.userInfo.user);
  const isLoading = useAppSelector(state => state.post.isLoading);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ title: '', content: '', url: '' });
    }
  }, [formState, reset, isSubmitSuccessful]);

  const onSubmit = async (data: Post) => {
    try {
      dispatch(createNewPost(data));
      reset({ ...data });
      setIsAdding(false);
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={style.container}>
      {isLoading && <Loader/> }
      <div className={style.modal}>
        <div className={style.modal_content}>
          <form className={style.form} action="submit" onSubmit={handleSubmit(onSubmit)}>
            <div className={style.input_wrapper}>
              <input
                type="text"
                placeholder="Enter title"
                className={style.input_field}
                id={'title'}
                {...register('title', {
                  required: 'Field is requared',
                  minLength: {
                    value: 1,
                    message: 'Type something'
                  }
                })}
              />
              <label className={style.required_label} htmlFor="title"></label>
            </div>
            <FormFieldError error={errors?.title?.message} />
            <div className={style.input_wrapper}>
              <input
                type="text"
                placeholder="Enter image url"
                className={style.input_field}
                {...register('url')}
              />
            </div>
            <div className={style.input_wrapper}>
              <textarea
                rows={7}
                maxLength={300}
                placeholder="Enter content"
                className={style.input_field}
                id={'content'}
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
              <label className={style.required_label} htmlFor="content"></label>
            </div>
            <FormFieldError error={errors?.content?.message} />
            <p>{300 - textCount}/300</p>
            <input
              type="hidden"
              value={userInfo.displayname}
              {...register('user')}
            />
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
