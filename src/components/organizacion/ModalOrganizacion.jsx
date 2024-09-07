import React, { useEffect } from "react";
import { DialogComponent } from "../DialogComponent";
import { useOrganizacionActions } from "./handlers/useOrganizacionActions";
import { FormField } from "../FormField";
import { useForm } from "react-hook-form";
import { useOrganizacionStore } from "../../hooks/useOrganizacionStore";
export const ModalOrganizacion = ({ open, setOpen }) => {
  const { organizacion, clear } = useOrganizacionStore();
  const { createOrganizacion, updateOrganizacion } = useOrganizacionActions();
  const methods = useForm({
    defaultValues: { ...organizacion },
  });

  useEffect(() => {
    methods.reset({ ...organizacion });
  }, [organizacion, open]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (organizacion == null) {
      createOrganizacion(data);
    } else {
      updateOrganizacion(data);
    }
    setOpen(false);
  });

  return (
    <DialogComponent
      setOpen={setOpen}
      open={open}
      clear={clear}
      onSubmit={onSubmit}
      flag={!!organizacion}
      methods={methods}
    >
      <div
        className="form"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <FormField label="Nombre" name="nombre" />
        <FormField label="Teléfono Móvil" name="telefono_movil" />
        <FormField label="Teléfono Fijo" name="telefono_fijo" />
        <FormField label="Email" name="email" type="email" />
        <FormField label="URL Sitio Web" name="website_url" />
        <FormField label="Sector Empresarial" name="sector_empresarial" />
        <FormField label="Figura Legal" name="figura_legal" />
        <FormField
          label="Años de Operación"
          name="tiempo_operacion_anios"
          type="number"
        />
        <FormField label="Descripción" name="descripcion" />
      </div>
    </DialogComponent>
  );
};
