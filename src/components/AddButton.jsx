import React from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
export const AddButton = ({ route }) => {

    return (
        <Button
            startIcon={<AddIcon />}
            color="primary"
            variant="text"
            onClick={() => route()}
        >
            Agregar nuevo
        </Button>
    );
};
