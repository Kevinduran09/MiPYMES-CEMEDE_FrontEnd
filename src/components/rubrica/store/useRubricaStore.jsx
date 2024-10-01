import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRubricaStore = create(
    persist(
        (set) => ({
            selectedRubrica: null,
            currentRubrica: {
                id: Date.now(),
                nombre: '',
                tipo: 'radio',
                opciones: [],
            },
            setSelectedRubrica: (rubrica) => set({ selectedRubrica: rubrica }),
            clearSelectedRubrica: () => set({ selectedRubrica: null }),
            updateCurrentRubrica: (data) => set((state) => ({
                currentRubrica: { ...state.currentRubrica, ...data },
            })),
            resetCurrentRubrica: () =>
                set({
                    currentRubrica: {
                        id: Date.now(),
                        nombre: '',
                        tipo: 'radio',
                        opciones: [],
                    },
                }),
        }),
        {
            name: "rubricaState",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
