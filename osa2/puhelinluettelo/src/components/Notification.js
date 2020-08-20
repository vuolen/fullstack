import React from "react";

const Notification = ({ text, error }) => {
  if (text === null) {
    return null;
  }

  return (
    <div className={error ? "error" : "notification"}>
      {text}
    </div>
  );
}


export default Notification;
