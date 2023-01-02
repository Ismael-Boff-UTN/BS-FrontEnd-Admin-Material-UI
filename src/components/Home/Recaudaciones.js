import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    axios
      .get(
        "http://localhost:4000/api/auditoria/recaudaciones?fechaInicial=2020-06-28&fechaFinal=2025-09-30"
      )
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
        {title === "Recaudaciones De Hoy" ? (
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
              $ {recaudaciones.totalRecaudacion}
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              {recaudaciones.resultados}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        {title === "Ganancias Periodo Tiempo" ||
        title === "Recaudaciones Periodo Tiempo" ? (
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
              $ {recaudaciones.totalRecaudacion}
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              {recaudaciones.resultados}
            </Typography>
            <TextField
              id="datetime-local"
              label="Fecha Inicial"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="datetime-local"
              label="Fecha Final"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.calcularBtn}
            >
              Calcular
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
