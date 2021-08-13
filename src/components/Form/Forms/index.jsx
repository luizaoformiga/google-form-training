import React, { useState, useEffect } from "react";

import { AuthService, FormService } from "@/services";

import { useStyles } from "./styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import OneForm from "../OneForm";
import CircularProgress from "@material-ui/core/CircularProgress";

function Forms(props) {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);

  useEffect(() => {
    setUser(AuthService.getCurrentUser);
  }, []);

  console.log(user);

  useEffect(() => {
    if (props.userId === undefined) {
      //console.log("this shit is undefined");
    } else {
      // console.log(props.userId);
      FormService.getForms(props.userId).then(
        (forms2) => {
          // console.log(forms2);

          setForms(forms2);
          setLoadingForms(false);
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
  }, [props.userId]);

  return (
    <div>
      <div>
        <CssBaseline />
        {loadingForms ? <CircularProgress /> : ""}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={6}>
            {forms.map((form, i) => (
              <OneForm formData={form} key={i} />
            ))}
          </Grid>
        </Container>
      </div>
      <div></div>
    </div>
  );
}

export default Forms;
