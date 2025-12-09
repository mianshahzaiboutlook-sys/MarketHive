import { toast, Flip, Bounce } from "react-toastify";

const errorToast = (err) => {
  toast.error(err, {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });
};

const successToast = (err) => {
  toast.success(err, {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Flip,
  });
};


export { errorToast, successToast };
