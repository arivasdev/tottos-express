export default interface Address {
    id: string;
    country_id: string;
    route_id: string;
    address: string;
    isActive: boolean;
    client_id: string;
    Countries: {
      name: string;
    };
    DeliveryRoutes: {
      name: string;
    };
    defaultAddress: boolean;
  }