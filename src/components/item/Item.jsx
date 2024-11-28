import { Container } from "react-bootstrap";
import { getItems } from "./services/ItemService";
import { useQuery } from "react-query";
import { useItemStore } from "./store/useItemStore";
import { TableComponent } from "../TableComponent";
import { TableColumns } from "./components/TableColumns";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
export const Item = () => {
  const navigate = useNavigate();
  const { columns } = TableColumns();

  const { resetCurrentItem, clearSelectedItem } = useItemStore();
  const {
    isLoading,
    isError,
    data: dataRows,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const navigation = () => {
    resetCurrentItem();
    clearSelectedItem();
    navigate("/items/crear");
  };

  return (
    <div>
      <TableComponent
        title={"Items"}
        columns={columns}
        rowsSet={dataRows}
        isError={isError}
        isLoading={isLoading}
        customButtons={
          <CustomButton
            action={navigation}
            icon={<Add />}
            text={"Agregar nuevo"}
          />
        }
      />
    </div>
  );
};
