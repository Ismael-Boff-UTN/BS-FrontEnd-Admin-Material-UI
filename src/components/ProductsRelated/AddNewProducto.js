import React from "react";
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
  FormHelperText
} from "@material-ui/core";

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
}));

const AddNewProducto = () => {
  const [open, setOpen] = React.useState(false);
  const [producto, setProducto] = React.useState({
    denominacion: Text,
    precioVenta: Number,
    tiempoEstimadoCocina: Number,
    imagen: "",
    //estado: false,
    esManufacturado: Boolean
  });

  const classes = useStyles();
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
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
      .post
      ("https://buen-sabor-api.herokuapp.com/api/articulos",producto,
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        handleClose();
        swal.fire("", `${res.data.msg}`, "success");
      })
      .catch((e)=>{
        console.log(e);
      });
  };

  //Funcion para convertir imagen a Base64
  const img64 = (archivo) =>{
    let reader = new FileReader();
    let file = archivo.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function(){
      setProducto({
        ...producto,
        imagen: reader.result
      });
    }
  }

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
        fullScreen
      >
        <DialogTitle id="form-dialog-title">
          Creacion de nuevo producto
        </DialogTitle>
        <DialogContent className="container">
          <DialogContentText>
            Ingrese los datos del producto a agregar
          </DialogContentText>
          <form className={classes.root}>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              onChange={onChange}
              name="denominacion"
              required="true"
            />
            < TextField
            id = "outlined-basic"
            label = "Precio"
            variant = "outlined"
            onChange = {onChange}
            name = "precioVenta"
            required = "true"
            type="number"
            />
            < TextField
            id = "outlined-basic"
            label = "Tiempo de cocina (minutos)"
            variant = "outlined"
            onChange = {onChange}
            name = "tiempoEstimadoCocina"
            required = "true"
            type = "number" 
            />
            <FormHelperText>¿Es manufacturado?</FormHelperText>
           <Select
              //labelId = "demo-simple-select-outlined-label"
              id = "demo-simple-select-outlined-label"
              name = "esManufacturado" 
              label = "¿Es manufacturado?"
              //value={producto.esManofacturado}
              variant = "outlined"
              onChange={onChange}
              required="true"
            >
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
            <TextField
            id = "outlined-basic"
            label = "Imagen"
            variant = "outlined"
            onChange = {img64}
            name = "imagen"
            required = "true"
            type = "file" 
            />
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