import { Routes, Route } from 'react-router-dom';
import Settings from '@/pages/Settings';
import Home from '@/pages/Home';
import Users from '@/pages/settings/Users';

export default function SystemRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/users" element={<Users />} />
        </Routes>
    )
}