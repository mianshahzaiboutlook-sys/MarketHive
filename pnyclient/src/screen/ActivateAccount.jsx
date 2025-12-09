import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function VerifyAccount() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/users/signup",
          {
            token,
          }
        );

        alert(res.data.message);
        navigate("/login");
      } catch (err) {
        alert("Verification Failed");
      }
    };

    activateAccount();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-xl font-semibold">Verifying your account...</h1>
    </div>
  );
}
