import Swal from "sweetalert2";

export const EliminarDialogo = (mutation, id) => {
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
            mutation.mutate(id);
        }
    });
};

export const ConfirmarDialogo = (mutation, data, onSuccess) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede revertir.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            mutation.mutate(data, {
                onSuccess: () => {
                    if (onSuccess) {
                        onSuccess();
                    }
                }
            });
        }
    });
};


export const SuccessDialogo = (title, tipo, accion) => {
    Swal.fire({
        title: title,
        text: `${tipo} ${accion} correctamente`,
        icon: "success",
    });
}