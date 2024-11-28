import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

export const FormCheckBox = ({ label, name, onChange }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={!!field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                if (onChange) onChange(e.target.checked);
              }}
            />
          }
          label={label}
        />
      )}
    />
  );
};
