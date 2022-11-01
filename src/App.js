import "./App.css";
import React from "react";
import store from "./data/store";
import { Provider } from "react-redux";
import KanBan from "./components/KanBan";
import NewCard from "./components/NewCard";
import EditCard from "./components/EditCard";
import KanBanError from "./components/KanBanError";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<KanBan />}>
						<Route path="new" element={<NewCard />} />
						<Route path="edit/:cardId" element={<EditCard />} />
						<Route path="*"
							element={<KanBanError message="Resource not found" />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}