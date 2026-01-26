"use client";

import { useSettingsStore } from "@/store/useSettingStore";

export default function CallerPicker() {
  const callerName = useSettingsStore((s) => s.callerName);
  const setCallerName = useSettingsStore((s) => s.setCallerName);

  return (
    <select
      value={callerName}
      onChange={(e) => setCallerName(e.target.value)}
      className="border border-gray-400 p-2 rounded outline-none"
    >
      <option value="" disabled>
        Pick A Caller...
      </option>
      <option value="dabou">Dabou</option>
      <option value="ibrahim">Ibrahim</option>
      {/* <option value="Mike">Mike</option> */}
    </select>
  );
}
