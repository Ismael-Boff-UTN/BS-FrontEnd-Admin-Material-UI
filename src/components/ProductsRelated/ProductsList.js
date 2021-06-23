import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";
import swal from "sweetalert2";
import AddNewIngrediente from './AddNewProducto';
const ProductsList = () => {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  
  useEffect(() => {
    axios
      .get("https://buen-sabor-api.herokuapp.com/api/articulos/admin", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setProductos(response.data.articulos);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [token, onDelete]);

  const cols = [
    {
      title: "Denominacion",
      field: "denominacion",
    },
    {
      title: "¿Es Manufacturado?",
      field: "esManufacturado",
      render: (rowData) =>
        rowData.esManufacturado === true ? (
          <Chip
            label="SI"
            style={{ backgroundColor: "green", color: "white" }}
          />
        ) : (
          <Chip label="NO" style={{ backgroundColor: "red", color: "white" }} />
        ),
    },
    {
      title: "Imagen",
      field: "imagen",
      render: (rowData) => (
        <img
          src={rowData.imagen}
          style={{ width: 50, borderRadius: "20%" }}
          alt="prod"
        />
      ),
    },
    {
      title: "Precio Venta",
      field: "precioVenta",
      type: "numeric",
    },
    {
      title: "Tiempo Cocción",
      field: "tiempoEstimadoCocina",
    },

    {
      title: "Estado",
      field: "estado",
      render: (rowData) =>
        rowData.estado === true ? (
          <Chip
            label="Activo"
            style={{ backgroundColor: "green", color: "white" }}
          />
        ) : (
          <Chip
            label="Inactivo"
            style={{ backgroundColor: "red", color: "white" }}
          />
        ),
    },
  ];

  const onDeleteProducto = useCallback(
    (id) => {
      axios
        .delete(`https://buen-sabor-api.herokuapp.com/api/articulos/${id}`, {
          headers: {
            "x-token": token,
          },
        })
        .then((response) => {
          console.log(response.data.msg);
          swal.fire("", `${response.data.msg}`, "success");

          if (onDelete === false) {
            setOnDelete(true);
          } else {
            setOnDelete(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },[token, onDelete]
  );

  return (
    <div>
      {productos.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <MaterialTable
            columns={cols}
            data={productos}
            title="Listado De Productos"
            actions={[
              {
                icon: "delete",
                tooltip: "Eliminar Producto",
                onClick: (e, rowData) => onDeleteProducto(rowData._id),
                  //alert("presionaste " + rowData.denominacion),
              }
            ]}
            options={{ actionsColumnIndex: -1, exportButton: true }}
            localization={{ header: { actions: "Acciones" } }}
            editable={{
                onRowUpdate: async (newData,oldData) =>{
                  const dataUpdate = [...productos];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;

                  await axios
                  .put(`https://buen-sabor-api.herokuapp.com/api/articulos/${oldData._id}`,
                      newData, {
                        headers: {
                          "x-token": token,
                        },
                      }
                    )
                    .then((response) => {
                      swal.fire("OK!", `${response.data.msg}`, "success");
                      if (onDelete === false) {
                        setOnDelete(true);
                      } else {
                        setOnDelete(false);
                      }
                    })
                    .catch((e) =>{console.log(e);});
                  }
            }}
          />
        </>
      )}
      <AddNewIngrediente/>
    </div>
  );
};

export default ProductsList;
