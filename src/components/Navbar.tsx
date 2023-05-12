import {Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap";
import {NavLink} from "react-bootstrap";
import buy from "../assets/buy.svg";
import {useShoppingCart} from "../context/ShoppingCartContext";

const Navbar = () => {
    const {cartQuantity, openCart} = useShoppingCart();
    return (
        <NavbarBs sticky={"top"} className={"bg-white shadow-sm mb-3"}>
            <Container>
                <Nav className={"me-auto"}>
                    <Nav.Link href={"/"} as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link href={"/store"} as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link href={"/about"} as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>
                {
                    cartQuantity > 0 &&
                    <Button onClick={() => openCart()} variant={"outline-primary"} className={"buyIcon rounded-circle"}>
                        <img src={buy} alt={"buy"}/>
                        <div
                            className={"rounded-circle bg-danger d-flex justify-content-center align-items-center buyBadge"}>
                            {cartQuantity}
                        </div>
                    </Button>
                }

            </Container>
        </NavbarBs>
    );
};

export default Navbar;