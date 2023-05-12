import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {

    return (
        <>
            <ShoppingCartProvider>
                <Navbar/>
                <Container className={"mb-4"}>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/store"} element={<StorePage/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </>


    )
}

export default App
