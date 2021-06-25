import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
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
        .delete(`https://buen-sabor-api.herokuapp.com/api/ingredientes/${id}`, {
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
      .get("https://buen-sabor-api.herokuapp.com/api/ingredientes")
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
    <div>
      {ingredientes.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <div className="mt-3">
            <MaterialTable
              columns={cols}
              data={ingredientes}
              title="Listado Ingredientes"
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
                      `https://buen-sabor-api.herokuapp.com/api/ingredientes/${oldData._id}`,
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
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientesList;
