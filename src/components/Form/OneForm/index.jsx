import React, { useState, useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";

import { useStyles } from "./styles";

//import Paper from "@material-ui/core/Paper";
//import Button from "@material-ui/core/Button";
//import CardActions from "@material-ui/core/CardActions";

export default function OneForm(props) {
  const classes = useStyles();

  const [form, setForm] = useState({
    id: ""
  });

  useEffect(() => {
    //console.log(props.formData)
    setForm(props.formData);
  }, [props.formData]);

  return (
    <Grid item={true} xs={12} sm={6} md={3}>
      <Card className={classes.root}>
        <CardActionArea href={"/form/" + form.id}> {/**+ form */} {/**form.id */}
          <CardMedia
            className={classes.media}
            image="https://static.makeuseof.com/wp-content/uploads/2019/06/AutoGradingQuizResults-GoogleForms.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom={true} variant="h5" component="h2">
              {form.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {form.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Opened: <Moment fromNow>{form.updatedAt}</Moment>
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions> */}
      </Card>
    </Grid>
  );
}
