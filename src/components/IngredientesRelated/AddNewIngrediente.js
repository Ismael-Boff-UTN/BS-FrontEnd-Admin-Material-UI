import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import swal from "sweetalert2";

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

const AddNewIngrediente = () => {
  const [open, setOpen] = React.useState(false);
  const [ingrediente, setIngrediente] = React.useState({
    denominacion: "",
    precioVenta: "",
    precioCompra: "",
    stockActual: "",
    stockMinimo: "",
    unidadMedida: "",
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
    setIngrediente({
      ...ingrediente,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      ingrediente.denominacion === "" ||
      ingrediente.precioVenta === "" ||
      ingrediente.precioCompra === "" ||
      ingrediente.stockActual === "" ||
      ingrediente.stockMinimo === "" ||
      ingrediente.unidadMedida === ""
    ) {
      alert("Campos Vacios");
      swal.fire("", "Campos Vacios", "info");
    }

    axios
      .post(
        "https://buen-sabor-api.herokuapp.com/api/ingredientes",
        ingrediente,
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    //console.log(producto);
    //history.push("/");
    //window.location.reload();
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
        Añadir Ingrediente
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        //fullScreen
      >
        <DialogTitle id="form-dialog-title">
          Creacion De Nuevo Ingrediente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
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
            <TextField
              id="outlined-basic2"
              label="Precio Compra"
              variant="outlined"
              onChange={onChange}
              name="precioCompra"
              type="number"
              required="true"
            />
            <TextField
              id="outlined-basic3"
              label="Precio Venta"
              variant="outlined"
              onChange={onChange}
              name="precioVenta"
              type="number"
              required="true"
            />
            <TextField
              id="outlined-basic4"
              label="Stock Actual"
              variant="outlined"
              onChange={onChange}
              name="stockActual"
              type="number"
              required="true"
            />
            <TextField
              id="outlined-basic5"
              label="Stock Minimo"
              variant="outlined"
              onChange={onChange}
              name="stockMinimo"
              type="number"
              required="true"
            />
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={ingrediente.unidadMedida}
              label="Unidad Medida"
              variant="outlined"
              onChange={onChange}
              name="unidadMedida"
              required="true"
            >
              <MenuItem value={"gr"}>Gramos</MenuItem>
              <MenuItem value={"kg"}>Kilos</MenuItem>
              <MenuItem value={"unidad"}>Unidad</MenuItem>
            </Select>
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

export default AddNewIngrediente;
