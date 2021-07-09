import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import swal from "sweetalert2";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

import List from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  input: {
    display: "none",
  },
  btnImg: {
    borderRadius: 20,
  },
  dialogBar: {
    background: "#f52f41",
  },
}));

const AddNewProducto = () => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const [producto, setProducto] = React.useState({
    denominacion: Text,
    tiempoEstimadoCocina: Number,
    imagen: "",
    esManufacturado: Boolean,
    categoria: Text,
  });
  const [ingredientes, setIngredientes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const classes = useStyles();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/ingredientes`)
      .then((response) => {
        // Obtenemos los datos

        setIngredientes(response.data.ingredientes);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/categorias`)
      .then((response) => {
        // Obtenemos los datos

        setCategorias(response.data.categorias);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
    setProducto({
      ...producto,
      [e.target.name]: e.target.checked,
    });
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      producto.denominacion === "" ||
      producto.precioVenta === "" ||
      producto.tiempoEstimadoCocina === "" ||
      producto.imagen === "" ||
      producto.esManufacturado === ""
    ) {
      alert("Campos Vacios");
    }

    axios
      .post("https://buen-sabor-api.herokuapp.com/api/articulos", producto, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        handleClose();
        swal.fire("", `${res.data.msg}`, "success");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Funcion para convertir imagen a Base64
  const img64 = (archivo) => {
    let reader = new FileReader();
    let file = archivo.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      setProducto({
        ...producto,
        imagen: reader.result,
      });
    };
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={handleClickOpen}
        className={classes.fab}
      >
        <AddIcon />
        Añadir Producto
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        //fullScreen
      >
        <DialogTitle id="form-dialog-title">
          <AppBar position="absolute" className={classes.dialogBar}>
            <Toolbar>Creacion De Nuevo Producto</Toolbar>
          </AppBar>
        </DialogTitle>
        <DialogContent className="container">
          <DialogContentText>
            Ingrese los datos del producto a agregar
          </DialogContentText>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="denominacion"
                  variant="outlined"
                  required
                  fullWidth
                  id="denominacion"
                  label="Denominacion Articulo"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="tiempoEstimadoCocina"
                  label="Tiempo Preparación (min)"
                  name="tiempoEstimadoCocina"
                  autoComplete="lname"
                  type="number"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={producto.categoria}
                  label="Categoria"
                  variant="outlined"
                  onChange={onChange}
                  name="categoria"
                  required="true"
                  fullWidth
                >
                  <MenuItem value={producto.categoria} disabled>
                    Categoria
                  </MenuItem>
                  {categorias?.map((cat) => (
                    <MenuItem value={cat.nombre}>{cat.nombre}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={img64}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    size="large"
                    fullWidth
                    className={classes.btnImagen}
                  >
                    Subir Imagen
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked.esManufacturado}
                      onChange={handleChange}
                      name="esManufacturado"
                    />
                  }
                  label="Es Manufacturado"
                />
                <List
                  ingredientes={ingredientes}
                  stateProductos={setProducto}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={checked}
                  variant="outlined"
                  required
                  fullWidth
                  id="precioVenta"
                  label="Precio Venta"
                  name="precioVenta"
                  autoComplete="lname"
                  type="number"
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={onSubmit}
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewProducto;
