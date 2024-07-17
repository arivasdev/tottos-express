import { Routes, Route } from 'react-router-dom';
import Settings from '@/pages/Settings';
import Home from '@/pages/Home';
import Users from '@/pages/settings/Users';
import DeliveryRoutes from '@/pages/DeliveryRoutes';
import Categories from '@/pages/categories/Categories';
import Clients from '@/pages/clients/Clients';
import AddressPage from '@/pages/addresses/AddressPage';
import TravelersPage from '@/pages/travelers';

export default function SystemRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/users" element={<Users />} />
            <Route path="/settings/delivery-routes" element={<DeliveryRoutes />} />
            <Route path="/categories/categories" element={<Categories />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/addresses/:id" element={<AddressPage />} />
            <Route path="/settings/travelers" element={<TravelersPage />} />
        </Routes>
    )
}