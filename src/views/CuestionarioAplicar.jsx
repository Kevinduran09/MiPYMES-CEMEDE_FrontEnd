import React, { useState, useEffect } from "react";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";

export const CuestionarioAplicar = ({ id }) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchCuestionario = async () => {
      const data = sessionStorage.getItem("form");
      setQuestionnaire(JSON.parse(data));
    };
    fetchCuestionario();
  }, [id]);

  if (!questionnaire) return <div>Cargando...</div>;

  const handleOptionChange = (itemId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [itemId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(responses);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{questionnaire.nombre}</h1>
      {questionnaire.items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {item.nombre} (Peso: {item.peso})
            </FormLabel>
            <RadioGroup
              name={`item-${item.id}`}
              value={responses[item.id] || ""}
              onChange={(e) => handleOptionChange(item.id, e.target.value)}
            >
              {item.rubrica.opciones.map((opcion) => (
                <FormControlLabel
                  key={opcion.id}
                  value={opcion.valor}
                  control={<Radio />}
                  label={opcion.nombre}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ))}
      <button type="submit">Enviar Respuestas</button>
    </form>
  );
};
