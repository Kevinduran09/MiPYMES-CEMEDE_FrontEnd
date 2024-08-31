export const Item = ({nombre, children}) =>{
    return (
        <>
            <p>{nombre}</p>
            {children}
        </>
    );
}