import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

//const useStyles = makeStyles((theme) => ({
// seeMore: {
// marginTop: theme.spacing(3),
// },
//}));

export default function Orders() {

  const [arti, setArti] = useState([]);
  


  const [fechaInicial, setFechaInicial] = useState({ varOne: new Date(2020, 6, 28) });
  const [fechaFinal, setFechaFinal] = useState({ varOne: new Date(2025, 9, 30) });

  const onChange1 = (e) => {
    setFechaInicial({ varOne: e.target.value })
  }
  const onChange2 = (e) => {
    setFechaFinal({ varOne: e.target.value })
  }
  const [arti2, setArti2] = useState([]);
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


  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/auditoria/artiuclosMasVendidosByDate?fechaInicial=" + fechaInicial.varOne + "&fechaFinal=" + fechaFinal.varOne
      )
      .then((response) => {
        // Obtenemos los datos

        setArti2(response.data.articulos);
        
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [fechaInicial, fechaFinal]);


  console.log(arti2)
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Raking De Articulos Vendidos Todos Los Tiempos (TOP 10)
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
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Raking De Productos Pedidos Por fecha
      </Typography>
      <TextField
        id="datetime-local"
        label="Fecha Inicial"
        type="datetime-local"
        defaultValue="2023-01-24T10:30"
        onChange={onChange1}
        //  className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local"
        label="Fecha Final"
        type="datetime-local"
        defaultValue="2024-05-24T10:30"
        // className={classes.textField}
        onChange={onChange2}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad de veces vendido</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {arti2.map((articu) => (
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