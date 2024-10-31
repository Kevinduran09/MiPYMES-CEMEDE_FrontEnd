import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUsuarioStore = create(
  persist(
    (set) => ({
      usuario: null,
      setUsuario: (user) => set({ usuario: user }),
      clear: () => set({ usuario: null }),
    }),
    {
      name: "usuarioState",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
