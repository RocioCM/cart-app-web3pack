export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center h-screen overflow-auto p-6 gap-12 md:p-20 md:!pb-0 md:grid-cols-[1fr_300px] md:grid-rows-1">
      <main className="h-full w-full flex flex-col gap-8">
        <h1 className="">Desserts</h1>
        <div className="flex-1 pb-20">Desserts list</div>
      </main>
      <aside className="h-full w-full pb-20">Cart Card here</aside>
    </div>
  );
}
