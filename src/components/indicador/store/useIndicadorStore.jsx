import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useIndicadorStore = create(
    persist(
        (set) => ({
            selectedIndicador: null,
            currentIndicador: {
                id: Date.now(),
                nombre: '',
                descripcion: '',
                tipo: '',
                indicadorPadreId: 0
            },
            setSelectedIndicador: (indicador) => set({ selectedIndicador: indicador }),
            clearSelectedIndicador: () => set({ selectedIndicador: null }),
            updateCurrentIndicador: (data) => set((state) => ({
                currentIndicador: { ...state.currentIndicador, ...data },
            })),
            resetCurrentIndicador: () =>
                set({
                    currentIndicador: {
                        id: Date.now(),
                        nombre: '',
                        descripcion: '',
                        tipo: '',
                        indicadorPadreId: 0
                    },
                }),
        }),
        {
            name: "indicadorState",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
