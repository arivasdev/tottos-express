import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { format } from 'date-fns';

interface User {
    id: string;
    email: string;
    name: string;
    created_at: string;
}
interface Role {
    name: string;
    code: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState<Role[]>([]); // Roles disponibles
    const [userRoles, setUserRoles] = useState<string[]>([]); // Roles del usuario seleccionado
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newPassword, setNewPassord] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from<User>('Users')
                .select('id, email, name, created_at');

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data || []);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            const { data, error } = await supabase
                .from<Role>('Roles')
                .select('name, code');

            if (error) {
                console.error('Error fetching roles:', error);
            } else {
                const roleNames = data?.map((role: Role) => ({ name: role.name, code: role.code }));
                console.log("🚀 ~ fetchRoles ~ data:", data)
                console.log("🚀 ~ fetchRoles ~ roleNames:", roleNames)
                setRoles(roleNames);
            }
        };

        fetchRoles();
    }, []);

    const openModal = async (user: User) => {
        setSelectedUser(user);
        // Fetch user roles from User_Roles table
        const { data: userRolesData, error: userRolesError } = await supabase
            .from('User_Roles')
            .select('role_name')
            .eq('user_id', user.id);

        if (userRolesError) {
            console.error('Error fetching user roles:', userRolesError);
        } else {
            const userRoleNames = userRolesData?.map((ur: any) => ur.role_name) || [];
            setUserRoles(userRoleNames);
        }
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const toggleUserRole = async (roleName: string) => {
        if (selectedUser) {
            if (userRoles.includes(roleName)) {
                // Remove role association
                const { error } = await supabase
                    .from('User_Roles')
                    .delete()
                    .eq('user_id', selectedUser.id)
                    .eq('role_name', roleName);

                if (error) {
                    console.error('Error removing user role:', error);
                } else {
                    setUserRoles(userRoles.filter((role) => role !== roleName));
                }
            } else {
                // Add role association
                const { error } = await supabase
                    .from('User_Roles')
                    .insert({ user_id: selectedUser.id, role_name: roleName });

                if (error) {
                    console.error('Error adding user role:', error);
                } else {
                    setUserRoles([...userRoles, roleName]);
                }
            }
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    };

    const openCreateUserModal = () => {
        setIsCreateUserModalOpen(true);
    };

    const closeCreateUserModal = () => {
        setIsCreateUserModalOpen(false);
        setNewUserName('');
        setNewUserEmail('');
        setNewPassord('');
    };

    const createUser = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: newUserEmail,
            password: newPassword,
        });
        

        if (error) {
            console.error('Error creating user:', error);
        } else {
            const { error } = await supabase
                .from('Users')
                .insert({ name: newUserName, email: newUserEmail, user_UID: data.user?.id });

            if (error) {
                console.error('Error creating user in table:', error);
            }
            else {
                const { data: updatedUsers, error: fetchError } = await supabase
                    .from<User>('Users')
                    .select('id, email, name, created_at');
                if (fetchError) {
                    console.error('Error fetching users:', fetchError);
                } else {
                    setUsers(updatedUsers || []);
                    closeCreateUserModal();
                }

            }

        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Usuarios y Permisos</h1>
            <button
                onClick={openCreateUserModal}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Crear Usuario
            </button>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <p>ID: {user.id}</p>
                            <p>Email: {user.email}</p>
                            <p>Fecha de Creación: {formatDate(user.created_at)}</p>
                            <button
                                onClick={() => openModal(user)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Administrar Roles
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h1 className="text-2xl font-bold mb-4">Administrar Roles para {selectedUser.name}</h1>
                        <div className="grid grid-cols-3 gap-4">
                            {roles.map((role) => (
                                <div
                                    key={role.code}
                                    className={`p-4 rounded-lg border border-gray-300 ${userRoles.includes(role.code) ? 'bg-blue-200' : ''
                                        }`}
                                    onClick={() => toggleUserRole(role.code)}
                                >
                                    {role.name}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {isCreateUserModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h1 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h1>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                            <input
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassord(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            onClick={createUser}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                            Crear
                        </button>
                        <button
                            onClick={closeCreateUserModal}
                            className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;

