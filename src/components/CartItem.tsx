import React from 'react';
import {Button, Stack} from "react-bootstrap";
import storedItems from "../data/items.json";
import {formatCurreny} from "../utilities/CurrencyFormat";
import {useShoppingCart} from "../context/ShoppingCartContext";

type CartItemProps = {
    id: number,
    quantity: number
}
const CartItem: React.FC<CartItemProps> = ({id, quantity}) => {
    const {removeItem} = useShoppingCart();
    const item = storedItems.find(i => i.id === id);
    return (
        item ? <Stack direction={"horizontal"} gap={2}>
            <img src={item.imgUrl} style={{width: "125px", height: "75px", objectFit: "cover"}} alt={"item"}/>
            <div className={"me-auto"}>
                <div>
                    {item.name}{" "}
                    {quantity > 1 && <span className={"text-muted"} style={{fontSize: "0.65rem"}}>{quantity}x</span>}
                </div>
                <div className={"text-muted"} style={{fontSize: "0.75rem"}}>
                    {formatCurreny(item.price)}
                </div>
            </div>
            <div>
                {formatCurreny(quantity * item.price)}
            </div>
            <Button variant={"outline-danger"} size={"sm"} onClick={() => removeItem(id)}>&times;</Button>
        </Stack> : null
    );
};

export default CartItem;