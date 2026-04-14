import LoadingSpinner from "./LoadingSpinner";
import FormInput from "./FormInput";
import { ChevronLeftIcon } from "lucide-react";

export default function CustomerDetailsForm({
  onSuccess,
  onClose,
  loading,
  offer,
  setOffer,
  errors,
}: {
  onSuccess: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  loading: boolean;
  offer: string;
  setOffer: (offer: string) => void;
  errors: boolean;
}) {
  return (
    <form className="space-y-4" onSubmit={onSuccess}>
      <FormInput
        label="Your Offer"
        isFormatNumber={true}
        value={offer}
        onChange={(e) => setOffer(e)}
        placeholder="Enter your offer amount"
        icon="$"
        required={true}
      />
      <div className="flex justify-between flex-wrap gap-5">
        <button
          type="button"
          onClick={onClose}
          className="p-3 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors cursor-pointer"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90   font-medium transition-colors duration-300 cursor-pointer"
        >
          {loading ? <LoadingSpinner /> : "Send Offer"}
        </button>
      </div>
      {errors && <p className="text-red-500">Failed to submit offer.</p>}
    </form>
  );
}
