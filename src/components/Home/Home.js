import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Ganancias from "./Ganancias";
import Recaudaciones from "./Recaudaciones";
import PedidosRecientes from "./PedidosRecientes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  title: {
    flexGrow: 1,
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Home = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid container spacing={3}>
        {/* Ganancias */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Ganancias />
          </Paper>
        </Grid>
        {/* Recaudaciones */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Recaudaciones title={"Recaudaciones De Hoy"}/>
          </Paper>
        </Grid>
        {/* Recaudaciones */}
        <Grid item xs={6} md={6} sm={12}>
          <Paper className={fixedHeightPaper}>
            <Recaudaciones title={"Ganancias Periodo Tiempo"}/>
          </Paper>
        </Grid>
        {/* Recaudaciones */}
        <Grid item xs={6} md={6} sm={12}>
          <Paper className={fixedHeightPaper}>
            <Recaudaciones title={"Recaudaciones Periodo Tiempo"}/>
          </Paper>
        </Grid>
        
        {/* Pedidos Recientes */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PedidosRecientes />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
