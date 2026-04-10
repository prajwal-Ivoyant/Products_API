import InputModal from "../components/Input/InputModal";
import Products from "../components/ProductList/Products";


import { Layout, Button, Flex, Divider } from "antd"
import { useState } from "react";

const { Content, Header, Footer } = Layout;
function Dashboard() {

    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header style={{ background: "none" }}>
                    <Flex justify="space-between">
                        <h1>Products</h1>
                        <Button onClick={handleOpen} style={{ marginTop: 15 }}>Add New Product</Button>
                    </Flex>
                </Header>
                <Content>
                    <Divider ></Divider>
                    <Products />

                    {open && (
                        <InputModal
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            open={open}
                            setOpen={setOpen}
                        />

                    )}

                </Content>
                <Divider></Divider>
                <Footer >
                    Footer
                </Footer>
            </Layout>
        </>
    )
}

export default Dashboard