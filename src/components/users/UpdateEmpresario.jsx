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
import { updateEmpresario as upEmpresario } from "../../services/EmpresarioService";
import { useMutation, useQueryClient } from "react-query";

export const UpdateEmpresario = ({ cls }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [Empresario, setEmpresario] = useState({
    nombre: cls.nombre,
    telefono: cls.telefono,
    correo_contacto: cls.correo_contacto,
    numero_personas_fundadoras: cls.numero_personas_fundadoras,
    numero_personas: cls.numero_personas,
  });

  const updateEmpresarioMutation = useMutation({
    mutationFn: upEmpresario,
    onSuccess: () => {
      Swal.fire({
        title: "Actualizado",
        text: "Usuario actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#015dfc",
      });
      queryClient.invalidateQueries("Empresarios");
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el usuario",
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
        updateEmp();
      }
    });
  };

  const updateEmp = () => {
    updateEmpresarioMutation.mutate({
      ...Empresario,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresario((Empresario) => ({
      ...Empresario,
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
              Actualizar usuario
            </Typography>
            <form className="form-update" onSubmit={handleSubmit}>
              <div className="form">
                <FormControl>
                  <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={Empresario.nombre}
                    inputProps={{
                      pattern: "^[A-Z][a-z]+$",
                      maxLength: 20,
                      minLength: 2,
                      title:
                        "Debe empezar con una letra mayúscula, seguido de hasta 19 letras minúsculas, y tener entre 2 y 20 caracteres",
                    }}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="telefono"
                    name="telefono"
                    label="Teléfono"
                    inputProps={{
                      pattern: "^[0-9]+$",
                      maxLength: 10,
                      minLength: 8,
                      title: "Por favor, ingrese un número telefónico válido",
                    }}
                    value={Empresario.telefono}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="correo_contacto"
                    name="correo_contacto"
                    label="Correo de Contacto"
                    value={Empresario.correo_contacto}
                    type={"email"}
                    inputProps={{
                      pattern: ".{5,50}",
                      maxLength: 50,
                      title:
                        "El correo electrónico debe tener entre 5 y 50 caracteres",
                    }}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="numero_personas_fundadoras"
                    name="numero_personas_fundadoras"
                    label="Núm. Personas Fundadoras"
                    inputProps={{
                      pattern: "^[0-9]+$",
                      maxLength: 2,
                      title: "Por favor, ingrese un número válido",
                    }}
                    value={Empresario.numero_personas_fundadoras}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="numero_personas"
                    name="numero_personas"
                    label="Núm. Personas"
                    inputProps={{
                      pattern: "^[0-9]+$",
                      maxLength: 4,
                      title: "Por favor, ingrese un número válido",
                    }}
                    value={Empresario.numero_personas}
                    onChange={handleChange}
                    required
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
