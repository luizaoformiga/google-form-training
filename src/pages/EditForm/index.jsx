import React, { useState, useEffect } from "react";

import { useStyles } from "./styles";
import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MoreIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PaletteIcon from "@material-ui/icons/Palette";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import StarBorderIcon from "@material-ui/icons/StarBorder";

import ViewListIcon from "@material-ui/icons/ViewList";

import { TabPanel } from "./tabPanel";

import { Form } from "@/components";
import { ResponseTab } from "@/helpers";
import { FormService, AuthService } from "@/services";

function EditForm(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [formID, setFormID] = useState("");

  const [formDeatils, setFormDetails] = useState({});

  const [openOfAlert, setOpenOfAlert] = useState(false);

  useEffect(() => {
    setUser(AuthService.getCurrentUser);
  }, []);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/s/" + formDeatils._id
    );
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenOfAlert(false);
  };

  function sendForm() {
    handleClickOpen();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const formId = props.match.params.formId;

    if (formId !== undefined) {
      setFormID(formId);
      FormService.getForm(formId).then(
        (data) => {
          // console.log(data);
          setFormDetails(data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  }, [props.match.params.formId]);

  return (
    <div>
      {formDeatils.createdBy === user.id ? (
        <div>
          <div className={classes.root}>
            <AppBar
              position="static"
              style={{ backgroundColor: "white" }}
              elevation={2}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="Rohit Saini's form"
                  style={{ color: "#140078" }}
                >
                  <ViewListIcon />
                </IconButton>
                <Typography
                  constiant="h6"
                  noWrap
                  style={{ marginTop: "8.5px", color: "black" }}
                >
                  {formDeatils.name}
                </Typography>
                {/* <IconButton
                        aria-label="Rohit Saini's form"
                        style={{marginLeft:'5px'}} 
                    >
                        <FolderOpenIcon />
                    </IconButton> */}

                <IconButton aria-label="Rohit Saini's form">
                  <StarBorderIcon />
                </IconButton>

                <Tabs
                  className={classes.title}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Questions" />
                  <Tab label="Responses" />
                </Tabs>
                <IconButton aria-label="search" onClick={sendForm}>
                  <SendIcon />
                </IconButton>

                <IconButton aria-label="search">
                  <PaletteIcon />
                </IconButton>
                <IconButton aria-label="search">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="search">
                  <SettingsIcon />
                </IconButton>

                <IconButton aria-label="display more actions" edge="end">
                  <MoreIcon />
                </IconButton>
                <IconButton aria-label="display more actions" edge="end">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Copy and share link."}
              </DialogTitle>
              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    alignContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography constiant="body1">
                        {window.location.origin + "/s/" + formDeatils._id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.button}
                        aria-label="Add"
                        size="medium"
                        onClick={clipToClipboard}
                      >
                        <FilterNoneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
                {/* <div style={{padding: '7px', display: 'flex'}}>
                  <Typography constiant="body1">{window.location.origin + "/s/" + formDeatils._id}</Typography>
                    
                  <IconButton onClick={() =>  navigator.clipboard.writeText(window.location.origin + "/s/" + formDeatils._id)}  >
                    <MoreIcon />
                  </IconButton>
                  </div> */}

                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseOfAlert}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            />
          </div>

          <div>
            <TabPanel value={value} index={0}>
              <Form.QuestionTab formData={formDeatils} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDeatils} formId={formID} />
            </TabPanel>
          </div>
        </div>
      ) : (
        <p>you're not the owner of the form</p>
      )}
    </div>
  );
}

export default EditForm;

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
