import React, { useState } from "react";

import { useStyles } from "./styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//import FormControl from "@material-ui/core/FormControl";
//import FormHelperText from "@material-ui/core/FormHelperText";
//import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

export default function ErrorRadios() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleRadioChange = (event) => {
    console.log(event.target.value);

    setValue(event.target.value);

    setError(...error);
  };

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div>
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {["", "", ""].map((op, j) => (
          <FormControlLabel
            key={j}
            value={j}
            control={<Radio />}
            label={"the worst" + j}
          />
        ))}
      </RadioGroup>

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Check Answer
      </Button>
    </div>
  );
}
