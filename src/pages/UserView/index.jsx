import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

//import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
//import { makeStyles } from "@material-ui/core/styles";
//import Container from "@material-ui/core/Container";

import { AuthService, FormService } from "@/services";

//const useStyles = makeStyles((theme) => ({}));

function UserView(props) {
  //const classes = useStyles();

  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState([]);
  //console.log(responseData);

  //const [optionValue, setOptionValue] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  //console.log(value);
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      const userr = AuthService.getCurrentUser();
      console.log(userr.id);

      setUserId(userr.id);
    } else {
      const anonymousUserId =
        "anonymous" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      console.log(anonymousUserId);
      setUserId(anonymousUserId);
    }
  }, []);

  const handleRadioChange = (j, i) => {
    const questionId = questions[i]._id;
    const optionId = questions[i].options[j]._id;

    /**
      const fakeData = {
      question: i,
      option: j,
    };
     */

    const data = {
      questionId,
      optionId,
    };
    //  console.log(data);
    //console.log(fakeData);
    // console.log(j);

    setValue(j);

    const fakeRData = [...responseData];

    const indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }

    // setOptionValue(fakeData);
    //
  };

  useEffect(() => {
    const formId = props.match.params.formId;
    console.log(formId);

    FormService.getForm(formId).then(
      (data) => {
        console.log(data);

        setFormData(data);
        setQuestions(data.questions);
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
  }, [props.match.params.formId]);

  function submitResponse() {
    const submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };
    console.log(submissionData);

    FormService.submitResponse(submissionData).then(
      (data2) => {
        setIsSubmitted(true);
        console.log(data2);
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

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography constiant="h6" style={{}}>
              Velocity Forms
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        constiant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography constiant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={i}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              constiant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>

                            {ques.questionImage !== "" ? (
                              <div>
                                <img
                                  alt=""
                                  src={ques.questionImage}
                                  width="80%"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={value}
                                onChange={(e) => {
                                  handleRadioChange(e.target.value, i);
                                }}
                              >
                                {ques.options.map((op, j) => (
                                  <div key={j}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={j}
                                        control={<Radio />}
                                        label={op.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {op.optionImage !== "" ? (
                                        <img
                                          alt=""
                                          src={op.optionImage}
                                          width="64%"
                                          height="auto"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      constiant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography constiant="body1">Form submitted</Typography>
                <Typography constiant="body2">
                  Thanks for submiting form
                </Typography>

                <Button onClick={reloadForAnotherResponse}>
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>

        {/* //TODO: Add a footer here */}
      </div>
    </div>
  );
}

export default UserView;

/*
const FormControlLabelWrapper = (props) => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};

*/
