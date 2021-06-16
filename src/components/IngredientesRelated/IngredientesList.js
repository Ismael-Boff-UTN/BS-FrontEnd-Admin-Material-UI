import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import swal from "sweetalert2";
import Chip from "@material-ui/core/Chip";

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);
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
  }, []);

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
              title="Ingredientes"
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
                  onClick: (e, rowData) =>
                    alert("presionaste " + rowData.denominacion),
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
