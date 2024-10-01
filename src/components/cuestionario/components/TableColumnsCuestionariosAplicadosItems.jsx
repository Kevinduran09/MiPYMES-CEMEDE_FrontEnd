
export const TableColumnsCuestionariosAplicadosItems = () => {

  const columns = [
    {
      field: "item", headerName: "Item", width: 250,
      valueGetter: (params) => params.row.item?.nombre
    },
    {
      field: "descripcion", headerName: "Descripcion del item", width: 250,
      valueGetter: (params) => params.row.item?.descripcion
    },
    {
      field: "evidencia", headerName: "Evidencia", width: 250,
      valueGetter: (params) => params.row.item?.evidencia
    },
    {
      field: "cumple", headerName: "Cumple", width: 80,
      valueGetter: (params) => {
        const rubricaOpciones = params.row.item.rubrica.opciones;
        const opcionSeleccionada = rubricaOpciones.find(
          opcion => opcion.valor_alfa === params.row.valor_opcion_seleccionada
        );
        return opcionSeleccionada ? opcionSeleccionada.nombre : "Valor no válido";
      }
    },
    {
      field: "observaciones", headerName: "Observaciones", width:250
    }
  ];
  return { columns };
};