export default interface Client {
    id: string;
    email: string;
    name: string;
    created_by: string;
    phone_number: string;
    metodo_preferido: 'En sitio' | 'Domicilio';
  }