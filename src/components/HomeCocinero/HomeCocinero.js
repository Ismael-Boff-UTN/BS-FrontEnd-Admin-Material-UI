import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";

const HomeCocinero = () => {
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/pedidos", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos

        setPedidos(response.data.pedidos);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [token]);

  const cols = [
    {
      title: "Id",
      field: "id",
    },
    {
      title: "Pedido por",
      field: "Pedido por",
    },
    {
      title: "Detalle",
      field: "Detalle",
    },
    {
      title: "Domicilio",
      field: "domicilio",
    },
    {
      title: "Estado",
      field: "estado",
    },
  ];

  return (
    <div>
      {pedidos.length === 0 || null ? (
        <BlockLoading size="large" />
      ) : (
        <>
          <MaterialTable
            columns={cols}
            data={pedidos}
            title="Listado De Pedidos"
            actions={[
              {
                //controlar el alert
                icon: "edit",
                tooltip: "Editar Pedidos",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
              {
                icon: "delete",
                tooltip: "Eliminar Pedidos",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              headerStyle: {
                backgroundColor: "#FF616D",
                color: "#FFF",
              },
            }}
            localization={{ header: { actions: "Acciones" } }}
            detailPanel={[
              {
                tooltip: `Ver Detalle`,
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#43A047",
                      }}
                    >
                      {rowData.detalle.map((p) => (
                        <>
                          <p>{p.idProducto}</p>
                          <p>{p.denominacion}</p>
                          <p>{p.cantidad}</p>
                        </>
                      ))}
                    </div>
                  );
                },
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default HomeCocinero;
