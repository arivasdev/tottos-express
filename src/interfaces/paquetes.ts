import { MetodosEntrega, TiposPaquetes } from "@/types/DBEnum.type";
import { ColumnDef as OriginalColumnDef } from '@tanstack/react-table';

export interface Paquete {
    id: bigint;
    created_at: string; // ISO 8601 date string
    tipoItem: TiposPaquetes;
    item_recibido?: boolean;
    origin_country_id: bigint;
    destination_country_id: bigint;
    from_client: bigint;
    to_client: bigint;
    metodoEntrega: MetodosEntrega;
    direccionEntrega: bigint;
    subCategory_id: bigint;
    producto: string;
    unidades: bigint;
    peso?: number;
    totalFactura?: number;
    totalCobro: number;
    totalCambiado?: boolean;
    totalCambiadoFecha?: string; // ISO 8601 time string
    usuario_modificaTotal?: bigint;
    totalCobroOriginal?: number;
    created_by?: number;
    pagadoPorAdelantado?: boolean;
    //campos para visualizacion
    Origen?: {
      name: string;
    }
    Destino?: {
      name: string;
    }
    ClienteOrigen?: {
      name: string;
    }
    ClienteDestino?: {
      name: string;
    }
    Responsable?: {
      name: string;
    }
    DireccionEntregaItem?: {
      route_id: bigint;
      address: string;
    }

    DeliveryRoute ?: {
      id: any;
      name: string;
    }
  }

  interface ValidationMessage {
    type: string;
    message: string;
  }
  
  export type ValidationError = Partial<Record<keyof Paquete, ValidationMessage>>;

  // Extendemos ColumnDef para ajustar el tipo de accessorKey
export interface ColumnDef<TData> extends Omit<OriginalColumnDef<TData>, 'accessorKey'> {
    accessorKey: keyof TData;
}

// Extendemos ColumnDef para agregar el id 'actions'
export interface ActionColumnDef<TData> extends Omit<OriginalColumnDef<TData>, 'accessorKey'> {
    id: 'actions';
}

export type PaqueteColumns = (ColumnDef<Paquete> | ActionColumnDef<Paquete>)[];
