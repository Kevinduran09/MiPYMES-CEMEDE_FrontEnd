import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
export const FormField = ({
  label,
  name,
  isRequerided = true,
  rules,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const rulesArray = isRequerided
    ? {
        required: `${label} es requerido`,
        ...rules,
      }
    : rules;
  return (
    <FormControl fullWidth margin="normal">
      <TextField
        label={label}
        {...register(name, rulesArray)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...props}
      />
    </FormControl>
  );
};
