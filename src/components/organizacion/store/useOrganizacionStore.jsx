import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOrganizacionStore = create(
  persist(
    (set) => ({
      organizacion: {
        nombre: "",
        telefono_movil: "",
        telefono_fijo: null,
        email: "",
        pagina_web: false,
        website_url: null,
        facebook: false,
        instagram_activo: false,
        youtube_activo: false,
        tiktok_activo: false,
        linkedin_activo: false,
        pinterest_activo: false,
        whatsapp_activo: false,
        otra_red_social_activo: false,
        otra_red_social_nombre: null,
        sector_empresarial: null,
        pesca: false,
        agricultura: false,
        agroindustria: false,
        pecuario: false,
        coordenadas: null,
        canton: "",
        distrito: "",
        comunidad: "",
        direccion_exacta: "",
        descripcion: "",
        ccss_inscrita: false,
        ins_inscrita: false,
        hacienda_inscrita: false,
        meic_inscrita: false,
        figura_legal: null,
        tiempo_operacion_anios: "",
        cantidad_personas_fundadoras: 0,
        cantidad_personas_fundadoras_femenino: 0,
        cantidad_personas_fundadoras_masculino: 0,
        cantidad_personas_duenas_actuales: 0,
        cantidad_personas_duenas_actuales_femenino: 0,
        cantidad_personas_duenas_actuales_masculino: 0
      },
      setOrganizacion: (emp) => set({ organizacion: emp }),
      updateCurrentOrganizacion: (data) => set((state) => ({
        organizacion: { ...state.organizacion, ...data },
      })),
      clear: () => set({
        organizacion: {
          nombre: "",
          telefono_movil: "",
          telefono_fijo: "",
          email: "",
          pagina_web: false,
          website_url: null,
          facebook: false,
          instagram_activo: false,
          youtube_activo: false,
          tiktok_activo: false,
          linkedin_activo: false,
          pinterest_activo: false,
          whatsapp_activo: false,
          otra_red_social_activo: false,
          otra_red_social_nombre: null,
          sector_empresarial: null,
          pesca: false,
          agricultura: false,
          agroindustria: false,
          pecuario: false,
          coordenadas: null,
          canton: "",
          distrito: "",
          comunidad: "",
          direccion_exacta: "",
          descripcion: "",
          ccss_inscrita: false,
          ins_inscrita: false,
          hacienda_inscrita: false,
          meic_inscrita: false,
          figura_legal: null,
          tiempo_operacion_anios: null,
          cantidad_personas_fundadoras: 0,
          cantidad_personas_fundadoras_femenino: 0,
          cantidad_personas_fundadoras_masculino: 0,
          cantidad_personas_duenas_actuales: 0,
          cantidad_personas_duenas_actuales_femenino: 0,
          cantidad_personas_duenas_actuales_masculino: 0
        }
      }),
    }),
    {
      name: "orgState",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
