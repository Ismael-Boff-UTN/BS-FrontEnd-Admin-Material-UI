import React from "react";
import { Switch, Route } from "react-router-dom";
//Material UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
//Componentes Del Dashboard
import ProductsList from "../components/ProductsRelated/ProductsList";
import IngredientesList from "../components/IngredientesRelated/IngredientesList";
import RolesList from "../components/RolesRelated/RolesList";
import UsuariosList from "../components/UsuariosRelated/UsuariosList";
import NavBar from "../components/NavBar/NavBar";
import CategoriasList from "../components/CategoriasRelated/CategoriasList";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "170px",
  },
}));

export const DashboardRoutes = () => {
  const classes = useStyles();
  return (
    <>
      <NavBar />

      <Container fixed className={classes.root}>
        <Switch>
          <Route exact path="/products-list" component={ProductsList} />
          <Route exact path="/ingredientes-list" component={IngredientesList} />
          <Route exact path="/usuarios-list" component={UsuariosList} />
          <Route exact path="/roles-list" component={RolesList} />
          <Route exact path="/categorias-list" component={CategoriasList} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
};
