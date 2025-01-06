import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/Index';

import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <Routes>
      
    </Routes>
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | IMS - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
      
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | IMS - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        
       
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | IMS - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | IMS - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
       
      
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | IMS - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout></>
  );
}

export default App;
