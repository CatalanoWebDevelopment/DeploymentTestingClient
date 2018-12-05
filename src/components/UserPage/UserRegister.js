import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiUrl from "../../helpers/environment";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.dark
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordVerify: ""
    };
  }

  handleChangeLogin = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitRegister = event => {
    event.preventDefault();
    let email = this.state.email;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let password = this.state.password;
    let userData = { user: { email, firstName, lastName, password } };

    fetch(`${ApiUrl}/user/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(response => {
        let token = response.sessionToken;
        localStorage.setItem("SessionToken", token);
        this.props.renderLinks();
        this.props.renderGreeting();
      });
  };

  passwordVerification = () => {
    if (this.state.password === this.state.passwordVerify) {
      return (
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register User
        </Button>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Registry
            </Typography>

            <form className={classes.form} onSubmit={this.onSubmitRegister}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Your Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChangeLogin}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  onChange={this.handleChangeLogin}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  onChange={this.handleChangeLogin}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChangeLogin}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Verify Password</InputLabel>
                <Input
                  name="passwordVerify"
                  type="password"
                  id="passwordVerify"
                  autoComplete="current-password"
                  onChange={this.handleChangeLogin}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              {this.passwordVerification()}
            </form>

            <br />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="classes.submit"
              onClick={this.props.renderLogin}
            >
              Have A Profile? Sign In Now
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
