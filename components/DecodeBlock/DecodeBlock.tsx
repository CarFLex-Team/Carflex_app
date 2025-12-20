"use client";

import { useState } from "react";
import DecodeResults from "../DecodeResults/DecodeResults";

export default function DecodeBlock() {
  const [vin, setVin] = useState("");
  const [vinInput, setVinInput] = useState("");
  const onaAnotherVin = () => {
    setVin("");
    setVinInput("");
  };
  return (
    <div className="p-4  rounded-md44 ">
      <div className="text-center text-2xl lg:text-3xl font-semibold mb-5">
        Find out everything about a vehicle.
      </div>
      <div className="w-full flex items-center justify-center gap-2 mb-4">
        <input
          type="text"
          className="w-1/2 p-2 border rounded-md focus:outline-primary"
          placeholder="Enter your 17-character VIN"
          value={vinInput}
          onChange={(e) => setVinInput(e.target.value)}
          maxLength={17}
        />

        <button
          disabled={vinInput.length !== 17}
          className={`px-3 py-2 rounded-md text-white transition bg-primary
      ${
        vinInput.length === 17
          ? " hover:bg-lightPrimary cursor-pointer"
          : "opacity-70"
      }
    `}
          onClick={() => setVin(vinInput)}
        >
          Decode VIN
        </button>
      </div>

      {vin ? <DecodeResults vin={vin} onaAnotherVin={onaAnotherVin} /> : ""}
    </div>
  );
}
