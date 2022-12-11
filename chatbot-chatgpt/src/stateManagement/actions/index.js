

export const ChatBotRequested = (data) => {
  return (dispatch) => {
    dispatch({
      type: "CHAT_BOT_REQUESTED",
      payload: data,
    });
  };
};




