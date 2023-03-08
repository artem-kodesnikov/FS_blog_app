import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePostById } from "../../features/Post/postSlice";
import { Post } from "../../types/post";
import style from './postItem.module.scss';

export const PostItem: FC<Post> = ({ _id, title, content, url, date, user }) => {
  const postDate = new Date(date).toLocaleDateString();
  const dispatch = useAppDispatch();
  const userDisplayname = useAppSelector(state => state.userInfo.user.displayname);
  const dataForDeleting = {_id, userDisplayname};
  return (
    <div className={style.container}>
      <div className={style.image_wrapper}>
        <div className={style.hover_image}>
          <img onClick={() => dispatch(deletePostById(dataForDeleting))} className={style.delete} src="./icon/delete.png" alt="delete" />
        </div>
        {url
          ? <img className={style.image} src={url} alt="image" />
          : <img className={style.no_image} src="./icon/no-photo.png" alt="no image" />
        }
      </div >
      <div className={style.content_wrapper}>
        <h3 className={style.title}>
          {title}
        </h3>
        <p className={style.content}>
          {content}
        </p>
        <div className={style.post_info}>
          <img className={style.icon} src="./icon/post_user.png" alt="user" />
          <p>{user}</p>
        </div>
        <div className={style.post_info}>
          <img className={style.icon} src="./icon/calendar.png" alt="date" />
          <p>{postDate}</p>
        </div>
      </div>
    </div>
  );
};
