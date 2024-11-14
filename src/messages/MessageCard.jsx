import React from "react";
import "./Message.css";
import miscClimber from "../imgs/misc_climber.jpg";

/** Show list of message cards.
 *
 * Used by AreaMessages to list messages. 
 *
 * AreaMessages -> MesageCard
 *
 */

function MessageCard({ messages }) {

  return (
    <div>
      {messages.map(message => (
        <div className="message-card">
          <img src={message.pictureUrl ? message.pictureUrl : miscClimber} className="thumbnail"></img>
          <p className="msg-info">{message.fromUser} ({message.timePosted.slice(11, 16)}, {message.timePosted.slice(0, 10)})</p>
          <p className="msg-text">{message.messageText}</p>
        </div>
      ))}
    </div>
  );
}
export default MessageCard;
