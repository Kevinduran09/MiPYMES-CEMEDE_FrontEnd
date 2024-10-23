import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCuestionarioStore = create(
  persist(
    (set) => ({
      selectedCuestionario: null,
      currentCuestionario: {
        id: Date.now(),
        nombre: "",
        indicadores: [],
      },
      applyCuestionario: {
        idCuestionario: 0,
        idOrganizacion: 0,
        idAplicador: 0,
        fechaRealizacion: 0,
      },
      setSelectedCuestionario: (cuestionario) =>
        set({ selectedCuestionario: cuestionario }),
      clearSelectedCuestionario: () => set({ selectedCuestionario: null }),
      updateCurrentCuestionario: (data) =>
        set((state) => ({
          currentCuestionario: { ...state.currentCuestionario, ...data },
        })),
      resetCurrentCuestionario: () =>
        set({
          currentCuestionario: {
            id: Date.now(),
            nombre: "",
            indicadores: [],
          },
        }),
      respuestas: [],

      // Función para agregar o actualizar una respuesta
      setRespuesta: (
        idCuestionarioOrganizacion,
        idItem,
        valor_opcion_seleccionada,
        observaciones
      ) =>
        set((state) => {
          // Verifica si la respuesta ya existe en el estado
          const existingRespuesta = state.respuestas.find(
            (respuesta) =>
              respuesta.idItem === idItem &&
              respuesta.idCuestionarioOrganizacion ===
                idCuestionarioOrganizacion
          );

          // Si existe, la actualizamos; si no, agregamos una nueva
          if (existingRespuesta) {
            return {
              respuestas: state.respuestas.map((respuesta) =>
                respuesta.idItem === idItem &&
                respuesta.idCuestionarioOrganizacion ===
                  idCuestionarioOrganizacion
                  ? { ...respuesta, valor_opcion_seleccionada, observaciones }
                  : respuesta
              ),
            };
          } else {
            return {
              respuestas: [
                ...state.respuestas,
                {
                  idCuestionarioOrganizacion,
                  idItem,
                  valor_opcion_seleccionada,
                  observaciones,
                },
              ],
            };
          }
        }),

      // Resetear todas las respuestas (opcional, si lo necesitas)
      resetRespuestas: () => set({ respuestas: [] }),
    }),
    {
      name: "cuestionarioState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
