import React from "react";
import List from "./List";
import { DndProvider } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { cardSelector } from "../data/cardSlice";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function KanBan() {
  const cards = useSelector(cardSelector);
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="KanBanBoard">
          <List id="todo" title="To Do"
            cards={cards.filter(card => card.status === "todo")}
          />
          <List id="in-progress" title="In Progress"
            cards={cards.filter(card => card.status === "in-progress")}
          />
          <List id="completed" title="Completed"
            cards={cards.filter(card => card.status === "completed")}
          />
          <Link to="/new" className="plusSign">{"\uFF0B"}</Link>
        </div>
      </DndProvider>
      <Outlet />
    </div>
  )
}