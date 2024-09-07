import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
export const FormField = ({ label, name, options, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl fullWidth margin="normal">
      <TextField
        label={name}
        {...register(name, {
          required: `${label} es requerido`,
          ...options,
        })}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...rest}
      />
    </FormControl>
  );
};
