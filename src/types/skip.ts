// Skip type definition
export interface Skip {
  id: number;
  size: number; // Size in cubic yards
  name?: string;
  description?: string;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  waste_types?: string[]; // Types of waste allowed
  requires_permit?: boolean; // If permit is required for road placement
  image?: string; // URL to skip image/icon
}

export type SkipFilters = {
  postcode: string;
  area: string;
};

// Utility functions for skip data
export const calculateTotalPrice = (skip: Skip): number => {
  // Base price + transport cost (if any)
  const basePrice = skip.price_before_vat + (skip.transport_cost || 0);
  // Add VAT
  return basePrice * (1 + (skip.vat / 100));
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(price);
};

export const getSkipDisplayInfo = (size: number) => {
  const sizes: Record<number, { name: string; description: string; dimensions: string; maxWeight: string }> = {
    2: { 
      name: '2 Yard Skip', 
      description: 'Perfect for small clearances and garden waste',
      dimensions: '1.7m x 1.5m x 0.8m',
      maxWeight: '1.5 tonnes'
    },
    4: { 
      name: '4 Yard Skip', 
      description: 'Great for small home or garden projects',
      dimensions: '3.5m x 1.7m x 1.0m',
      maxWeight: '3.0 tonnes'
    },
    6: { 
      name: '6 Yard Skip', 
      description: 'Ideal for medium-sized renovation projects',
      dimensions: '4.0m x 1.8m x 1.2m',
      maxWeight: '4.0 tonnes'
    },
    8: { 
      name: '8 Yard Skip', 
      description: 'Perfect for larger renovation projects',
      dimensions: '5.0m x 1.8m x 1.3m',
      maxWeight: '6.0 tonnes'
    },
    10: { 
      name: '10 Yard Skip', 
      description: 'Great for large clearances and building work',
      dimensions: '5.0m x 2.0m x 1.5m',
      maxWeight: '8.0 tonnes'
    },
    12: { 
      name: '12 Yard Skip', 
      description: 'Ideal for large construction projects',
      dimensions: '6.0m x 2.0m x 1.5m',
      maxWeight: '10.0 tonnes'
    },
    14: { 
      name: '14 Yard Skip', 
      description: 'For large scale construction and demolition',
      dimensions: '6.0m x 2.2m x 1.8m',
      maxWeight: '12.0 tonnes'
    },
    16: { 
      name: '16 Yard Skip', 
      description: 'Maximum capacity for large scale projects',
      dimensions: '6.0m x 2.3m x 2.0m',
      maxWeight: '15.0 tonnes'
    },
    20: {
      name: '20 Yard Skip',
      description: 'Ideal for large construction or demolition waste',
      dimensions: '7.0m x 1.8m x 1.4m',
      maxWeight: '20.0 tonnes'
    },
    40: {
      name: '40 Yard Skip',
      description: 'Largest skip for major construction projects',
      dimensions: '7.5m x 1.8m x 1.4m',
      maxWeight: '40.0 tonnes'
    }
  };

  return sizes[size] || {
    name: `${size} Yard Skip`,
    description: 'General purpose skip',
    dimensions: 'Varies',
    maxWeight: 'Varies'
  };
};
