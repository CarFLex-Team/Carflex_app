export default async function DecodeBlock() {
  return (
    <div className="p-4  rounded-md ">
      <div className="w-full flex items-center justify-center">
        <input type="text" className="w-1/2 mx-1 p-2 border rounded-md" />
        <button className="px-3 py-2 bg-primary hover:bg-lightPrimary cursor-pointer text-white rounded-md">
          Decode VIN
        </button>
      </div>
      <div className="mt-4">
        {/* Decoded VIN information will be displayed here */}VIN details will
        appear here after decoding.
        
      </div>
    </div>
  );
}
