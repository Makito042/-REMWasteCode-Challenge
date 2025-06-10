import { type Skip } from '../types/skip';

const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location';

/**
 * Fetches skips from the API based on location
 * @param postcode The postcode to search for
 * @param area The area to search in
 * @returns Promise with array of Skip objects
 */
export const fetchSkips = async (postcode: string, area: string): Promise<Skip[]> => {
  try {
    const response = await fetch(
      `${API_URL}?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter out forbidden skips and ensure we have valid data
    return Array.isArray(data) 
      ? data
          .filter((skip: any) => !skip.forbidden)
          .map((skip: any) => ({
            ...skip,
            // Ensure all required fields are properly typed
            id: Number(skip.id) || 0,
            size: Number(skip.size) || 0,
            hire_period_days: Number(skip.hire_period_days) || 0,
            price_before_vat: Number(skip.price_before_vat) || 0,
            vat: Number(skip.vat) || 20, // Default to 20% VAT if not provided
            transport_cost: skip.transport_cost !== null ? Number(skip.transport_cost) : null,
            per_tonne_cost: skip.per_tonne_cost !== null ? Number(skip.per_tonne_cost) : null,
            postcode: String(skip.postcode || ''),
            area: String(skip.area || ''),
            forbidden: Boolean(skip.forbidden),
            allowed_on_road: Boolean(skip.allowed_on_road),
            allows_heavy_waste: Boolean(skip.allows_heavy_waste)
          }))
      : [];
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error; // Re-throw to allow error handling in the component
  }
};

/**
 * Generates mock skips for development/fallback purposes
 * @returns Array of mock Skip objects
 */
export const getMockedSkips = (): Skip[] => {
  const baseSkips = [
    {
      id: 1001,
      size: 4,
      name: '4 Yard Skip',
      description: 'Ideal for small domestic or garden clearances',
      hire_period_days: 14,
      transport_cost: 50,
      per_tonne_cost: null,
      price_before_vat: 199.99,
      vat: 20,
      postcode: 'NR32',
      area: 'Lowestoft',
      forbidden: false,
      allowed_on_road: true,
      allows_heavy_waste: false,
      waste_types: ['General waste', 'Household waste', 'Garden waste'],
      requires_permit: true,
      image: '/skip-4yd.png'
    },
    {
      id: 1002,
      size: 6,
      name: '6 Yard Skip',
      description: 'Perfect for small renovation projects or large garden clearances',
      hire_period_days: 14,
      transport_cost: 50,
      per_tonne_cost: null,
      price_before_vat: 249.99,
      vat: 20,
      postcode: 'NR32',
      area: 'Lowestoft',
      forbidden: false,
      allowed_on_road: true,
      allows_heavy_waste: false,
      waste_types: ['General waste', 'Household waste', 'Garden waste', 'Soil & hardcore (small amounts)'],
      requires_permit: true,
      image: '/skip-6yd.png'
    },
    {
      id: 1003,
      size: 8,
      name: '8 Yard Skip',
      description: 'Great for medium-sized renovation projects',
      hire_period_days: 14,
      transport_cost: 60,
      per_tonne_cost: 15,
      price_before_vat: 299.99,
      vat: 20,
      postcode: 'NR32',
      area: 'Lowestoft',
      forbidden: false,
      allowed_on_road: true,
      allows_heavy_waste: true,
      waste_types: ['General waste', 'Household waste', 'Garden waste', 'Soil & hardcore', 'Bricks & rubble'],
      requires_permit: true,
      image: '/skip-8yd.png'
    },
    {
      id: 1004,
      size: 12,
      name: '12 Yard Skip',
      description: 'Ideal for large renovation projects or house clearances',
      hire_period_days: 14,
      transport_cost: 75,
      per_tonne_cost: 12,
      price_before_vat: 399.99,
      vat: 20,
      postcode: 'NR32',
      area: 'Lowestoft',
      forbidden: false,
      allowed_on_road: true,
      allows_heavy_waste: true,
      waste_types: ['General waste', 'Household waste', 'Garden waste', 'Soil & hardcore', 'Bricks & rubble', 'Concrete'],
      requires_permit: true,
      image: '/skip-12yd.png'
    },
    {
      id: 1005,
      size: 16,
      name: '16 Yard Skip',
      description: 'Perfect for large construction or demolition projects',
      hire_period_days: 14,
      transport_cost: 100,
      per_tonne_cost: 10,
      price_before_vat: 499.99,
      vat: 20,
      postcode: 'NR32',
      area: 'Lowestoft',
      forbidden: true, // Example of a skip that might be restricted in some areas
      allowed_on_road: false,
      allows_heavy_waste: true,
      waste_types: ['All waste types'],
      requires_permit: false,
      image: '/skip-16yd.png'
    }
  ];

  return baseSkips.filter(skip => !skip.forbidden);
};
