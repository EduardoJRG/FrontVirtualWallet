import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import { setGlobalState } from "../../App";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [Email, setEmail] = useState("");
  const [Documento, setDocumento] = useState("");
  const history = useHistory();

  const classes = useStyles();

  const login = (email, documento) => {
    const loginUrl = "http://181.238.115.241:3000/api/loginclient";
    const data = { documento: documento, email: email };
    return new Promise((resolve, reject) => {
      axios
        .post(loginUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((user) => {
          resolve(user.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const submitValue = async (e) => {
    e.preventDefault();
    const email = Email;
    const documento = Documento;

    if (email === "" || documento === "") {
      alert("LLENE TODOS LOS CAMPOS");
      return;
    }

    const userData = await login(email, documento).catch((e) => {
      console.log(e);
      alert(e.message);
    });

    if (userData.message) {
      alert(userData.message);
      return;
    }

    setGlobalState({ userData: userData });
    history.push("/home");
  };

  const navigateRegister = () => {
    history.push("/register");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logueate
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="document"
            label="Documento"
            type="document"
            id="document"
            onChange={(e) => setDocumento(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitValue}
          >
            Logueate
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={navigateRegister}>
                {"No tienes una cuenta? Creala"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
