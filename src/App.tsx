import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Home from './pages/Home';
// import Users from './pages/settings/Users';
// import Roles from './pages/settings/Roles';
// import Categories from './pages/settings/Categories';
// import DeliveryMethods from './pages/settings/DeliveryMethods';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/settings/users" element={<Users />} />
        <Route path="/settings/roles" element={<Roles />} />
        <Route path="/settings/categories" element={<Categories />} />
        <Route path="/settings/delivery-methods" element={<DeliveryMethods />} /> */}
      </Routes>
    </Layout>
  );
};

export default App;
