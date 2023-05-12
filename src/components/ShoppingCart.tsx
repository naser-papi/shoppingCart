import React from 'react';
import {Offcanvas, Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import CartItem from './CartItem';
import storedItems from "../data/items.json";
import {formatCurreny} from "../utilities/CurrencyFormat";

type ShoppingCartProps = {
    isOpen: boolean
}
const ShoppingCart: React.FC<ShoppingCartProps> = ({isOpen}) => {
    const {closeCart, cartItems} = useShoppingCart();
    const items = cartItems.map((item) => (
        <CartItem key={item.id} {...item}/>
    ))
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {items}
                    <div className={"ms-auto fw-bold fs-5"}>
                        <span>
                            Total{" "}
                        </span>
                        <span>
                            {formatCurreny(cartItems.reduce((total, item) => {
                                const originalItem = storedItems.find(x => x.id === item.id);
                                return total + (originalItem?.price || 0) * item.quantity;
                            }, 0))}
                        </span>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ShoppingCart;