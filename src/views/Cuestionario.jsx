import { Item } from "../components/item/Item";
import { SeleccionUnica } from "../components/rubrica/Rubricas";

export const Cuestionario = () => {
  return (
    <>
      <div className="container-fluid">
        <Item nombre={"Una visión plasmada en un documento"}>
          <SeleccionUnica nombreItem={"vision"} />
        </Item>
        <Item nombre={"Una misión plasmada en un documento."}>
          <SeleccionUnica nombreItem={"mision"} />
        </Item>
        <Item
          nombre={
            "Carteles a la vista en la zona de trabajo, oficinas o espacios comunes."
          }
        >
          <SeleccionUnica nombreItem={"carteles"} />
        </Item>
        <Item
          nombre={
            "Una inducción al iniciar labores que incluye socializar la visión y misión"
          }
        >
          <SeleccionUnica nombreItem={"induccion"} />
        </Item>
        <Item
          nombre={"Espacios en las reuniones para recordar la visión y misión "}
        >
          <SeleccionUnica nombreItem={"espacios"} />
        </Item>
      </div>
    </>
  );
};
<<<<<<< HEAD
/* 

*/
=======
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
