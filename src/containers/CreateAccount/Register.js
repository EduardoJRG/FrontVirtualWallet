import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [Nombres, setNombres] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Celular, setCelular] = useState("");

  const classes = useStyles();
  const history = useHistory();

  const submitValue = async (e) => {
    e.preventDefault();
    const email = Email;
    const documento = Documento;
    const celular = Celular;
    const nombres = Nombres;

    if (email === "" || documento === "" || celular === "" || nombres === "") {
      alert("LLENE TODOS LOS CAMPOS");
      return;
    }

    if (!validateEmail(email)) {
      alert("COLOCO EMAIL INVALIDO");
      return;
    }

    const newUser = {
      email: Email,
      documento: Documento,
      celular: Documento,
      nombres: Documento,
    };

    const userData = await register(newUser).catch((e) => {
      console.log(e);
      alert(e.message);
    });

    if (userData.message) {
      alert(userData.message);
      return;
    }

    alert("REGISTRO REALIZADO CON EXITO");
    history.push("/login");
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const register = (data) => {
    const registerUrl = "http://181.238.115.241:3000/api/registerclient";
    return new Promise((resolve, reject) => {
      axios
        .post(registerUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const navigateLogin = () => {
    history.push("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nombres"
                variant="outlined"
                required
                fullWidth
                id="nombres"
                label="Nombres"
                autoFocus
                onChange={(e) => setNombres(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="documento"
                label="Documento"
                name="documento"
                autoComplete="documento"
                onChange={(e) => setDocumento(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="celular"
                label="Celular"
                type="celular"
                id="celular"
                onChange={(e) => setCelular(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            style={{
              marginTop: "10px",
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitValue}
          >
            Registro
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={navigateLogin}>
                Ya tienes una cuenta? Logueate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
