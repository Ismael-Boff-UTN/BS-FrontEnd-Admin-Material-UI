import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
//import Chip from "@material-ui/core/Chip/Chip";
const RolesList = () => {
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/roles", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setRoles(response.data.roles);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [token]);

  const cols = [
    {
      title: "Nombre",
      field: "rol",
    },
  ];
  return (
    <div>
      {roles.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <MaterialTable
            columns={cols}
            data={roles}
            title="Listado De Roles"
            options={{ actionsColumnIndex: -1, exportButton: true }}
            localization={{ header: { actions: "Acciones" } }}
          />
        </>
      )}
    </div>
  );
};

export default RolesList;
