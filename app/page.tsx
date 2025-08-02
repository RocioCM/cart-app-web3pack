import {DataServices} from '@/services/DataServices';
import {ProductsList} from '@/components/ProductsList';
import {Cart} from '@/components/Cart';
import {ClientLayout} from '@/components/ClientLayout';

export default async function Home() {
  // Fetch products on the server side
  const response = await DataServices.getProducts();
  const isError = !response.ok;
  const products = response.data;

  return (
    <ClientLayout>
      <div className="font-sans grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center h-screen overflow-auto p-6 gap-10 md:p-20 md:!pb-0 md:grid-cols-[1fr_300px] md:grid-rows-1">
        <main className={'h-full w-full flex flex-col gap-8'}>
          <h1 className="text-4xl font-bold text-rose-950">Desserts</h1>
          <div className="flex-1 pb-20 overflow-auto">
            {isError ? (
              <div className="text-red flex items-center justify-center h-full text-center">
                Error: {response.error || 'Failed to fetch products'}
              </div>
            ) : (
              <ProductsList products={products} />
            )}
          </div>
        </main>
        <aside className="h-full w-full pb-20">
          <Cart />
        </aside>
      </div>
    </ClientLayout>
  );
}
