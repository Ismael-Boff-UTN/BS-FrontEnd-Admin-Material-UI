import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import swal from "sweetalert2";
import Chip from "@material-ui/core/Chip";

const IngredientesList = () => {
  const token = localStorage.getItem("token");
  const [ingredientes, setIngredientes] = useState([]);

  const onDeleteIngrediente = useCallback ((id) => {
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
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  },[token]);

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
  }, [onDeleteIngrediente]);

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
                  icon: "edit",
                  tooltip: "Editar Ingrediente",
                  onClick: (e, rowData) =>
                    swal.fire("", `${rowData.denominacion}`, "success"),
                },
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
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientesList;
