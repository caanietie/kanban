import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function KanBanError(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card big error">
        {props.message}<br />
        <button className="actions"
          onClick={() => navigate("/")}
          style={{ margin: "25px 20px" }}
        >
          Go back
        </button>
      </div>
      <div className="overlay" onClick={() => navigate("/")} />
    </div>
  )
}

KanBanError.propTypes = {
  message: PropTypes.string.isRequired
}