import {Button, Card} from "react-bootstrap";
import React from "react"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {formatCurreny} from "../utilities/CurrencyFormat";

type StoreItemProps = {
    id: number
    name: string,
    price: number,
    imgUrl: string,
}
const StoreItem: React.FC<StoreItemProps> = ({id, name, price, imgUrl}) => {
    const {getItemQuantity, incItemQuantity, decItemQuantity, removeItem} = useShoppingCart();
    const count = getItemQuantity(id);

    return (
        <Card className={"h-100"}>
            <Card.Img
                variant={"top"}
                height={"200px"}
                style={{objectFit: "cover"}}
                src={imgUrl}/>
            <Card.Body className={"d-flex flex-column"}>
                <Card.Title className={"d-flex justify-content-between align-items-baseline mb-4"}>
                    <span className={"fs-2"}>{name}</span>
                    <span className={"ms-2 text-muted"}>{formatCurreny(price)}</span>
                </Card.Title>
                <div className={"mt-auto"}>
                    {
                        count === 0 ?
                            <Button className={"w-100"} onClick={() => incItemQuantity(id)}>
                                + Add To Cart
                            </Button> :
                            <div className={"d-flex flex-column align-items-center"}
                                 style={{gap: "0.5rem"}}>
                                <div className={"d-flex align-items-center justify-content-center"}
                                     style={{gap: "0.5rem"}}>
                                    <Button onClick={() => decItemQuantity(id)}>-</Button>
                                    <div className={"d-flex align-items-baseline"}>
                                        <span className={"fs-2"}>
                                            {count}
                                        </span>
                                        <span className={"text-muted"}>
                                            in cart
                                        </span>
                                    </div>
                                    <Button onClick={() => incItemQuantity(id)}>+</Button>
                                </div>
                                <Button variant={"danger"} size={"sm"} onClick={() => removeItem(id)}>Remove</Button>
                            </div>
                    }

                </div>
            </Card.Body>
        </Card>
    );
};

export default StoreItem;