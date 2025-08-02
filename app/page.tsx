import Image from 'next/image';
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
      <div className="font-main grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center h-screen overflow-auto p-6 gap-10 md:p-12 lg:p-20 md:!pb-0 md:grid-cols-[1fr_350px] md:grid-rows-1">
        <main className={'h-full w-full flex flex-col gap-8'}>
          <h1 className="text-4xl font-bold text-rose-950">Desserts</h1>
          <div className="flex-1 overflow-auto md:pb-12 lg:pb-20">
            {isError ? (
              <div className="text-rose-900 flex flex-col items-center justify-center h-full text-center text-lg">
                <Image
                  src="/assets/illustration-empty-cart.svg"
                  alt="Error loading products"
                  width={128}
                  height={128}
                />
                <p>
                  No products available at the moment. <br /> Please check back
                  later.
                </p>
              </div>
            ) : (
              <ProductsList products={products} />
            )}
          </div>
        </main>
        <aside className="h-full w-full md:pb-12 lg:pb-20">
          <Cart />
        </aside>
      </div>
    </ClientLayout>
  );
}
