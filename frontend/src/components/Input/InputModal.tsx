
import { useEffect } from "react";
import type { ProductsTypes } from "../../types/types";
import { useCreateProductMutation, useUpdateProductMutation } from "../../api/productsSlice";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
type Props = {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ProductsTypes;
};

function InputModal({
  isEdit,
  setIsEdit,
  open,
  setOpen,
  initialData,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData && open) {

      form.setFieldsValue({
        _id: initialData?._id!,
        name: initialData.name,
        price: initialData.price,
        category: initialData.category,
        description: initialData.description,
        imageUrl: initialData.images?.[0]?.url,
      });


    } else {
      form.resetFields();
    }
  }, [initialData, open, form]);

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (values: any) => {
  try {
    if (isEdit) {
      await updateProduct({
        _id: initialData?._id!, 
        name: values.name,
        price: values.price,
        category: values.category,
        description: values.description,
        images: [
          {
            url: values.imageUrl,
            alt: values.name,
          },
        ],
      });
      message.success(`successfully UPDATED the ${values.name}`)
    } else {
      await createProduct({
        name: values.name,
        price: values.price,
        category: values.category,
        description: values.description,
        images: [
          {
            url: values.imageUrl,
            alt: values.name,
          },
        ],
      });
      message.success(`successfully CREATED the ${values.name}`)
    }
  } catch (err) {
    console.error(err);
  }

  setOpen(false);
  setIsEdit(false);
  form.resetFields();
};


  return (
    <Modal
      title={isEdit ? "Edit Product" : "Add Product"}
      open={open}
      centered
      onCancel={() => {
        setOpen(false);
        setIsEdit(false);
      }}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true }, { min: 3 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true }, { type: "number", min: 1 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }, { min: 10 }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true }, { type: "url" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </Form>
    </Modal>
  );
}

export default InputModal;