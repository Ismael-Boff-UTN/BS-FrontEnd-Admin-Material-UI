import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  calcularBtn: {
    marginTop: "10px",
  },
}));

export default function Deposits({ title }) {
  const classes = useStyles();
  const [recaudaciones, setRecaudaciones] = useState([]);

  useEffect(() => {
    let fechaActual = new Date();
    var diaInicial = fechaActual.getDate();
    var mesInicial = fechaActual.getMonth() + 1;
    var anioInicial = fechaActual.getFullYear();

    var diaFinal = fechaActual.getDate() + 1;
    var mesFinal = fechaActual.getMonth() + 1;
    var anioFinal = fechaActual.getFullYear();
    const fechaFinal = String(fechaActual);
    axios
      .get("http://localhost:4000/api/auditoria/recaudaciones?fechaInicial=" + anioInicial + "-" + mesInicial + "-" + diaInicial + "&fechaFinal=" + anioFinal + "-" + mesFinal + "-" + diaFinal)
      .then((response) => {
        // Obtenemos los datos

        setRecaudaciones(response.data);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);
  return (
    <>
      <div>
        <>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography component="p" variant="h4">
            $ {recaudaciones.totalGanancias}
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.depositContext}
          >
            {recaudaciones.resultados}
          </Typography>
        </>
      </div>
    </>
  );
}
