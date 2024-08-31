import { Alert } from "@mui/material";

export const NoFiles = () => {
  return (
    <>
      <div style={{ margin: "2rem 0", width: "100%" }}>
        <Alert variant="filled" severity="info" sx={{ borderRadius: 0 }}>
          No hay registros
        </Alert>
      </div>
    </>
  );
};
