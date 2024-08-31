import { Rubrica } from "./Rubrica"
import { Opcion } from "../opcion/Opcion"
import { No, Si } from './../opcion/Opciones';

export const SeleccionUnica = ({nombreItem}) => {
    return (
        <Rubrica nombre={"Seleccion unica"}>
            <Si nombre={nombreItem}/>
            <No nombre={nombreItem}/>
        </Rubrica>
    )
}