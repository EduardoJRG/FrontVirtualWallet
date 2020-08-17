import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [result, setResult] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [token, setToken] = React.useState("");

  const makePayment = () => {
    if (monto === "" || token === "") {
      alert("COMPLETE TODOS LOS CAMPOS");
      return;
    }
    const paymentUrl = "http://181.238.115.241:3000/api/pagos";
    const data = {
      token: token,
      email: props.email,
      monto: monto,
      idSession: props.idSession,
    };
    return new Promise((resolve, reject) => {
      axios
        .put(paymentUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          setMonto("");
          setToken("");
          setResult(response.data.message);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="monto"
        label="Monto a pagar"
        type="number"
        id="monto"
        onChange={(e) => setMonto(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="token"
        label="Escriba token"
        type="number"
        id="token"
        onChange={(e) => setToken(e.target.value)}
      />
      <Button
        style={{
          width: "200px",
          marginTop: "30px",
        }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={makePayment}
      >
        Pagar
      </Button>
      <p
        style={{
          marginTop: "10px",
        }}
        id="simple-modal-description"
      >
        {result}
      </p>
      <SimpleModal />
    </div>
  );

  const handleClose = () => {
    setResult("");
    props.closePaymentHandler();
  };

  return props.openPayment ? (
    <div>
      <Modal
        open={props.openPayment}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  ) : (
    ""
  );
}
