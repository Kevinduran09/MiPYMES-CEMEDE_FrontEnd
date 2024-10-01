import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
export const DetailsButton = ({ handleDetails, id }) => {
  const handleClick = () => {
    handleDetails(id);
  };
  return (
    <>
      <Button
        startIcon={<Visibility />}
        variant="outlined"
        color="primary"
        onClick={handleClick}
      >
        Ver
      </Button>
    </>
  );
};
