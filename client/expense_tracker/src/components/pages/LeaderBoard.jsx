import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { leaderboardActions } from "../store/LeaderBoard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const userList = useSelector((state) => state.leaderboard.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllUser() {
      try {
        const data = await axios.get("http://localhost:4000/user/getalluser");

        let newList = [];
        data.data.data.map((item) => {
          newList.push(item);
        });
        console.log(newList);
        dispatch(leaderboardActions.addExpense({ userList: newList }));
      } catch (err) {
        console.log(err);
      }
    }
    getAllUser();
  }, []);

  const Navigate = useNavigate();
  return (
    <>
      <button
        className={classes.backbtn}
        onClick={() => {
          Navigate("/expense");
        }}
      >
        Back
      </button>
      <section className={classes.container}>
        <div className={classes.leaderboard}>
          <h2>Leaderboard</h2>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
