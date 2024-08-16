import { Routes, Route } from 'react-router-dom';
import Settings from '@/pages/Settings';
import Home from '@/pages/Home';
import Users from '@/pages/settings/Users';
import DeliveryRoutes from '@/pages/DeliveryRoutes';
import Categories from '@/pages/categories/Categories';
import Clients from '@/pages/clients/Clients';
import AddressPage from '@/pages/addresses/AddressPage';
import MaletasPage from '@/pages/maletas/MaletasPage';
import ViajerosPage from '@/pages/viajeros/ViajerosPage';
import PackageForm from '@/pages/paquetes/PackageForm';

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
            <Route path="/settings/maletas" element={<MaletasPage />} />
            <Route path="/settings/viajeros" element={<ViajerosPage />} />
            {/* <Route path="/packages" element={<PackageForm />} /> */}
        </Routes>
    )
}