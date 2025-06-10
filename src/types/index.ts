export interface Skip {
  id: number;
  size: number;
  name: string;
  description: string;
  price: number;
  delivery_fee: number;
  hire_period_days?: number;
  image?: string;
  requires_permit: boolean;
  allows_heavy_waste: boolean;
  waste_types: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  capacity: number;
  max_weight: number;
}
