import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import HeaderBar from "../Components/HeaderBar";
import AddIcon from "@mui/icons-material/Add";
import { url } from "../App";
function VideoPlayer() {
  let { id } = useParams();
  let [seletetedData, setSeletetData] = useState();
  // seleteted-moviesandtvshow-details
  let getData = async () => {
    let data = await axios.get(
      `${url}/users/seleteted-moviesandtvshow-player/` + id
    );
    setSeletetData(data.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  let addWatchListData = async (e) => {
    await axios.post(`${url}/users/post-add-watch-list`, e);
  };
  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "60px" }}
      >
        {seletetedData?.map((e, i) => {
          return (
            <div key={i}>
              <div className="player-wrapper">
                <ReactPlayer
                  url={e.trailer}
                  controls="true"
                  className="react-player"
                  playingcontainer-fluid
                  text-white
                  p-5
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="container-fluid text-white p-5">
                <div>
                  <h3>{e.name}</h3>
                </div>
                <div>
                  <p>{e.description}</p>
                  <div>
                    <p>
                      {e.duration || e.seasons}&nbsp;&#8226;&nbsp;
                      {e.episodes ? e.episodes : null}&nbsp;&#8226;&nbsp;
                      {e.genre}
                      &nbsp;&#8226;&nbsp;{e.year}&nbsp;&#8226;&nbsp;
                      {e.language}
                    </p>
                    <Button
                      variant="white"
                      onClick={() => {
                        addWatchListData(e);
                      }}
                      className="shadow-none text-white "
                    >
                      <AddIcon style={{ fontSize: "40px" }} />
                      <br />
                      <span className="text-white">Watch List</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default VideoPlayer;
