import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useEmpStore = create(
  persist(
    (set) => ({
      empresario: null,
      setEmpresario: (emp) => set({ empresario: emp }),
      updateCurrentEmpresario: (data) => set((state) => ({
        empresario: { ...state.empresario, ...data },
      })),
      clear: () => set({ empresario: null }),
    }),
    {
      name: "empState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
