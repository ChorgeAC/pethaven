import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successMessage = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const erroMessage = (msg) => {
  toast.error(msg);
};

const warningMessage = (msg) => {
  toast.warning(msg);
};

export { successMessage, erroMessage, warningMessage, ToastContainer };
