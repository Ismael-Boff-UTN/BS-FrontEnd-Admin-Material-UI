import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";
import swal from "sweetalert2";
import AddNewCategoria from "./AddNewCategoria";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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

const CategoriasList = () => {
  const token = localStorage.getItem("token");
  const [categorias, setCategorias] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  const classes = useStyles();

  const onDeleteCategoria = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:4000/api/categorias/${id}`, {
          headers: {
            "x-token": token,
          },
        })
        .then((response) => {
          // Obtenemos los datos

          console.log(response.data.msg);
          swal.fire("", `${response.data.msg}`, "success");

          if (onDelete === false) {
            setOnDelete(true);
          } else {
            setOnDelete(false);
          }
        })
        .catch((e) => {
          // Capturamos los errores
          console.log(e);
        });
    },
    [token, onDelete]
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categorias/admin", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setCategorias(response.data.categorias);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [token, onDelete]);

  const cols = [
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Imagen",
      field: "img",
      render: (rowData) => (
        <img
          src={rowData.img}
          style={{ width: 50, borderRadius: "20%" }}
          alt="product"
        />
      ),
      editComponent: (props) => (
        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
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

  return (
    <div>
      {categorias.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <MaterialTable
            columns={cols}
            data={categorias}
            title="Listado De Categorias"
            actions={[
              {
                icon: "delete",
                tooltip: "Eliminar Categoria",
                onClick: (e, rowData) => onDeleteCategoria(rowData._id),
              },
            ]}
            options={{ actionsColumnIndex: -1, exportButton: true }}
            localization={{ header: { actions: "Acciones" } }}
            editable={{
              onRowUpdate: async (newData, oldData) => {
                const dataUpdate = [...categorias];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;

                await axios.put(
                  `http://localhost:4000/api/categorias/${oldData._id}`,
                  newData,
                  {
                    headers: {
                      "x-token": token,
                    },
                  }
                )
                .then((response) => {
                  // Obtenemos los datos
                  swal.fire("Actualizado!",`${response.data.msg}`,"success");
                  if (onDelete === false) {
                    setOnDelete(true);
                  } else {
                    setOnDelete(false);
                  }
                })
                .catch((e) => {
                  // Capturamos los errores
                  console.log(e);
                });
              }
            }}
          />
        </>
      )}
      <AddNewCategoria/>
    </div>
  );
};

export default CategoriasList;
