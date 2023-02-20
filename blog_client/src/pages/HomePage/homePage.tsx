import React from 'react';
import style from './homePage.module.scss';
import { NavBar } from '../../components/NavBar';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { PostList } from '../../components/PostList';
import { NewPostModal } from '../../components/NewPostModal/newPostModal';

export const HomePage: React.FC = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const isAddingPost = useAppSelector(state => state.post.isAdding);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <PostList />
      </div>
      {isAddingPost && <NewPostModal/>}
      {isLoading && <Loader/>}
    </>
  );
};
