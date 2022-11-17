import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import axios from "axios";

//const useStyles = makeStyles((theme) => ({
 // seeMore: {
   // marginTop: theme.spacing(3),
 // },
//}));

export default function Orders() {
  //const classes = useStyles();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auditoria/ultimosPedidos")
      .then((response) => {
        // Obtenemos los datos

        setPedidos(response.data.ultimosPedidos);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Pedidos Recientes
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Enviado A</TableCell>
            <TableCell>Metodo De Pago</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((pedido) => (
            <TableRow key={pedido._id}>
              <TableCell>{pedido.fecha}</TableCell>
              <TableCell>{pedido.nombreCliente}</TableCell>
              <TableCell>{pedido.domicilioEnvio.localidad}</TableCell>
              <TableCell>{pedido.tipoEnvio}</TableCell>
              <TableCell align="right">{pedido.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
