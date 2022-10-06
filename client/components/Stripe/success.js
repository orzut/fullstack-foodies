import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const Success = () => {
  const [sessionData, setSessionData] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");
  //   console.log(sessionId);
  useEffect(() => {
    try {
      async function fetchSession() {
        const { data } = await axios.get(
          "/api/stripe/checkout-session?sessionId=" + sessionId
        );
        setSessionData(data);
      }
      fetchSession();
    } catch (error) {}
  });

  return (
    <>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    </>
  );
};

export default connect((state) => state)(Success);
