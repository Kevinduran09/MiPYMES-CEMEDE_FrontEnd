import Swal from "sweetalert2";
import {
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  Backdrop,
  FormControl,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { updateorganizacion as upOrganization } from "../../services/OrganizacionService";
import { useMutation, useQueryClient } from "react-query";

export const UpdateOrganization = ({ org }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  console.log(org);

  const [organization, setOrganization] = useState({
    nombre: org.nombre,
    telefono_movil: org.telefono_movil,
    telefono_fijo: org.telefono_fijo,
    email: org.email,
    website_url: org.website_url,
    sector_empresarial: org.sector_empresarial,
    figura_legal: org.figura_legal,
    tiempo_operacion_anios: org.tiempo_operacion_anios,
  });

  const updateOrganizationMutation = useMutation({
    mutationFn: upOrganization,
    onSuccess: () => {
      Swal.fire({
        title: "Actualizado",
        text: "Organización actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#015dfc",
      });
      queryClient.invalidateQueries("organizaciones");
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la organización",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede revertir!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#015dfc",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrg();
      }
    });
  };

  const updateOrg = () => {
    updateOrganizationMutation.mutate({
      ...organization,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization((organization) => ({
      ...organization,
      [name]: value,
    }));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "2rem",
    p: 4,
    color: "#1A1A1A",
    fontFamily: "inherit",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        startIcon={<EditIcon />}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Editar
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h3"
              style={{ marginBottom: "2rem" }}
            >
              Actualizar Organización
            </Typography>
            <form className="form-update" onSubmit={handleSubmit}>
              <div className="form">
                <FormControl>
                  <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={organization.nombre}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="telefono_movil"
                    name="telefono_movil"
                    label="Teléfono Móvil"
                    value={organization.telefono_movil}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="telefono_fijo"
                    name="telefono_fijo"
                    label="Teléfono Fijo"
                    value={organization.telefono_fijo}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={organization.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="website_url"
                    name="website_url"
                    label="URL Sitio Web"
                    value={organization.website_url}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="sector_empresarial"
                    name="sector_empresarial"
                    label="Sector Empresarial"
                    value={organization.sector_empresarial}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="figura_legal"
                    name="figura_legal"
                    label="Figura Legal"
                    value={organization.figura_legal}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="tiempo_operacion_anios"
                    name="tiempo_operacion_anios"
                    label="Años de Operación"
                    type="number"
                    value={organization.tiempo_operacion_anios}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "2rem", width: "25%", textAlign: "center" }}
              >
                Actualizar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
