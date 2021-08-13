import React, { useState, useEffect } from "react";
import { AuthService, FormService } from "@/services";

import { useStyles } from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Form } from "@/components";

function DashBoard() {
  let history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const addForm = ()=>{
  //   const x = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  //   console.log(x);
  //   history.push("/form/"+x);
  // }

  const logout = () => {
    const logoutConfirmation = window.confirm("Really want to logout?");

    if (logoutConfirmation) {
      AuthService.logout();
      history.push("/login");
    }
  };

  const cancelAddForm = () => {
    handleClose();
    setFormTitle("");
    setFormDescription("");
  };

  const createForm = () => {
    const data = {
      name: formTitle,
      description: formDescription,
      createdBy: user.id,
    };

    if (data.name !== "") {
      FormService.createForm(data).then(
        (result) => {
          console.log(result);
          history.push("/form/" + result._id);
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
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <AddIcon />
        </IconButton>
        <p>Create </p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "teal" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <HomeIcon />
          </IconButton>

          <Typography className={classes.title} constiant="h6" noWrap>
            Velocity Forms
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="Create new form"
              color="inherit"
              onClick={handleClickOpen}
            >
              <AddIcon />
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={logout}
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Creating a new empty form, just add form name and description if
                you want.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Form Name"
                type="text"
                fullWidth={false}
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Form description"
                type="text"
                fullWidth
                value={formDescription}
                onChange={(e) => {
                  setFormDescription(e.target.value);
                }}
              />
              <br></br>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAddForm} color="primary">
                Cancel
              </Button>
              <Button onClick={createForm} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Form.Forms userId={user.id} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
