import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavBar from "./NavBar";
import Footer from "./Footer";
import Contacts from "./Contacts";
import Contact from "./Contact";
import CreateContact from "./CreateContact";
import Error from "./Error";

//create your first component
const Home = () => {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path={"/"} element={<Contacts />}/>
					<Route path={"/Contact"} element={<Contact />}/>
					<Route path={"/CreateContact"} element={<CreateContact />}/>
					<Route path={"*"} element={<Error />}/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default Home;