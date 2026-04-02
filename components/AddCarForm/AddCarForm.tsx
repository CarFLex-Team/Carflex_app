"use client";

import truckChecker from "@/lib/truckChecker";
import { useState } from "react";

export function AddCarForm({
  onSuccess,
  sheet,
  sent_by_team,
}: {
  onSuccess: () => void;
  sheet?: string;
  sent_by_team?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [odometer, setOdometer] = useState("");
  const [ad_link, setAdLink] = useState("");
  const [price, setPrice] = useState("");
  const [est_value, setEstValue] = useState("");
  const [source, setSource] = useState("");
  const [sent_by, setSentBy] = useState(sent_by_team || "");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
 
    if (!sheet) {
      setError(true);
      setErrorText("Make Sure to select a caller before adding a car");
      return;
    }
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch(`/api/cars/sheet/${sheet}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          is_truck: truckChecker(title),
          odometer,
          ad_link,
          price,
          source,
          sent_by,
          est_value: est_value || null,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to save car details");
      }
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(true);
      setErrorText("Failed to save car details");
      console.error("Failed to copy text or save car details", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {!sent_by_team && (
        <div className="flex justify-between items-center gap-4">
          <label className=" flex-2">Sent By *</label>
          <select
            name="sentBy"
            id="sentBy"
            className="p-2 border border-gray-300 rounded-lg flex-5"
            value={sent_by}
            onChange={(e) => setSentBy(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Sent By
            </option>
            <option value="Pota Mohamed">Pota Mohamed</option>

            <option value="Mohamed Ragab">Mohamed Ragab</option>
            <option value="Mido Khaled">Mido Khaled</option>

            <option value="Abdo Saeed">Abdo Saeed</option>
            <option value="Gemy">Gemy</option>
            <option value="Youssef Halawany">Youssef Halawany</option>

            <option value="Mohamed Faried">Mohamed Faried</option>
            <option value="Ahmed Ragab">Ahmed Ragab</option>
            <option value="Shehab Eissa">Shehab Eissa</option>
          </select>
        </div>
      )}
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Title *</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="(e.g.,) 2022 Ford F150"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Odometer *</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="Enter Odometer"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Ad Link *</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="Enter Ad Link"
          value={ad_link}
          onChange={(e) => setAdLink(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Price *</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Est. Value</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="Enter Estimated Value"
          value={est_value}
          onChange={(e) => setEstValue(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Source *</label>
        <select
          name="source"
          id="source"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Source
          </option>
          <option value="kijiji">Kijiji</option>
          <option value="autotrader">Autotrader</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Car"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {errorText || "An error occurred while adding the car."}
        </p>
      )}
    </form>
  );
}
