import {Product} from '@/types/product';
import {ServiceResponse} from '@/types/service';
import mockedData from '@/public/data.json';

export class DataServices {
  /**
   * Get the products list.
   * @returns Promise containing response with products or error
   */
  static async getProducts(): Promise<ServiceResponse<Product[]>> {
    try {
      const products: Product[] = mockedData.map((item, i: number) => ({
        ...item,
        id: i + 1, // Create a unique ID for each product
      }));

      return {ok: true, data: products};
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
