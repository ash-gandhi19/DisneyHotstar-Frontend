import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../Components/HeaderBar";
import { url } from "../App";
import { useNavigate } from "react-router-dom";

function WatchList() {
  let navigate = useNavigate();
  let chackAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };
      // auth post method
      let res = await axios.post(
        `${url}/users/auth`,
        { purpose: "validate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  let [watchList, setWatchList] = useState();
  let getData = async () => {
    let data = await axios.get(`${url}/users/get-add-watch-list`);
    setWatchList(data.data.result);
  };
  useEffect(() => {
    chackAuth();
    getData();
  }, []);

  let removingWatchListData = async (index) => {
    let data = await axios.delete(
      `${url}/users/delete-add-watch-list/` + index
    );
    if (data.data.statusCode === 200) {
      getData();
    }
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "50px" }}
      >
        <div>
          <h2>Watch List</h2>
        </div>
        <hr />
        <div className="findTheCategory">
          {watchList?.map((e, i) => {
            return (
              <div className="mt-4 hover-effect" key={i}>
                <Link to={`/video-details/` + e.keyName}>
                  <img
                    style={{ borderRadius: "10px" }}
                    className="carousels-items image"
                    src={e.img}
                    width="100%"
                    height="100%"
                    alt={e.name}
                  />
                </Link>
                <div className="middle">
                  <span>{e.name}</span>
                  <Button
                    variant="white"
                    onClick={() => removingWatchListData(e._id)}
                    className="shadow-none text-white"
                  >
                    <RemoveIcon style={{ fontSize: "15px" }} back />
                    &nbsp;Remove WatchList
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WatchList;
