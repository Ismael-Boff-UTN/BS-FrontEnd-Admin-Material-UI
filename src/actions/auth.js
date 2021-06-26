import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/type";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchNoToken(
      "auth/admin-login",
      { email, password },
      "POST"
    );
    const body = await response.json();

    if (body.msg === "Login OK") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre,
          resto: body.usuario,
        })
      );
    } else {
      console.log(body.msg);
      Swal.fire("Error", `${body.msg}`, "warning");
    }
  };
};

export const startLoginGoogle = (id_token) => {
  return async (dispatch) => {
    const response = await fetchNoToken("auth/google", { id_token }, "POST");
    const body = await response.json();
    //console.log(body);

    if (body.msg === "Google OK") {
      localStorage.setItem("tokenGoogle", body.token);
      localStorage.setItem("tokenGoogle-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre,
          resto: body.usuario,
        })
      );
    } else {
      Swal.fire("Error", `${body.msg}`, "warning");
    }
  };
};

export const startRegister = (
  nombre,
  apellido,
  email,
  password,
  telefono,
  rol,
  domicilio
) => {
  return async (dispatch) => {
    const response = await fetchNoToken(
      "usuarios",
      { nombre, apellido, email, password, telefono, rol, domicilio },
      "POST"
    );
    const body = await response.json();

    if (body.msg === "Login OK") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre,
        })
      );
    } else {
      Swal.fire("", `${body.msg}`, "success");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const response = await fetchWithToken("auth/renewtoken");
    const body = await response.json();

    //console.log(body);

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body._id,
          name: body.nombre,
          resto: body.usuario,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
