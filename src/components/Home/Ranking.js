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
  const [arti, setArti] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auditoria/artiuclosMasVendidos")
      .then((response) => {
        // Obtenemos los datos

        setArti(response.data.articulos);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Raking De Productos Pedidos (TOP 10)
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad de veces vendido</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arti.map((articu) => (
            <TableRow key={articu._id}>
              <TableCell>{articu.denominacion}</TableCell>
              <TableCell>{articu.cantidadVendido}</TableCell>
              <TableCell align="right">{articu.precioVenta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}