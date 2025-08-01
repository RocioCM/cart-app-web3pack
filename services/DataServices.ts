import {Product} from '@/types/product';
import {ServiceResponse} from '@/types/service';

export class DataServices {
  /**
   * Get the products list.
   * @returns Promise containing response with products or error
   */
  static async getProducts(): Promise<ServiceResponse<Product[]>> {
    try {
      const response = await fetch('/data.json');

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const products: Product[] = await response.json();

      return {
        ok: true,
        data: products,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        ok: false,
        data: [],
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
