import React, { FC } from "react";
import style from './postItem.module.scss';

interface Props {
  title: string,
  url: string
}

export const PostItem: FC<Props> = ({ url }) => {
  return (
    <div className={style.container}>
      <img className={style.image} src={url} alt="image" />
      <div className={style.content_wrapper}>
        <h3 className={style.title}>
          {/* {title} */}
          Lorem ipsum dolor sit amet.
        </h3>
        <p className={style.content}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam error nesciunt quae facere, distinctio repudiandae libero minima tempora excepturi dolor numquam recusandae, veniam enim ab doloribus porro incidunt cupiditate accusantium.
        </p>
        <div className={style.post_info}>
          <img className={style.icon} src="./icon/post_user.png" alt="user" />
          <p>USER</p>
        </div>
        <div className={style.post_info}>
          <img className={style.icon} src="./icon/calendar.png" alt="date" />
          <p>DATA</p>
        </div>
      </div>
    </div>
  );
};
