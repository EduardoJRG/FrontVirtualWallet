import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
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
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [mSaldo, setMsaldo] = React.useState("");

  // if (props.open !== undefined) open = props.open;
  // console.log("SimpleModal", open);

  const getSaldo = () => {
    const saldoUrl = "http://181.238.115.241:3000/api/getsaldo";
    const data = { documento: props.documento, celular: props.celular };
    return new Promise((resolve, reject) => {
      axios
        .post(saldoUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          setMsaldo(`Tu saldo disponible es: ${response.data.saldo}`);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Button
        style={{
          width: "200px",
          marginTop: "30px",
        }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={getSaldo}
      >
        Consultar
      </Button>
      <p id="simple-modal-description">{mSaldo}</p>
      <SimpleModal />
    </div>
  );

  const handleClose = () => {
    setMsaldo("");
    props.closeConsultHandler();
  };

  return props.openConsult ? (
    <div>
      <Modal
        open={props.openConsult}
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
