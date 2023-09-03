/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import classes from "./Header.module.css";
import { authActions } from "../store/AuthSlice";
import useRazorpay from "react-razorpay";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  useEffect(() => {
    async function getUsers() {
      const data = await axios.get("http://localhost:4000/user/getUser", {
        headers: { Authorization: token },
      });
      if (data.data.data.isPremiumUser) {
        setPremium(true);
      }
    }
    getUsers();
  }, []);

  const token = localStorage.getItem("token");
  const [ispremium, setPremium] = useState(false);
  const [Razorpay] = useRazorpay();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handlePayment = async (e) => {
    const response = await axios.get(
      "http://localhost:4000/purchase/membership",
      { headers: { Authorization: token } }
    );
    console.log(response);

    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (res) {
        const data = await axios.post(
          "http://localhost:4000/purchase/updateStatus",
          {
            order_id: options.order_id,
            payment_id: res.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );

        alert("you are a Premium User Now");
        console.log(data);
        setPremium(true);
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    Navigate("/");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.title}>
        <h2>Expense Tracker</h2>
      </div>

      <div className={classes.feature}>
        {!ispremium && (
          <button className={classes.premium} onClick={handlePayment}>
            Buy Premium
          </button>
        )}
        {ispremium && <h5>You are a Premium User</h5>}
        <button className={classes.logout} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
