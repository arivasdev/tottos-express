import { UnidadLimitadora } from "@/types/DBEnum.type";

export interface SubCategory {
    id: number;
    created_at: string; // ISO 8601 date string
    categoryId: number;
    name: string;
    isCobroPorPeso: boolean;
    tarifa: number;
    isActive: boolean;
    limite: number | null;
    unidad_limite: UnidadLimitadora | null;
  }