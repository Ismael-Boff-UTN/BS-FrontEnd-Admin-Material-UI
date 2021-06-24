import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";
import swal from "sweetalert2";
import AddNewIngrediente from "./AddNewProducto";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const ProductsList = () => {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    axios
      .get("https://buen-sabor-api.herokuapp.com/api/articulos/admin", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        setProductos(response.data.articulos);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token, onDelete]);

  const cols = [
    {
      title: "Denominacion",
      field: "denominacion",
      type: "text",
    },
    {
      title: "¿Es Manufacturado?",
      field: "esManufacturado",
      lookup: {
        true: "Si",
        false: "No"
      },
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
      editComponent: (props) => (
        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange= {e => props.onChange(e.target.value)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              <CloudUploadIcon />
              &nbsp;&nbsp; Subir
            </Button>
          </label>
        </div>
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
      editable: "never",
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
    },
    [token, onDelete]
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
              },
            ]}
            options={{ actionsColumnIndex: -1, exportButton: true }}
            localization={{ header: { actions: "Acciones" } }}
            editable={{
              onRowUpdate: async (newData, oldData) => {
                const dataUpdate = [...productos];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;

                await axios
                  .put(
                    `https://buen-sabor-api.herokuapp.com/api/articulos/${oldData._id}`,
                    newData,
                    {
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
                  .catch((e) => {
                    console.log(e);
                  });
              },
            }}
          />
        </>
      )}
      <AddNewIngrediente />
    </div>
  );
};

export default ProductsList;
