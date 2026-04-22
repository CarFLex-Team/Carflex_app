"use client";
import capitalize from "@/lib/capitalize";
import formatDate from "@/lib/formatDate";
import { ArrowLeft, ChevronLeftIcon } from "lucide-react";
import useSWR from "swr";
import Modal from "../ui/Modal";
import { useState } from "react";
import SendOfferForm from "./SendOfferForm";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

export default function CarDetails({ vehicleId }: { vehicleId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [offer, setOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notInterestedOpen, setNotInterestedOpen] = useState(false);
  const { data, error } = useSWR(
    `/api/offers/${vehicleId}`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateOnFocus: true,
    },
  );
  async function onSuccess(
    e?: React.FormEvent<HTMLFormElement>,
    notInterested: boolean = false,
  ) {
    e?.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/offers/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer,
          not_interested: notInterested,
          year: vehicle.v_year || vehicle.year,
          make_name: vehicle.make_name || vehicle.make,
          model_name: vehicle.model_name || vehicle.model,
          trim_name: vehicle.trim_name || vehicle.trim,
          email: vehicle.email,
        }),
      });

      if (!res.ok) {
        setErrors(true);
        setSuccess(false);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Success:", data);
      setSuccess(true);
      return data;
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);

      // setNotInterestedOpen(false);
    }
  }

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load vehicle data.</p>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  // Find the vehicle by id
  const vehicle = data[0];

  if (!vehicle)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 ">Vehicle not found.</p>
      </div>
    );

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Send An Offer"
        onClose={() => setIsOpen(false)}
      >
        {success ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900  ">
                Offer Sent successfully
              </h2>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 rounded-md bg-primary  text-white hover:bg-primary/90   font-medium transition-colors duration-300 cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <SendOfferForm
            onClose={() => {
              setErrors(false);
              setIsOpen(false);
            }}
            onSuccess={onSuccess}
            loading={loading}
            errors={errors}
            offer={offer}
            setOffer={setOffer}
          />
        )}
      </Modal>
      <Modal
        isOpen={notInterestedOpen}
        onClose={() => setNotInterestedOpen(false)}
      >
        {success ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900  ">
                Not Interested Email Sent successfully
              </h2>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 rounded-md bg-primary  text-white hover:bg-primary/90   font-medium transition-colors duration-300 cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <div className="">
            <h2 className="text-base md:text-lg  text-gray-900 text-center ">
              Are you sure you are not interested in this vehicle?
            </h2>
            <p className="text-sm md:text-base font-semibold  text-red-500 text-center mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-between flex-wrap gap-5">
              <button
                type="button"
                onClick={() => setNotInterestedOpen(false)}
                className="p-3 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors cursor-pointer"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                type="submit"
                onClick={() => onSuccess(undefined, true)}
                className="px-6 py-3 rounded-md bg-primary  text-white hover:bg-primary/90   font-medium transition-colors duration-300 cursor-pointer"
              >
                {loading ? <LoadingSpinner /> : "Submit"}
              </button>
            </div>
            {errors && <p className="text-red-500">Failed to submit offer.</p>}
          </div>
        )}
      </Modal>

      <div className="min-h-screen pt-10 pb-5 px-7 text-primary">
        <div className=" bg-white  border border-primary rounded-2xl shadow-md p-15 ">
          <div className="flex justify-between">
            <a
              href="/dashboard"
              className="p-2 block w-fit rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
            </a>
            <div className="flex gap-4">
              <div>
                {vehicle.offer ? (
                  <span className="bg-green-500 py-2 px-3 rounded-lg text-white">
                    Offered ${vehicle.offer}
                  </span>
                ) : !vehicle.is_interested && !vehicle.offer ? (
                  <span className="bg-red-500 py-2 px-3 rounded-lg text-white">
                    Not Interested
                  </span>
                ) : (
                  <span
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="bg-gray-600 py-2 px-3 rounded-lg text-white cursor-pointer hover:bg-primary transition-colors duration-300"
                  >
                    Send an Offer
                  </span>
                )}
              </div>
              {vehicle.is_interested && !vehicle.offer && (
                <div>
                  <span
                    onClick={() => setNotInterestedOpen((prev) => !prev)}
                    className="bg-red-400 py-2 px-3 rounded-lg text-white cursor-pointer hover:bg-red-500 transition-colors duration-300"
                  >
                    Mark Not Interested
                  </span>
                </div>
              )}
            </div>
          </div>
          <p
            className={`text-primary overflow-ellipsis font-bold text-2xl sm:text-3xl md:text-4xl pr-1 mt-2 `}
          >
            {vehicle.v_year || vehicle.year || "-"}{" "}
            {vehicle.make_name || vehicle.make || "-"}{" "}
            {vehicle.model_name || vehicle.model || "-"}{" "}
            {vehicle.trim_name || vehicle.trim || "-"}
          </p>
          {/* <div className="flex sm:w-2/3  md:w-2/5 gap-3 justify-between my-1 flex-wrap">
          <div>
            <strong>Colour:</strong> {capitalize(vehicle.colour)}
          </div>
          <div>
            <strong>Transmission:</strong> {capitalize(vehicle.transmission)}
          </div>
        </div> */}
          <p className="text-gray-500 sm:text-sm text-xs">
            {formatDate(vehicle.created_at)}
          </p>

          <section className="grid grid-cols-1   md:grid-cols-3 lg:md:grid-cols-4 mt-6 gap-4 border-b border-gray-300 pb-6 ">
            {/* <h3 className="col-span-1 md:col-span-3 font-semibold text-3xl">
            Basic Info
          </h3> */}
            {vehicle.vin && (
              <div>
                <strong>VIN:</strong> {vehicle.vin || "-"}
              </div>
            )}

            <div>
              <strong>Mileage:</strong>{" "}
              {vehicle.mileage?.toLocaleString() || "-"} km
            </div>
            <div>
              <strong>Colour:</strong> {capitalize(vehicle.colour)}
            </div>
            <div>
              <strong>Transmission:</strong> {capitalize(vehicle.transmission)}
            </div>
          </section>
          <section className="grid grid-cols-1  md:grid-cols-2 mt-6  gap-4 border-b border-gray-300 pb-6 ">
            <h3 className="col-span-1  md:col-span-2 font-semibold text-3xl">
              Owner Info
            </h3>
            <div>
              <strong>Name:</strong> {capitalize(vehicle.full_name) || "-"}
            </div>
            <div>
              <strong>Email:</strong> {vehicle.email || "-"}
            </div>
            <div>
              <strong>Phone:</strong> {vehicle.phone || "-"}
            </div>
            <div>
              <strong>Postal Code:</strong> {vehicle.postal_code || "-"}
            </div>
          </section>
          {/* Ownership & Legal */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-b border-gray-300  pb-6">
            <h3 className="md:col-span-2 font-semibold text-3xl">
              Ownership & Legal
            </h3>
            <div>
              <strong>Sole Owner:</strong> {vehicle.sole_owner ? "Yes" : "No"}
            </div>
            <div>
              <strong>Has Accident:</strong>{" "}
              {vehicle.has_accident ? "Yes" : "No"}
            </div>
            <div>
              <strong>Keys:</strong> {vehicle.keys || "-"}
            </div>
            <div>
              <strong>Loan:</strong> {vehicle.is_loan ? "Yes" : "No"}
            </div>
            <div>
              <strong>Loan Company:</strong> {vehicle.loan_company || "-"}
            </div>
            <div>
              <strong>Loan Balance:</strong>{" "}
              {vehicle.loan_balance !== "0.00" ? vehicle.loan_balance : "-"}
            </div>
          </section>
          {/* Condition & Damage */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-b border-gray-300  pb-6">
            <h3 className="md:col-span-2 font-semibold text-3xl">
              Condition & Damage
            </h3>
            <div>
              <strong>Condition:</strong> {capitalize(vehicle.condition)}
            </div>

            <div>
              <strong>Drivable:</strong> {vehicle.is_drivable ? "Yes" : "No"}
            </div>
            <div>
              <strong>Exterior Damage:</strong>{" "}
              {vehicle.exterior_damage?.join(", ") || "-"}
            </div>
            <div>
              <strong>Interior Damage:</strong>{" "}
              {vehicle.interior_damage?.join(", ") || "-"}
            </div>
            <div>
              <strong>Mechanical Issues Found:</strong>{" "}
              {vehicle.mechanical_issues_found ? "Yes" : "No"}
            </div>
            <div>
              <strong>Mechanical Issues:</strong>{" "}
              {vehicle.mechanical_issues?.join(", ") || "-"}
            </div>
            <div>
              <strong>Disclosures:</strong>{" "}
              {vehicle.disclosures?.join(", ") || "-"}
            </div>
            <div>
              <strong>Claims:</strong> ${vehicle.total_claims}
            </div>
          </section>
          {/* Tires */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-b border-gray-300  pb-6">
            <h3 className="md:col-span-3 font-semibold text-3xl">Tires</h3>
            <div>
              <strong>Number of Tires:</strong> {vehicle.number_of_tires || "-"}
            </div>
            <div>
              <strong>Tires Kind:</strong> {vehicle.tires_kind || "-"}
            </div>
            <div>
              <strong>Tires Replaced:</strong> {vehicle.tires_replaced || "-"}
            </div>
          </section>
          {/* Features & Extras */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 ">
            <h3 className="md:col-span-2 font-semibold text-3xl">
              Features & Extras
            </h3>
            <div>
              <strong>Features:</strong> {vehicle.features?.join(", ") || "-"}
            </div>
            <div>
              <strong>Extra Features:</strong> {vehicle.extra_features || "-"}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
