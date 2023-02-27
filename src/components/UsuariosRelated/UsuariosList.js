import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlockLoading } from "react-loadingg";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip/Chip";
import swal from "sweetalert2";


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UsuariosList = () => {
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/usuarios", {
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
      title: "Rol",
      field: "rol",
      lookup: { "ADMIN_ROLE": "ADMIN", "COCINERO_ROLE": "COCINERO", "DELIVERY_ROLE": "DELIVERY", "CAJA_ROLE": "CAJERO", "USER_ROLE": "USUARIO" },
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



  const [open, setOpen] = React.useState(false);

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
                icon: "delete",
                tooltip: "Eliminar Usuario",
                onClick: (e, rowData) =>
                  alert("presionaste " + rowData.denominacion),
              },
            ]}
            editable={{
              onRowUpdate: async (newData, oldData) => {
                const dataUpdate = [...usuarios];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                console.log(oldData)
                await axios
                  .put(
                    `http://localhost:4000/api/usuarios/${oldData.uid}`,
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
                tooltip: `Ver Pedidos`,
                render: (rowData) => {
                  return (
                    <>

                      {rowData.pedidos.map((p) => (

                        <>

                          <TableRow>
                            <TableCell component="th" scope="row">
                              Fecha
                            </TableCell>
                            <TableCell >Estado</TableCell>
                            <TableCell >Tipo Envio</TableCell>
                            <TableCell >Total Compra</TableCell>
                          </TableRow>
                          <TableCell component="th" scope="row">
                            {p.fecha}
                          </TableCell>
                          <TableCell >{p.estado}</TableCell>
                          <TableCell >{p.tipoEnvio}</TableCell>
                          <TableCell >$ {p.total}</TableCell>
                          <TableCell >{p.domicilioEnvio.calle}</TableCell>
                          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                              >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>






                          </TableRow>
                          <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                  <Typography variant="h6" gutterBottom component="div">
                                    Articulos Comprados
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Denoninacion</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell align="right">Precio Unitario</TableCell>

                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {p.detallesPedido.map((det) => (<>

                                        <TableRow key={1}>
                                          <TableCell component="th" scope="row">
                                            {det.articulo.denominacion}
                                          </TableCell>
                                          <TableCell>{det.cantidad}</TableCell>
                                          <TableCell align="right">{det.precioUnitario}</TableCell>

                                        </TableRow>
                                      </>))}


                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </>
                  );
                },
              },
              {
                icon: "account_circle",
                tooltip: "Show Surname",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        fontSize: 100,
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#E53935",
                      }}
                    >
                      {rowData.apellido}
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

export default UsuariosList;
