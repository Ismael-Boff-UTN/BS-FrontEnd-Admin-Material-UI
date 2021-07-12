import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import swal from "sweetalert2";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Alert from "../Alert/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "30ch",
    },
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
  buttonSave: {
    borderRadius: "20px",
    background: "#388e3c",
    "&:hover": {
      backgroundColor: "#1b5e20",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  buttonCancel: {
    borderRadius: "20px",
    background: "#b71c1c",
    "&:hover": {
      backgroundColor: "#e53935",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  dialogTitle: {
    marginBottom: "60px",
  },
  dialogBar: {
    background: "#f52f41",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewIngrediente = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [ingrediente, setIngrediente] = React.useState({
    denominacion: "",
    precioVenta: "",
    precioCompra: "",
    stockActual: "",
    stockMinimo: "",
    unidadMedida: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
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
      setError(true);

      return;
    } else {
      setLoading(true);
      setError(false);
      axios
        .post(
          `${process.env.REACT_APP_BASE_API_URL}/ingredientes`,
          ingrediente,
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          handleClose();

          swal.fire("", `${res.data.msg}`, "success");
        });
    }
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
        TransitionComponent={Transition}
        maxWidth={"md"}
        //fullScreen
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          <AppBar position="absolute" className={classes.dialogBar}>
            <Toolbar>Creacion De Nuevo Ingrediente</Toolbar>
          </AppBar>
        </DialogTitle>
        {error ? (
          <Alert msg={"Campos Vacios"} tipo={"warning"}/>
        ) : (
          <></>
        )}
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  onChange={onChange}
                  name="denominacion"
                  required="true"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic2"
                  label="Precio Compra"
                  variant="outlined"
                  onChange={onChange}
                  name="precioCompra"
                  type="number"
                  required="true"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic3"
                  label="Precio Venta"
                  variant="outlined"
                  onChange={onChange}
                  name="precioVenta"
                  type="number"
                  required="true"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic4"
                  label="Stock Actual"
                  variant="outlined"
                  onChange={onChange}
                  name="stockActual"
                  type="number"
                  required="true"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic5"
                  label="Stock Minimo"
                  variant="outlined"
                  onChange={onChange}
                  name="stockMinimo"
                  type="number"
                  required="true"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={ingrediente.unidadMedida}
                  label="Unidad Medida"
                  variant="outlined"
                  onChange={onChange}
                  name="unidadMedida"
                  required="true"
                  fullWidth
                >
                  <MenuItem value={ingrediente.unidadMedida} disabled>
                    Unidad Medida
                  </MenuItem>
                  <MenuItem value={"gr"}>Gramos</MenuItem>
                  <MenuItem value={"kg"}>Kilos</MenuItem>
                  <MenuItem value={"unidad"}>Unidad</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonSave}
            type="submit"
            onClick={onSubmit}
            color="primary"
            variant="contained"
            disabled={loading}
            size="large"
            startIcon={<SaveIcon />}
          >
            {loading === true ? "Cargando..." : "Guardar"}
          </Button>
          <Button
            className={classes.buttonCancel}
            onClick={handleClose}
            color="primary"
            size="large"
            variant="contained"
            startIcon={<CloseIcon />}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewIngrediente;
