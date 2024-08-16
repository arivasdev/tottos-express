import { MetodosEntrega, TiposPaquetes } from "@/types/DBEnum.type";

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
    Origen?: string;
    Destino?: string;
    ClienteOrigen?: string;
    ClienteDestino?: string;
    Responsable?: string;
  }

  interface ValidationMessage {
    type: string;
    message: string;
  }
  
  export type ValidationError = Partial<Record<keyof Paquete, ValidationMessage>>;