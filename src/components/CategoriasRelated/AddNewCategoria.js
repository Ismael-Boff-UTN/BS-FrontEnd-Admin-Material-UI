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
import axios from "axios";
import swal from "sweetalert2";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
}));

const AddNewCategoria = () => {
  const [open, setOpen] = React.useState(false);
  const [categoria, setCategoria] = React.useState({
    nombre: Text,
    img: "",
    estado: "",
  });

  const img64 = (archivo) => {
    let reader = new FileReader();
    let file = archivo.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      setCategoria({
        ...categoria,
        img: reader.result,
      });
    };
  };

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
    document.getElementById("submitBtn").disabled = true;

    if (categoria.nombre === "" || categoria.img === "") {
      alert("Campos Vacios");
    }

    axios
      .post("https://buen-sabor-api.herokuapp.com/api/categorias", categoria, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        handleClose();
        document.getElementById("submitBtn").disabled = false;
        swal.fire("", `${res.data.msg}`, "success");
      })
      .catch((err) => {
        console.log(`ERROR while posting to categories: ${err}`);
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
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  onChange={onChange}
                  name="nombre"
                  type="text"
                  required={true}
                  fullWidth
                />
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
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            id="submitBtn"
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
