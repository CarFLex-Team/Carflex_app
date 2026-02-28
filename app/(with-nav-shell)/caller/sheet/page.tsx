"use client";
import SheetTable from "@/components/SheetTable/SheetTable";
import { useCarsSheet } from "@/lib/useCarSheet";
import { SheetLiveListener } from "@/components/sheetLiveListener/SheetLiveListener";
import { useEffect, useState } from "react";
import ForwardButton from "@/components/CustomButton/ForwardButton";
import downloadCSV from "@/lib/downloadCSV";
import { useSession } from "next-auth/react";
import CarWatcher from "@/components/CarWatcher/CarWatcher";
import Modal from "@/components/ui/Modal";
import { AddCarForm } from "@/components/AddCarForm/AddCarForm";
import { Plus } from "lucide-react";
import { CarColumns, Car } from "@/components/Types/CarColumns";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import FavoriteButton from "@/components/CustomButton/FavoriteButton";
import removeDubsSheetData from "@/helpers/removeDubsSheetData";

export default function CarsSheetPage() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [sheetData, setSheetData] = useState<Car[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const [isTruck, setIsTruck] = useState(false);
  const {
    data,
    error,
    isLoading: sheetLoading,
  } = useCarsSheet(
    session?.user?.name?.toLowerCase() || "",
    page.toString(),
    search,
    isAttacking,
    isFavorite,
    callStatus,
    isTruck,
  );
  const [prevCount, setPrevCount] = useState<number>(data?.totalCount || 0);
  useEffect(() => {
    if (data && data.items) {
      if (data.totalCount === prevCount) {
        setSheetData((prevData) => [...prevData, ...data.items]); // Append new data
        setHasMore(data.hasMore);
      } else {
        setSheetData(data.items);
        setHasMore(data.hasMore);
        setPrevCount(data.totalCount);
        setPage(1);
      }
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setSheetData([]);
  };

  if (error) return <p>Error loading sheet</p>;

  const handleNextPage = () => {
    if (hasMore && !sheetLoading) {
      setPage(page + 1); // Increment page number
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Decrement page number
      setSheetData([]); // Clear current data to show loading state
      setHasMore(true); // Reset hasMore when going back
    }
  };
  const filteredSheetData = removeDubsSheetData(sheetData);
  return (
    <>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Car">
          <AddCarForm
            onSuccess={() => setOpen(false)}
            sheet={session?.user?.name?.toLowerCase()}
          />
        </Modal>
      )}
      <CarWatcher cars={filteredSheetData ?? []} otherSound={true} />
      {/* 👂 listens for SEND events */}
      <SheetLiveListener />

      {/* Table with Pagination */}
      <SheetTable
        columns={CarColumns}
        data={filteredSheetData} // Show filtered data
        action={
          <div className="flex justify-between w-full items-center mb-2">
            <input
              type="text"
              placeholder="Search Cars..."
              value={search}
              onChange={handleSearch}
              className="p-2 border-b border-gray-300 focus:outline-none min-w-25"
            />
            <div className="flex gap-4">
              <div
                className={`text-sm   rounded-lg p-0.5 cursor-pointer text-center ${isFavorite ? "bg-primary text-white" : "bg-gray-200 border border-primary text-primary"}`}
              >
                <FavoriteButton
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    setSheetData([]);
                    setPage(1);
                  }}
                  isFavorite={isFavorite}
                />
              </div>
              <button
                className={`text-sm   rounded-lg p-2  cursor-pointer text-center ${isTruck ? "bg-primary text-white" : "bg-gray-200 border border-primary text-primary"}`}
                onClick={() => {
                  setIsTruck(!isTruck);
                  setSheetData([]);
                  setPage(1);
                }}
              >
                Trucks
              </button>
              <button
                className={`text-sm   rounded-lg p-2  cursor-pointer text-center ${isAttacking ? "bg-primary text-white" : "bg-gray-200 border border-primary text-primary"}`}
                onClick={() => {
                  setIsAttacking(!isAttacking);
                  setSheetData([]);
                  setPage(1);
                }}
              >
                ATTACK
              </button>
              <select
                name="callStatus"
                id="callStatus"
                className="text-sm   rounded-lg  cursor-pointer text-center bg-primary text-white"
                onChange={(e) => {
                  setCallStatus(e.target.value);
                  setSheetData([]);
                  setPage(1);
                }}
              >
                <option value="">All Calls</option>
                <option value="Deal Made">Deal Made</option>
                <option value="No Contact">No Contact</option>
                <option value="Follow Up">Follow Up</option>
                <option value="In Progress">In Progress</option>
                <option value="No Deal (Price)">No Deal (Price)</option>
                <option value="No Deal (Other)">No Deal (Other)</option>
                <option value="No Deal (Language)">No Deal (Language)</option>
                <option value="No Deal (Dealer)">No Deal (Dealer)</option>
                <option value="Voicemail Left">Voicemail Left</option>
                <option value="Ad Removed">Ad Removed</option>
                <option value="Rebuilt">Rebuilt</option>
                <option value="Scammer">Scammer</option>
                <option value="Chat on Kijiji">Chat on Kijiji</option>
                <option value="Not Picking Up">Not Picking Up</option>
                <option value="Text Message">Text Message</option>
              </select>
              <button
                className="border border-primary text-sm hover:text-white transition-colors duration-300 bg-primary rounded-lg p-2 text-white hover:bg-lightPrimary cursor-pointer text-center"
                onClick={() => setOpen(true)}
              >
                <Plus size={18} />
              </button>
              <button
                className="border border-primary text-sm hover:text-white transition-colors duration-300 bg-primary rounded-lg p-2 text-white hover:bg-lightPrimary cursor-pointer text-center"
                onClick={() => downloadCSV(filteredSheetData ?? [])}
              >
                Export CSV
              </button>
            </div>
          </div>
        }
        renderActions={(row) => <ForwardButton carDetails={row} />}
      />

      {/* Pagination Buttons */}
      <div className=" flex items-center justify-between text-sm m-5">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1}
          className="rounded border cursor-pointer px-3 py-1  text-white bg-primary disabled:opacity-50"
        >
          Previous
        </button>
        {/* Loading Indicator */}
        {sheetLoading && (
          <div className="flex justify-center ">
            <LoadingSpinner />
          </div>
        )}
        <button
          onClick={handleNextPage}
          disabled={!hasMore || sheetLoading}
          className="rounded border cursor-pointer px-3 py-1 text-white bg-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
