import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
  callerName: string;
  setCallerName: (name: string) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      callerName: "",
      setCallerName: (name) => set({ callerName: name }),
    }),
    {
      name: "settings-storage", // localStorage key
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
