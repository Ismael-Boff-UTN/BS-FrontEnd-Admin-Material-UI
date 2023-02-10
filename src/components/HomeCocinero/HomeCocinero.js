import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";
import { Typography } from "@material-ui/core";
import swal from "sweetalert2";

const HomeCocinero = () => {
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/pedidos/cocinero", {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        // Obtenemos los datos
        setPedidos(response.data.pedidosCoci);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [token]);

  const cols = [
    {
      title: "Pedido por",
      field: "nombreCliente",
      editable: "never",

    },
    {
      title: "Detalle/Cantidad",
      field: "detalle",
      editable: "never",
      render: (rowData) =>
      rowData.detallesPedido.map((p) => (
        <>
          <p>{p.articulo.denominacion}//Cantidad: {p.cantidad}</p>
        </>
      ))
    },
    {
      title: "Tipo de envio",
      field: "tipoEnvio",
      editable: "never",
    },
    {
      title: "Domicilio",
      field: "domicilio",
      editable: "never",
      render: (rowData) =>
      <p>{rowData.domicilioEnvio.localidad}, {rowData.domicilioEnvio.calle}, {rowData.domicilioEnvio.numero}</p>
    },
    {
      title: "Estado",
      field: "estado",
      lookup: { "En preparacion": "En preparacion", "Preparado": "Preparado" },
      render: (rowData) =>
        rowData.estado === "En preparacion" ? (
          <Chip
            label="En preparacion"
            style={{ backgroundColor: "green", color: "white" }}
          />
        ) : (
          <Chip
            label="Preparado"
            style={{ backgroundColor: "red", color: "white" }}
          />
        ),
    },
  ];

  return (
    <div>
         <>
          <MaterialTable
            columns={cols}
            data={pedidos}
            title="Listado De Pedidos"
            editable={{
              onRowUpdate: async (newData, oldData) => {
                const dataUpdate = [...pedidos];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;

                await axios
                  .put(
                    `http://localhost:4000/api/pedidos/${oldData._id}`,
                    newData,
                    {
                      headers: {
                        "x-token": token,
                      },
                    }
                  )
                  .then((response) => {
                    swal.fire("OK!", `${response.data.msg}`, "success");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              },
            }}
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
                      {rowData.detallesPedido.map((p) => (
                        <>
                          <p>{p.denominacion}</p>
                          <p>{p.cantidad}</p>
                          <p>-------------------</p>
                        </>
                      ))}
                    </div>
                  );
                },
              },
            ]}
          />
        </>
       
    </div>
  );
};

export default HomeCocinero;
