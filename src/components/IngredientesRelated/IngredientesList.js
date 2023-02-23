import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import swal from "sweetalert2";
import Chip from "@material-ui/core/Chip";
import AddNewIngrediente from "./AddNewIngrediente";

const IngredientesList = () => {
  const token = localStorage.getItem("token");
  const [ingredientes, setIngredientes] = useState([]);
  const [onDelete, setOnDelete] = useState(false);

  const onDeleteIngrediente = useCallback(
    (id) => {
      axios
        .delete(`${process.env.REACT_APP_BASE_API_URL}/ingredientes/${id}`, {
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
      .get(`http://localhost:4000/api/ingredientes`, {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setIngredientes(response.data.ingredientes);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [onDelete]);

  const cols = [
    {
      title: "Nombre",
      field: "denominacion",
    },
    {
      title: "Ingrediente?",
      field: "esIngrediente",
      editable: "never",
      render: (rowData) =>
        rowData.esIngrediente === true ? (
          <Chip
            label="SI"
            style={{ backgroundColor: "green", color: "white" }}
          />
        ) : (
          <Chip
            label="NO"
            style={{ backgroundColor: "red", color: "white" }}
          />
        ),
    },
    {
      title: "Precio Compra",
      field: "precioCompra",
      type: "numeric",
    },
    {
      title: "Precio Venta",
      field: "precioVenta",
      type: "numeric",
    },
    {
      title: "Stock Actual",
      field: "stockActual",
      type: "numeric",
    },
    {
      title: "Stock Minimo",
      field: "stockMinimo",
      type: "numeric",
    },
    {
      title: "Unidad Medida",
      field: "unidadMedida",
      lookup: {
        gr: "Gramos",
        kg: "Kilos",
        unidad: "Unidad",
        ml: "Mililitros",
        pz: "Pieza",
      },
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

  return (
    <>
      <MaterialTable
        columns={cols}
        data={ingredientes}
        title="Stock"
        actions={[
          {
            icon: "delete",
            tooltip: "Eliminar Ingrediente",
            onClick: (e, rowData) => onDeleteIngrediente(rowData._id),
          },
        ]}
        options={{ actionsColumnIndex: -1, exportButton: true }}
        localization={{
          header: { actions: "Acciones" },
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
          body: {
            emptyDataSourceMessage: "No Se Encontraron Ingredientes",
          },
        }}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            const dataUpdate = [...ingredientes];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;

            await axios
              .put(
                `${process.env.REACT_APP_BASE_API_URL}/ingredientes/${oldData._id}`,
                newData,
                {
                  headers: {
                    "x-token": token,
                  },
                }
              )
              .then((response) => {
                // Obtenemos los datos
                swal.fire("OK!", `${response.data.msg}`, "success");
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
        }}
      />
      <AddNewIngrediente />
    </>
  );
};

export default IngredientesList;
