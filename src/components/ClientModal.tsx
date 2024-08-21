import React, { useEffect, useState } from 'react';

import { Client } from '@/interfaces/client';
import { supabase } from '@/supabaseClient';
import { Dialog, DialogContent } from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ClientModalProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const ClientModal: React.FC<ClientModalProps> = ({ name, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const { data, error } : SupabaseResponse<Client> = await supabase.from('Clients').select('*').order('name', { ascending: true });
        if (error) {
            console.error('Error fetching clients:', error);
        } else {
            setClients(data || []);
        }
    };

    const handleClientSelect = (clientId: string) => {
        onChange({ target: { name, value: clientId } } as React.ChangeEvent<HTMLInputElement>);
        setOpen(false);
    };

    return (
        <>
            <input type="text" name={name} value={value} readOnly onClick={() => setOpen(true)} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle>Seleccionar Cliente</DialogTitle>
                    <div>
                        {clients.map((client) => (
                            <button key={client.id} onClick={() => handleClientSelect(client.id)}>{client.name}</button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
