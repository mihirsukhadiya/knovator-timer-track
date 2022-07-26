import React, { useState, useEffect } from "react";
import SaveDialog from "./SaveDialog";
import "./index.css";
import { Button } from "@mui/material";
import TaskDetails from "./TaskDetails";

const Dashboard = () => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [actionState, setActionState] = useState("");
  const [mainDataTask, setMainDataTask] = useState([]);

  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  const startTimer = () => {
    setIsPaused(false);
    setActionState("startTimer");
  };

  const pauseTimer = () => {
    setIsPaused(true);
    setActionState("pauseTimer");
  };
  const saveTimer = () => {
    if (time === 0) {
      alert("It's On Zero");
    } else {
      setIsPaused(true);
      setOpenSaveDialog(true);
      setActionState('');
    }
  };  

  const handleCloseBox = () => {
    setOpenSaveDialog(false);
  };
  const resetTimer = () => {
    setTime(0);
    setIsPaused(true);
    setActionState('');
  };

  return (
    <>
      {openSaveDialog && (
        <SaveDialog
          onClose={handleCloseBox}
          open={openSaveDialog}
          totalTiming={time}
          mainDataTask={mainDataTask}
          setMainDataTask={setMainDataTask}
        />
      )}
      <div className="mainContainer">
        <div className="contentDiv">
          <div className="title">
            <div>
              <h1> The Digital Timer</h1>
            </div>
          </div>
          <div>
            <div className="CardBox">
              <h1>
                {`${Math.floor(time / 3600)
                  .toString()
                  .padStart(2, "0")} : ${Math.floor((time % 3600) / 60)
                  .toString()
                  .padStart(2, "0")} : ${Math.floor(time % 60)
                  .toString()
                  .padStart(2, "0")}`}
              </h1>
            </div>
          </div>
          <div className="buttonClass">
            <Button
              style={{ marginBottom: "10px", marginTop: "20px" }}
              variant="contained"
              onClick={startTimer}
              disabled={actionState === "startTimer" ? true : false}
            >
              Start
            </Button>
            <Button
              style={{ marginBottom: "10px", marginTop: "20px" }}
              variant="outlined"
              color="secondary"
              onClick={pauseTimer}
              disabled={actionState === "pauseTimer" ? true : false}
            >
              Pause
            </Button>
            <Button
              style={{ marginBottom: "30px", marginTop: "20px" }}
              variant="contained"
              color="success"
              onClick={saveTimer}
            >
              Save
            </Button>

            <Button
              style={{ marginBottom: "30px" }}
              size="small"
              color="success"
              onClick={resetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <TaskDetails
        mainDataTask={mainDataTask}
        setMainDataTask={setMainDataTask}
      />
    </>
  );
};

export default Dashboard;
