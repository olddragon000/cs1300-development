// TODO: create a component that displays a single bakery item
import {Button} from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import Typography from "antd/es/typography/Typography";


function BakeryItem(props) {
    const item = props.content
    return (
        <Card
            style={{
                height: '100%'
            }}
            cover={
                <img
                    alt={item.name}
                    src={require("../assets/" + item.image)}
                />
            }
            actions={[
                <Button type="primary"
                        onClick={() => props.addToCart(item)}>
                    Add To Cart
                </Button>,
                <Typography>
                    {(props.quantity)?(props.quantity):(0)}
                </Typography>,
                <Button type="primary"
                        onClick={() => props.removeFromCart(item)}>
                    Remove
                </Button>
            ]}>
            <Meta title={item.name} description={item.description}>

            </Meta>

            <Typography style={{paddingTop: "2rem"}}>
                {"Category: " + item.type}
            </Typography>
            <Typography>
                {"Calories: " + item.calories}
            </Typography>


            <Typography>
                {"Price: $" + item.price}
            </Typography>


        </Card>

    )
}

export default BakeryItem