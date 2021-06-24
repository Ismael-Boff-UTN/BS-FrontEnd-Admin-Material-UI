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

const AddNewCategoria = () => {
  const [open, setOpen] = React.useState(false);
  const [categoria, setCategoria] = React.useState({
    nombre: "",
    img: "",
    estado: "",
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
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      categoria.nombre === "" ||
      categoria.img === "" ||
      categoria.estado === "" 
    ) {
      alert("Campos Vacios");
    }

    axios
      .post(
        "https://buen-sabor-api.herokuapp.com/api/categorias",
        categoria,
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(`ERROR while posting to categories: ${err}`);
      })

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
        Añadir categoria
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        //fullScreen
      >
        <DialogTitle id="form-dialog-title">
          Creacion De Nueva Categoria
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor llene todos los campos requeridos.
          </DialogContentText>
          <form className={classes.root}>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              onChange={onChange}
              name="nombre"
              type="text"
              required="true"
            />
            <TextField
              id="outlined-basic2"
              label="Imagen"
              variant="outlined"
              onChange={onChange}
              name="img"
              type="text"
              required="true"
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

export default AddNewCategoria;
