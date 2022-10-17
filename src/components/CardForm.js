import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function handleSubmit(event, cardFunc, navigate, options) {
  event.preventDefault();
  cardFunc(options);
  navigate("/");
}

export default function CardForm(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [status, setStatus] = useState(props.status || "")
  const [color, setColor] = useState(props.color || "#2233FF");
  const options = {
    title: title, color: color, status: status, description: description
  };
  return (
    <div>
      <div className="card big">
        <form onSubmit={event => handleSubmit(event, props.handleSubmit, navigate, options)}>
          <input type="text" placeholder="Title" maxLength={80} value={title}
            onChange={event => setTitle(event.target.value)} required={true} />
          <textarea type="text" rows={4} placeholder="Description" value={description}
            onChange={event => setDescription(event.target.value)} required={true} />
          <div>
            <label htmlFor="status">Status:</label>
            <select value={status} required={true}
              onChange={event => setStatus(event.target.value)}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="color">Color:</label>
            <input type="color" value={color} required={true}
              onChange={event => setColor(event.target.value)} />
          </div>
          <button type="submit" className="actions">{props.buttonLabel}</button>
        </form>
      </div>
      <div className="overlay" onClick={() => navigate("/")} />
    </div>
  )
}
CardForm.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
}