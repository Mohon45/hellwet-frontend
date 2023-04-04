import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const DeleteAlert = (submitHandler) => {
  confirmAlert({
    title: "Confirm to Delete",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => submitHandler(),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
};

export default DeleteAlert;
