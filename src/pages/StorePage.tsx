import {Row, Col} from "react-bootstrap"
import items from "../data/items.json";
import StoreItem from "../components/StoreItem";

const StorePage = () => {
    const cards = items.map(item => (
        <Col key={item.id}>
            <StoreItem {...item}/>
        </Col>
    ))
    return (
        <div>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className={"g-3"}>
                {cards}
            </Row>
        </div>
    );
};

export default StorePage;