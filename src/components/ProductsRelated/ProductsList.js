import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";

const ProductsList = () => {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
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
  }, [token]);

  const cols = [
    {
      title: "Denominacion",
      field: "denominacion",
    },
    {
      title: "¿Es Manufacturado?",
      field: "esManufacturado",
      render: (rowData) =>
        rowData.estado === true ? (
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
                icon: "edit",
                tooltip: "Editar Producto",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
              {
                icon: "delete",
                tooltip: "Eliminar Producto",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
            ]}
            options={{ actionsColumnIndex: -1, exportButton: true }}
            localization={{ header: { actions: "Acciones" } }}
          />
        </>
      )}
    </div>
  );
};

export default ProductsList;
