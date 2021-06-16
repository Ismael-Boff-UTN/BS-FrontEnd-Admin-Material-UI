import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("https://buen-sabor-api.herokuapp.com/api/categorias")
      .then((response) => {
        // Obtenemos los datos

        setCategorias(response.data.categorias);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);

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
      type: "boolean",
    },
  ];

  return (
    <div>
      {categorias.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <h1>Lista Categorias</h1>
          <div className="mt-3">
            <MaterialTable
              columns={cols}
              data={categorias}
              title="Categorias"
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
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriasList;
