import Swal from "sweetalert2";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteorganizacion } from "../../services/OrganizacionService";
import { useMutation, useQueryClient } from "react-query";

export const DeleteOrganization = ({ id }) => {
  const queryClient = useQueryClient();

  const deleteOrganizacionMutation = useMutation({
    mutationFn: deleteorganizacion,
    onSuccess: () => {
      Swal.fire({
        title: "Eliminado",
        text: "Organizacion eliminado correctamente",
        icon: "success",
      });
      queryClient.invalidateQueries("organizaciones");
      queryClient.refetchQueries();
    },
    onError: (error) => {},
  });

  const handleDelete = (e) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrganizacionMutation.mutate(id);
      }
    });
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        variant="contained"
        color="error"
        onClick={handleDelete}
      >
        Eliminar
      </Button>
    </>
  );
};
