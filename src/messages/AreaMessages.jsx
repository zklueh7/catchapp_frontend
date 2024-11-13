import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CatchAppApi from "../api/api";
import MessageCard from "./MessageCard";
import NewMessageForm from "./NewMessageForm";
import UserContext from "../auth/UserContext";

/** Show limited information about an area.
 *
 * Is rendered by AreaCardList to show a "card" for each area.
 *
 * AreaCardList -> AreaCard
 */

function AreaMessages() {
  const { area } = useParams();
  const { currentUser } = useContext(UserContext);

  const [areaInfo, setAreaInfo] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(function getAreaAndMessageInfoOnMount() {
    search(area);
  }, [messages]);

  /** Loads area info and messages. */
  async function search(area) {
    let areaInfo = await CatchAppApi.getArea(area);
    setAreaInfo(areaInfo);
    let messages = await CatchAppApi.getMessages(area);
    setMessages(messages);

  }
  if (!areaInfo) return <LoadingSpinner />;
  if (!messages) return <LoadingSpinner />;

  return (

    <div className="container text-center">
      <div className="card-body">
        <h3 className="heading">Message Board</h3>
        <div >
          {messages.length
            ? <MessageCard messages={messages} />
            : <p className="sorry">Sorry, no messages yet!</p>
          }
        </div>
        <NewMessageForm area={area} user={currentUser.username} />
        <Link className="btn area-home-btn" to={{ pathname: `/areas/${area}` }}>Back to Area Home</Link>
      </div>
    </div>

  );
}


export default AreaMessages;
