"use client";

import { useState } from "react";

export function AddCarForm({
  onSuccess,
  sheet,
}: {
  onSuccess: () => void;
  sheet?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [odometer, setOdometer] = useState("");
  const [ad_link, setAdLink] = useState("");
  const [price, setPrice] = useState("");
  const [source, setSource] = useState("");
  const [sent_by, setSentBy] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError(false);
      const res = await fetch(`/api/cars/sheet/${sheet}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          odometer,
          ad_link,
          price,
          source,
          sent_by,
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

      console.error("Failed to copy text or save car details", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Sent By</label>
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
          <option value="George Eissa">George Eissa</option>
          <option value="Mohamed Ragab">Mohamed Ragab</option>
          <option value="Mido Khaled">Mido Khaled</option>
          <option value="Hossam Hamdy">Hossam Hamdy</option>
          <option value="Abdo Saeed">Abdo Saeed</option>
          <option value="Gemy">Gemy</option>
          <option value="Youssef Halawany">Youssef Halawany</option>
          <option value="Youssef Mahmoud">Youssef Mahmoud</option>
          <option value="Mohamed Faried">Mohamed Faried</option>
          <option value="Ahmed Ragab">Ahmed Ragab</option>
          <option value="Shehab Eissa">Shehab Eissa</option>
        </select>
      </div>
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Title</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-5"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <label className=" flex-2">Odometer</label>
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
        <label className=" flex-2">Ad Link</label>
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
        <label className=" flex-2">Price</label>
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
        <label className=" flex-2">Source</label>
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
          Failed to add Car. Please try again.
        </p>
      )}
    </form>
  );
}
