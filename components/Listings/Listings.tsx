import "./Listings.css";
export default function Listings({ page }: { page: string }) {
  return (
    <div className="Listings-container">
      <h1>{page} Listings</h1>
    </div>
  );
}
