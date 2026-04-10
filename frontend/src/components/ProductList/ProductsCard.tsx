import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetOneProductQuery,
} from "../../api/productsSlice";
import type { ProductsTypes } from "../../types/types";
import { Card, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type Props = {
  Product_id: string;
  onEdit: (product: ProductsTypes) => void;
};

function ProductsCard({ Product_id, onEdit }: Props) {

  const { data: Product, isLoading, error } =
    useGetOneProductQuery(Product_id);

  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error || !Product) return <p>Error loading product</p>;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal open
    onEdit(Product);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const deletedItem = Product.name;
    await deleteProduct(Product._id);
    message.success(`successfully DELETED the ${deletedItem}`)
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={handleEdit} />,
    <DeleteOutlined key="delete" onClick={handleDelete} />,
  ];

  return (
    <>
      <Card
        hoverable
        onClick={handleOpenModal}
        actions={actions}
        style={{ width: "100%" }}
        cover={
          <img
            draggable={false}
            alt={Product.images?.[0]?.alt}
            src={Product.images?.[0]?.url}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
      >
        <h3>{Product.name}</h3>
        <p>{Product.description}</p>
      </Card>

      <Modal
        title={Product.name}
        width={500}
        centered
        open={open}
        onCancel={handleCloseModal}
        footer={[
         
        ]}
      >
        <img
          src={Product.images?.[0]?.url}
          alt={Product.images?.[0]?.alt}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <p><b>Price:</b> ₹{Product.price}</p>
        <p><b>Category:</b> {Product.category}</p>
        <p><b>Description:</b> {Product.description}</p>
        
      </Modal>
    </>
  );
}

export default ProductsCard;