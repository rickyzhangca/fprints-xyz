import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { Header, Nav, NewFeature, SignUpDialog } from '@/components';
import { useGetCollections, useGetProfile } from '@/hooks';
import { useBearStore } from '@/store';

const App = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const blueprintId = searchParams.get('blueprint_id');

  const { session, setCollections } = useBearStore();
  const setColumns = useBearStore(state => state.setColumns);
  const showSignUpDialog = useBearStore(state => state.showSignUpDialog);
  const setShowSignUpDialog = useBearStore(state => state.setShowSignUpDialog);
  const getCollections = useGetCollections();
  const getProfile = useGetProfile();

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

  useEffect(() => {
    if (session && getProfile.isError && !getProfile.isLoading) {
      navigate(
        blueprintId
          ? `/new-profile?blueprint_id=${blueprintId}`
          : '/new-profile'
      );
    }
  }, [session, getProfile.isError, navigate]);

  return (
    <div className="mx-auto max-w-[2180px] px-4 pb-10 md:px-8">
      <Header />
      <Nav />
      <NewFeature />
      <SignUpDialog
        open={showSignUpDialog}
        onOpenChange={setShowSignUpDialog}
      />
      <Outlet />
    </div>
  );
};

export default App;
