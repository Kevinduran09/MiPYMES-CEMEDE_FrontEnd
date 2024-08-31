import { useState } from "react";
const optionTypes = {
  "Si/No": [
    { id: 1, nombre: "Sí", valor: 1 },
    { id: 2, nombre: "No", valor: 0 },
  ],
  "Likert V1": [
    { id: 1, nombre: "Siempre", valor: 1 },
    { id: 2, nombre: "En Ocasiones", valor: 0.5 },
    { id: 3, nombre: "Nunca", valor: 0 },
  ],
  "Likert V2": [
    { id: 1, nombre: "Siempre", valor: 1 },
    { id: 2, nombre: "Casi Siempre", valor: 0.75 },
    { id: 3, nombre: "En Ocasiones", valor: 0.5 },
    { id: 4, nombre: "Casi Nunca", valor: 0.25 },
    { id: 5, nombre: "Nunca", valor: 0 },
  ],
};

const initialQuestionnaire = {
  nombre: "",
  items: [
    {
      id: Date.now(),
      nombre: "",
      peso: 0,
      rubrica: { id: 1, nombre: "Si/No", opciones: optionTypes["Si/No"] },
      indicador: { id: 1, nombre: "Proceso" },
    },
  ],
};

export const CuestionarioForm = ({ id, existingQuestionnaire }) => {
  const [questionnaire, setQuestionnaire] = useState(
    existingQuestionnaire || initialQuestionnaire
  );

  const handleQuestionnaireChange = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...questionnaire.items];
    updatedItems[index][key] = value;
    setQuestionnaire({ ...questionnaire, items: updatedItems });
  };

  const handleOptionTypeChange = (index, type) => {
    const updatedItems = [...questionnaire.items];
    updatedItems[index].rubrica = {
      id: Date.now(),
      nombre: type,
      opciones: optionTypes[type],
    };
    setQuestionnaire({ ...questionnaire, items: updatedItems });
  };

  const addItem = () => {
    setQuestionnaire({
      ...questionnaire,
      items: [
        ...questionnaire.items,
        {
          id: Date.now(),
          nombre: "",
          peso: 0,
          rubrica: {
            id: Date.now(),
            nombre: "Si/No",
            opciones: optionTypes["Si/No"],
          },
          indicador: { id: 1, nombre: "Proceso" },
        },
      ],
    });
  };

  const removeItem = (index) => {
    setQuestionnaire({
      ...questionnaire,
      items: questionnaire.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCuestionario(id, questionnaire);
    } else {
      console.log(questionnaire);
      // await createCuestionario(questionnaire);
      sessionStorage.setItem("form", JSON.stringify(questionnaire));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={questionnaire.nombre}
        onChange={handleQuestionnaireChange}
        placeholder="Nombre del cuestionario"
      />
      {questionnaire.items.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            value={item.nombre}
            onChange={(e) => handleItemChange(index, "nombre", e.target.value)}
            placeholder="Nombre del item"
          />
          <input
            type="number"
            value={item.peso}
            onChange={(e) =>
              handleItemChange(index, "peso", parseInt(e.target.value))
            }
            placeholder="Peso del item"
          />
          <select
            value={item.rubrica.nombre}
            onChange={(e) => handleOptionTypeChange(index, e.target.value)}
          >
            {Object.keys(optionTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => removeItem(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Agregar Item
      </button>
      <button type="submit">Guardar Cuestionario</button>
    </form>
  );
};
