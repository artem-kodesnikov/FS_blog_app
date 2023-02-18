import React from 'react';
// import { LogoutButton } from '../../components/LogoutButton/logoutButton';
import style from './homePage.module.scss';
// import footerImg from '../../image/Vector.png';
import { NavBar } from '../../components/NavBar';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { PostItem } from '../../components/PostItem';

export const HomePage: React.FC = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        {/* <div className={style.congratulation}>
          <h2 className={style.title}>Congratulations</h2>
          <p className={style.content}>
            Now you are on the main page. Soon we will provide you with detailed feedback on the result of your work
          </p>
        </div>
        <LogoutButton />
        <div className={style.footer__img_wrap}>
          <img className={style.footer__img} src={footerImg} alt="footer img" />
        </div> */}
      <PostItem title={'title'} url={'https://mobimg.b-cdn.net/v3/fetch/29/2904ffc93e2e32801153219dc6294a89.jpeg'}/>
      <PostItem title={'title'} url={'https://mobimg.b-cdn.net/v3/fetch/29/2904ffc93e2e32801153219dc6294a89.jpeg'}/>
      <PostItem title={'title'} url={'https://mobimg.b-cdn.net/v3/fetch/29/2904ffc93e2e32801153219dc6294a89.jpeg'}/>
      </div>
      {isLoading && <Loader/>}
    </>
  );
};
