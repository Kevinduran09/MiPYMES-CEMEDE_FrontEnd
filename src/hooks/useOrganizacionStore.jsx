import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOrganizacionStore = create(
  persist(
    (set) => ({
      organizacion: null,
      setOrganizacion: (emp) => set({ organizacion: emp }),
      clear: () => set({ organizacion: null }),
    }),
    {
      name: "orgState",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
