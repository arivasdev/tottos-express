import React from 'react';
import { useUserStore } from '@/store/user.store';

const Home: React.FC = () => {
  const { user } = useUserStore();
  return (
    <>
    <h1 className="text-4xl font-bold">Welcome {user?.name} to the Admin Panel</h1>
    <p className="mt-4">This is the main content area.</p>
    </>
  );
};

export default Home;
