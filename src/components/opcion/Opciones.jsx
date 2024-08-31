import { Opcion } from "./Opcion"

export const Si = ({nombre}) => {
    return (
        <>
            <Opcion>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={nombre} id={nombre+"Si"} />
                    <label className="form-check-label" htmlFor={nombre+"Si"}>
                        Si
                    </label>
                </div>
            </Opcion>
        </>
    );
}

export const No = ({nombre}) => {
    return (
        <>
            <Opcion>
                <div className="form-check">
                    <input className="form-check-input" type="radio"  name={nombre} id={nombre+"No"} />
                    <label className="form-check-label" htmlFor={nombre+"No"}>
                        No
                    </label>
                </div>
            </Opcion>
        </>
    );
}