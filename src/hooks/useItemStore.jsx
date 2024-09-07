import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useItemStore = create(
    persist(
        (set) => ({
            selectedItem: null,
            currentItem: {
                id: Date.now(),
                nombre: '',
                peso: 0,
                rubricaId: '',
                indicadorId: '',
            },
            setSelectedItem: (item) => set({ selectedItem: item }),
            clearSelectedItem: () => set({ selectedItem: null }),
            updateCurrentItem: (data) => set((state) => ({
                currentItem: { ...state.currentItem, ...data },
            })),
            resetCurrentItem: () =>
                set({
                    currentItem: {
                        id: Date.now(),
                        nombre: '',
                        peso: 0,
                        rubricaId: '',
                        indicadorId: '',
                    },
                }),
        }),
        {
            name: "itemState",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
