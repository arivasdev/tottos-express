import { ColumnDef as OriginalColumnDef } from '@tanstack/react-table';

export interface Viajero {
    id?: number;
    created_at: Date;
    name: string;
    alias: string;
    created_by: number;
    isActive: boolean;
    Users?: {
        name: string;
    };
}

// Extendemos ColumnDef para ajustar el tipo de accessorKey
export interface ColumnDef<TData> extends Omit<OriginalColumnDef<TData>, 'accessorKey'> {
    accessorKey: keyof TData;
}

// Extendemos ColumnDef para agregar el id 'actions'
export interface ActionColumnDef<TData> extends Omit<OriginalColumnDef<TData>, 'accessorKey'> {
    id: 'actions';
}

export type ViajeroColumns = (ColumnDef<Viajero> | ActionColumnDef<Viajero>)[];

interface ValidationMessage {
  type: string;
  message: string;
}

export type ValidationError = Partial<Record<keyof Viajero, ValidationMessage>>;