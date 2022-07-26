import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";

const SaveDialog = ({
  onClose,
  open,
  totalTiming,
  mainDataTask,
  setMainDataTask,
  isEdit,
  editTaskData,
}) => {
  const [titleName, setTitleName] = useState(isEdit ? editTaskData.title : "");
  const [descriptionName, setDescriptionName] = useState(
    isEdit ? editTaskData.description : ""
  );

  const saveTask = () => {
    let mainData = {
      totalTime: totalTiming,
      title: titleName,
      description: descriptionName,
    };
    setMainDataTask([...mainDataTask, mainData]);
    onClose();
  };

  const editTask = () => {
    let dataBaseData = mainDataTask;
    dataBaseData.map((database) => {
      if (
        database.title === editTaskData.title &&
        database.totalTime === editTaskData.totalTime &&
        database.description === editTaskData.description
      ) {
        database.title = titleName;
        database.description = descriptionName;
      }
    });
    setMainDataTask(dataBaseData);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="project-dialog-title"
      >
        <DialogTitle id="project-dialog-title">Save The Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth={true}
            id="title"
            label="Title"
            name="title"
            autoComplete="given-name"
            value={titleName}
            onChange={(e) => setTitleName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth={true}
            id="description"
            label="Description"
            name="description"
            autoComplete="given-name"
            value={descriptionName}
            onChange={(e) => setDescriptionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={isEdit ? editTask : saveTask}
          >
            {isEdit ? "Edit" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveDialog;
