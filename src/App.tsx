import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header, Nav } from '@/components';
import { useGetCollections, useGetProfile } from '@/hooks';
import { useBearStore } from '@/store';

import { Helmet } from 'react-helmet-async';

const App = () => {
  const navigate = useNavigate();
  const { supabase, session, setCollections } = useBearStore();
  const setColumns = useBearStore(state => state.setColumns);

  if (!supabase) return null;

  const getCollections = useGetCollections();
  const getProfile = useGetProfile();

  useEffect(() => {
    if (session && getProfile.isError && !getProfile.isLoading) {
      navigate('/new-profile');
    }
  }, [session, getProfile.isError, navigate]);

  useEffect(() => {
    if (getCollections.data) {
      setCollections(getCollections.data);
    }
  }, [getCollections.data]);

  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    if (width < 600) setColumns(1);
    else if (width < 800) setColumns(2);
    else if (width < 1200) setColumns(3);
    else if (width < 1400) setColumns(4);
    else if (width < 1900) setColumns(5);
    else setColumns(6);
  }, [setColumns]);

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <div className="mx-auto max-w-[2180px] px-4 pb-10 md:px-8">
      <Helmet>
        <title>Fprints</title>
      </Helmet>
      <Header />
      <Nav />
      <Outlet />
    </div>
  );
};

export default App;
