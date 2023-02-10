import React from 'react';
import './styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoggedInRoute } from '../src/components/LoggedInRoute';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ToastWrapper } from './components/ToastContainer';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { useAppSelector } from './app/hooks';

function App() {
  const id = useAppSelector(state => state.userInfo.user.id);

  return (
    <>
      <Routes>
        <Route
          path='/'
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signIn'
          element={
            <LoggedInRoute>
              <SignInPage />
            </LoggedInRoute>
          }
        />
        <Route
          path='/signUp'
          element={
            <LoggedInRoute>
              <SignUpPage />
            </LoggedInRoute>
          }
        />
        <Route path='*' element={<PageNotFound />} />
        <Route
          path={`/personalInfo/${id}`}
          index
          element={
            <ProtectedRoute>
              <PersonalInfoPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastWrapper />
    </>
  );
}

export default App;
