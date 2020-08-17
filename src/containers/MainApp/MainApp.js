import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { globalState } from "../../App";
import ConsultModal from "../../Components/ConsultModal/ConsultModal";
import PaymentModal from "../../Components/PaymentModal/PaymentModal";
import RechargeModal from "../../Components/RechargeModal/RechargeModal";
import axios from "axios";

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

export default function MainApp() {
  const history = useHistory();

  if (!globalState.userData.email) history.goBack();

  const classes = useStyles();

  const [openConsult, setOpenConsult] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openRecharge, setOpenRecharge] = useState(false);

  const openConsultHandlrer = () => {
    setOpenConsult(true);
  };

  const openRechargeHandler = () => {
    setOpenRecharge(true);
  };

  const openPaymentHandler = async () => {
    alert("SE HA ENVIADO UN TOKEN DE PAGO SU CORREO");
    authPayment().catch((e) => console.log(e));
    setOpenPayment(true);
  };

  const closeConsultHandler = () => {
    setOpenConsult(false);
  };

  const closeRechargeHandler = () => {
    setOpenRecharge(false);
  };

  const closePaymentHandler = () => {
    setOpenPayment(false);
  };

  const authPayment = () => {
    const authUrl = "http://181.238.115.241:3000/api/authpayment";
    const data = {
      documento: globalState.userData.documento,
      email: globalState.userData.email,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(authUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <HomeIcon color="primary" />
        <Typography component="h1" variant="h5">
          Operaciones Disponibles
        </Typography>
        <Button
          style={{
            width: "200px",
            marginTop: "30px",
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={openRechargeHandler}
        >
          Recarga saldo
        </Button>
        <Button
          style={{
            width: "200px",
            marginTop: "30px",
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={openPaymentHandler}
        >
          Realiza pago
        </Button>
        <Button
          style={{
            width: "200px",
            marginTop: "30px",
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={openConsultHandlrer}
        >
          Consulta saldo
        </Button>
        <ConsultModal
          documento={globalState.userData.documento}
          celular={globalState.userData.celular}
          closeConsultHandler={closeConsultHandler}
          openConsult={openConsult}
        />
        <PaymentModal
          email={globalState.userData.email}
          idSession={globalState.userData.idSession}
          closePaymentHandler={closePaymentHandler}
          openPayment={openPayment}
        />
        <RechargeModal
          documento={globalState.userData.documento}
          celular={globalState.userData.celular}
          closeRechargeHandler={closeRechargeHandler}
          openRecharge={openRecharge}
        />
      </div>
    </Container>
  );
}
