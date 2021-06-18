import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";

const UsuariosList = () => {
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("https://buen-sabor-api.herokuapp.com/api/usuarios", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setUsuarios(response.data.usuarios);
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
      title: "Apellido",
      field: "apellido",
    },
    {
      title: "Foto",
      field: "img",
      render: (rowData) => (
        <img
          src={rowData.img}
          style={{ width: 50, borderRadius: "20%" }}
          alt="user"
        />
      ),
    },
    {
      title: "E-Mail",
      field: "email",
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
      {usuarios.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <MaterialTable
            columns={cols}
            data={usuarios}
            title="Listado De Usuarios"
            actions={[
              {
                icon: "edit",
                tooltip: "Editar Usuario",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
              {
                icon: "delete",
                tooltip: "Eliminar Usuario",
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

export default UsuariosList;
