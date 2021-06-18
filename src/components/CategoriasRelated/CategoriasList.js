import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";

const CategoriasList = () => {
  const token = localStorage.getItem("token");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("https://buen-sabor-api.herokuapp.com/api/categorias/admin", {
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
  }, [token]);

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
          alt="cat"
        />
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
                icon: "edit",
                tooltip: "Editar Categoria",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
              {
                icon: "delete",
                tooltip: "Eliminar Categoria",
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

export default CategoriasList;
