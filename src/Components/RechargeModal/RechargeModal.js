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

  const rechargeSaldo = () => {
    if (monto === "") {
      alert("ESCRIBA UN MONTO");
      return;
    }
    const saldoUrl = "http://181.238.115.241:3000/api/recargaclientes";
    const data = {
      documento: props.documento,
      celular: props.celular,
      monto: monto,
    };
    return new Promise((resolve, reject) => {
      axios
        .put(saldoUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          setMonto("");
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
        label="Monto a recargar"
        type="number"
        id="monto"
        onChange={(e) => setMonto(e.target.value)}
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
        onClick={rechargeSaldo}
      >
        Recargar
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
    setMonto("");
    props.closeRechargeHandler();
  };

  return props.openRecharge ? (
    <div>
      <Modal
        open={props.openRecharge}
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
