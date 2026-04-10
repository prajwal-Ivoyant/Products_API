import { useState } from "react";
import { Row, Col } from "antd";
import { useGetAllproductsQuery } from "../../api/productsSlice";
import ProductsCard from "./ProductsCard";
import InputModal from "../Input/InputModal";
import type { ProductsTypes } from "../../types/types";

function Products() {
    const { data, isLoading, error } = useGetAllproductsQuery();

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductsTypes | undefined>();

    const handleEdit = (product: ProductsTypes) => {
        setSelectedProduct(product);
        setIsEdit(true);
        setOpen(true);
    };


    if (isLoading) return <h3>Loading...</h3>;
    if (error) return <h3>Error loading products</h3>;

    return (
        <div style={{ padding: 20 }}>
          

            <Row gutter={[16, 16]}>
                {data?.map((prod) => (
                    <Col key={prod._id} xs={24} sm={12} md={8} lg={6}>
                        <ProductsCard Product_id={prod._id} onEdit={handleEdit} />
                    </Col>
                ))}
            </Row>

            <InputModal
                open={open}
                setOpen={setOpen}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                initialData={selectedProduct}
            />
        </div>
    );
}

export default Products;