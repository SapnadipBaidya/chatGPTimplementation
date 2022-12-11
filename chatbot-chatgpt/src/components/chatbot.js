import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useDebounce } from "../customHooks/useDebounce";
import { ChatBotRequested } from "../stateManagement/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const useStyles = makeStyles({
  bottomSection: {
    backgroundColor:"#ddaa1dce !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "none",
    boxShadow: "none",
    minHeight: "20vh",
    padding: "1vh",
 
  },
  upperSection: {
    backgroundColor:"#ddaa1dce !important",
    minHeight: "68vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
  },
  userInputBox: { minWidth: "90%", minHeight: "10vh" },
  ChatBotBox: {
    overflow: "overlay",
    minWidth: "75%",
    maxHeight: "60vh",
    cursor: "none",
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: "#00000000",
      color: "black",
      border: "none",
      fontSize: "4vh",
    },

   
  },
  sendBtnStyle: {
    minWidth: "10vw",
    minHeight: "8vh",
    backgroundColor: "#00000000",
    border: "none",
    boxShadow: "none",
    "& :hover": {
      color: "white",
      fontSize:"2vw",
    },
  },
});
function Chatbot() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [searchField, setSearchField] = useState("");

  const loading = useSelector((state) => state.chatBotReducer.loading);
  const botResponse = useSelector(
    (state) => state.chatBotReducer.ChatBotResponse
  );

  const handleOnKeyChage = (e) => {
    setSearchField(e.target.value);
  };

  const handleOnClick = () => {
    dispatch(ChatBotRequested(value));
    setSearchField("");
  };
  const debouncedSearch = useDebounce(searchField, 500);

  useEffect(() => {
    setValue(debouncedSearch);
  }, [debouncedSearch]);
  useEffect(() => {
    console.log(botResponse);
  }, [botResponse?.botSays]);
  console.log("ppp", botResponse?.data?.botSays);
  return (
    <div
      style={{
        padding: "1vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: "95vh",
      }}
    >
  
        {(loading || botResponse?.data?.botSays !== undefined )&&     <Card className={classes.upperSection} elevation={10}>
        {!loading ? (
          <TextField
            id="filled-multiline-flexible"
            multiline
            maxRows={10}
            value={botResponse?.data?.botSays}
            variant="filled"
            margin="dense"
            className={classes.ChatBotBox}
            disabled
            InputProps={{ disableUnderline: true }}
            elevation={0}
          />
        ) : (
          <Box style={{ minWidth: "77%", maxWidth: "80%" }}>
            {" "}
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
      </Card>}
        
      <Card className={classes.bottomSection} elevation={0}>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "20vh",
            maxHeight: "21vh ",
            minWidth: "85%",
            justifyContent: "center",
            backgroundColor:"#00000000"
          }}
          elevation={0}
        >
          <TextField
            id="filled-basic"
            label="Chat with me !!"
            multiline
            variant="filled"
            onChange={(e) => handleOnKeyChage(e)}
            maxRows={4}
            className={classes.userInputBox}
            value={searchField}
            InputProps={{ disableUnderline: true }}
          />
        </Card>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "18vh",
            justifyContent: "center",
            marginBottom: "2vh",
            backgroundColor:"#00000000"
          }}
          elevation={0}
        >
          <button
             className={classes.sendBtnStyle}
            variant="contained"
            onClick={handleOnClick}
            disabled={loading}
        
          >
            <SendIcon />
          </button>
        </Card>
      </Card>
    </div>
  );
}
export default Chatbot;
