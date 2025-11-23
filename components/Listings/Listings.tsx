import CarCard from "../CarCard/CarCard";
export default function Listings({ page }: { page: string }) {
  return (
    <div className="px-9 py-8">
      <h2>{page} Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
        <CarCard page={page} />
      </div>
    </div>
  );
}
