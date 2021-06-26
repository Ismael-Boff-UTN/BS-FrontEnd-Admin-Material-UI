const baseURL = process.env.REACT_APP_BASE_API_URL;

//Peticiones Base, Sin Token (Inciar Sesión O Registrarse)
export const fetchNoToken = (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
 
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

//Peticiones Cuando El Usuario Ya Esta Logeado Con Su Token
export const fetchWithToken = (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
