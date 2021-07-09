import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { FormControl } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directors_array: ["director-0"],
    };
  }

  appendInput_director() {
    var newInput = `director-${this.state.directors_array.length}`;
    console.log(this.state.directors_array.concat([newInput]));
    this.setState((prevState) => ({
      directors_array: prevState.directors_array.concat([newInput]),
    }));
  }

  render() {
    console.log(this.state.directors_array);
    return (
      <div>
        {this.state.directors_array.map((input, index) => (
          <Grid xs={12} container spacing={1} item>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <TextField
                  variant="outlined"
                  required
                  id={input + "-name"}
                  label="Ingrediente"
                  name={input + "-nombre"}
                  size="small"
                  className="name"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <TextField
                  variant="outlined"
                  required
                  type="number"
                  id={input + "-mobile"}
                  label="Cantidad"
                  name={input + "-cantidad"}
                  size="small"
                  className="mobile"
                  InputProps={{
                    endAdornment: index + 1 ===
                      this.state.directors_array.length && (
                      <InputAdornment position="end">
                        <Tooltip title="Añadir Uno Mas">
                          <Button
                            color="primary"
                            size="small"
                            onClick={() => this.appendInput_director()}
                          >
                            <AddIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Quitar">
                          <Button
                            color="primary"
                            size="small"
                            onClick={() => this.appendInput_director()}
                          >
                            <CloseIcon />
                          </Button>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}
