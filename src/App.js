import './App.css'
import {
    Button,
    Col,
    ConfigProvider,
    Divider,
    Row,
    Select,
    Space,
    Typography
} from "antd";
import bakeryData from './assets/bakery-data.json'
import BakeryItem from "./components/BakeryItem";
import Layout, {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import Checkbox from "antd/es/checkbox/Checkbox";

function App() {

    const [showBread, setShowBread] = useState(true);
    const [showPastry, setShowPastry] = useState(true);
    const [showCake, setShowCake] = useState(true);
    const [sortBy, setSortBy] = useState("price")
    const [cart, setCart] = useState([])
    const [numItemsInCart, setNumItemsInCart] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)


    const myFilterFunction = (item) => {
        if ((showBread && item.type === "bread") || (showPastry && item.type === "pastry") || (showCake && item.type === "cake")) {
            return true;
        } else {
            return false;
        }
    }
    const filteredData = bakeryData.filter(myFilterFunction)
    const sortedData = filteredData.sort((a, b) => {
            if (sortBy === "price") {
                return a.price - b.price;
            } else {
                return a.calories - b.calories;
            }

        }
    )

    const addToCart = (ogItem) => {
        const item = ogItem.name
        if (!(item in numItemsInCart)) {
            const newCart = JSON.parse(JSON.stringify(cart));
            newCart.push(item);
            setCart(newCart);
            const newItemInCart = JSON.parse(JSON.stringify(numItemsInCart));
            newItemInCart[item] = 1
            setNumItemsInCart(newItemInCart)
        } else {
            const newItemInCart = JSON.parse(JSON.stringify(numItemsInCart));
            newItemInCart[item] += 1
            setNumItemsInCart(newItemInCart)
        }
        setTotalPrice(totalPrice + ogItem.price)
    }

    const removeFromCart = (ogItem) => {
        const item = ogItem.name
        if ((item in numItemsInCart)) {
            const newItemInCart = JSON.parse(JSON.stringify(numItemsInCart));
            newItemInCart[item] -= 1
            setNumItemsInCart(newItemInCart)
            if(newItemInCart[item] == 0){
                delete newItemInCart[item];
                const newCart = JSON.parse(JSON.stringify(cart));
                newCart.pop(item);
                setCart(newCart)
            }
            setTotalPrice(totalPrice - ogItem.price)
        }

    }

    return (
        <div className="App">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#eee1ba',
                    },
                }}>
                <Space>
                    <Typography style={{fontSize: "10rem"}}>
                        Bakery
                    </Typography>
                </Space>
                <Layout>
                    <Layout>
                        <Sider
                            style={{
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            <Row
                                style={{
                                    backgroundColor: "white",
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                <Space direction="vertical">
                                    <Typography>
                                        Sort By
                                    </Typography>
                                    <Select
                                        defaultValue={sortBy}
                                        style={{width: 120}}
                                        onChange={(e) => {
                                            setSortBy(e)
                                        }}
                                        options={[
                                            {
                                                value: 'price',
                                                label: 'Price',
                                            },
                                            {
                                                value: 'calories',
                                                label: 'Calories',
                                            },
                                        ]}
                                    />
                                </Space>

                                <Divider/>

                                <Space direction="vertical">
                                    <Typography>
                                        Filters
                                    </Typography>
                                    <Checkbox checked={showBread}
                                              onChange={(e) => {
                                                  setShowBread(!showBread)
                                              }}>Bread</Checkbox>
                                    <Checkbox checked={showPastry}
                                              onChange={(e) => {
                                                  setShowPastry(!showPastry)
                                              }}>Pastries</Checkbox>
                                    <Checkbox checked={showCake}
                                              onChange={(e) => {
                                                  setShowCake(!showCake)
                                              }}>Cakes</Checkbox>
                                </Space>
                                <Divider/>
                                <Space
                                    direction={"vertical"}>
                                    <Typography>
                                        Cart
                                    </Typography>
                                    <Space direction="vertical">
                                        {cart.map((item) => {
                                            return item + " x " + numItemsInCart[item]
                                        })}
                                    </Space>
                                    <Space>
                                        {"Total: $" + totalPrice.toFixed(2)}
                                    </Space>
                                    <Button onClick={()=>{
                                        setTotalPrice(0);
                                        setCart([]);
                                        setNumItemsInCart({})
                                    }}>
                                        Clear Cart
                                    </Button>
                                </Space>

                            </Row>
                        </Sider>
                        <Content>
                            <Row>
                                {
                                    sortedData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                                        <Col xl={8} md={12} xs={24}>
                                            <BakeryItem content={item}
                                                        addToCart={addToCart} quantity={numItemsInCart[item.name]} removeFromCart={removeFromCart}/>
                                        </Col>

                                    ))}
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>


        </div>
    );
}

export default App;
