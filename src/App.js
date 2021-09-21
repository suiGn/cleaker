import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ValidateEmail from "./Pages/ValidateEmail";
import NotValidateEmail from "./Pages/NotValidateEmail";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import LockScreen from "./Pages/LockScreen";
import ResetPassword from "./Pages/ResetPassword";
import NewPassword from "./Pages/NewPassword";
import PhoneCode from "./Pages/PhoneCode";
import Layout from "./App/Layout";
import io from "socket.io-client";
import { LogIn } from "react-feather";
import CallPage from "./Pages/CallPage";
import VideoChat from "./App/VideoChat";
const ENDPOINT = "http://localhost:5000/";
const socket = io({
  transports: ["websocket"],
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "99999",
    position: "fixed",
    top: 0,
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  colorPrimary: {
    color: "#0a80ff",
    background: "white",
  },
  colorSecondary: {
    color: "#f3c96e",
    background: "#212124",
  },
}));

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [darkSwitcherTooltipOpen, setDarkSwitcherTooltipOpen] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      UpdateTheme();
    } else {
      SetLocalStorage();
    }
  }, []);

  const CheckIfLogged = () => {
    axios
      .get("/logged", {
        onDownloadProgress: (progressEvent) => {
          const total = parseFloat(progressEvent.total);
          const current = progressEvent.loaded;
          setProgress(Math.floor((current / total) * 100));
        },
      })
      .then((res) => {
        if (!res.data.ok) {
          localStorage.removeItem("theme");
          document.body.className = "";
          document.body.classList.add("form-membership");
          setLoaded(true);
        }
        setloggedIn(res.data.ok);
        // if (localStorage.getItem("theme")) {
        //   setLoaded(true);
        // }
        // setLoaded(true);
      }).catch((err) => setLoaded(true));
  };

  const UpdateTheme = () => {
    socket.emit("theme");
    socket.once("retrive theme", function (theme) {
      if (theme.theme[0].theme === 0) {
        document.body.className = "";
        setDarkSwitcherTooltipOpen(true);
        localStorage.setItem("theme", "light");
      } else {
        document.body.className = "dark";
        setDarkSwitcherTooltipOpen(false);
        localStorage.setItem("theme", "dark");
      }
    });
    CheckIfLogged();
  };

  const SetLocalStorage = () => {
    if (localStorage.getItem("theme") === "light") {
      document.body.className = "";
      setDarkSwitcherTooltipOpen(true);
    } else {
      document.body.className = "dark";
      setDarkSwitcherTooltipOpen(false);
    }
    CheckIfLogged();
  };

  // if (!loaded) {
  //   return (
  //     <div className={classes.root}>
  //       <CircularProgress
  //         className={classes.colorPrimary}
  //         variant="determinate"
  //         size={100}
  //         value={progress}
  //       />
  //     </div>
  //   );
  // }
  return (
    <Router>
      {!loaded ? (
        <div
          className={
            darkSwitcherTooltipOpen
              ? `${classes.colorPrimary} ${classes.root}`
              : `${classes.colorSecondary} ${classes.root}`
          }
          id="circular-progress"
        >
          <CircularProgress
            className={
              darkSwitcherTooltipOpen
                ? classes.colorPrimary
                : classes.colorSecondary
            }
            variant="determinate"
            size={100}
            value={progress}
          />
        </div>
      ) : null}

      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect to="/workspace" />
          ) : (
            <SignIn setLoaded={setLoaded} isBadLogin={""} />
          )}
        </Route>
        <Route path="/sign-in">
          {loggedIn ? (
            <Redirect to="/workspace" />
          ) : (
            <SignIn setLoaded={setLoaded} isBadLogin={""} />
          )}
        </Route>
        <Route path="/workspace">
          {loggedIn ? (
            <Layout
              darkSwitcherTooltipOpen={darkSwitcherTooltipOpen}
              setDarkSwitcherTooltipOpen={setDarkSwitcherTooltipOpen}
              socket={socket}
              setLoaded={setLoaded}
            />
          ) : (
            <SignIn setLoaded={setLoaded} isBadLogin={""} />
          )}
        </Route>
        <Route
          path="/badLogin"
          render={(props) => (
            <SignIn isBadLogin={"Invalid Username or Password"} />
          )}
        />
        <Route
          path="/notverify-email"
          render={(props) => <NotValidateEmail />}
        />
        <Route path="/call/:roomid" >{loggedIn ? ( <VideoChat setLoaded={setLoaded}/>): (
            <SignIn setLoaded={setLoaded} isBadLogin={""} />
          )}</Route>
        <Route path="/verify-email" component={ValidateEmail} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/lock-screen" component={LockScreen} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/pwdRst" component={NewPassword} />
        <Route path="/phone-code" component={PhoneCode} />
        <Route render={() => <h2>404 not found</h2>} />
        
      </Switch>
    </Router>
  );
}

export default App;
