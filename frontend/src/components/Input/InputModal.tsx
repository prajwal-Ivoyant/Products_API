import { useEffect, useState } from "react";
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

const REQUIRED_FIELDS = ["name", "price", "category", "description", "imageUrl"];

function InputModal({ isEdit, setIsEdit, open, setOpen, initialData }: Props) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  useEffect(() => {
    if (initialData && open) {
      form.setFieldsValue({
        _id: initialData._id,
        name: initialData.name,
        price: initialData.price,
        category: initialData.category,
        description: initialData.description,
        imageUrl: initialData.images?.[0]?.url,
      });
    } else {
      form.resetFields();
    }
    setHasChanges(false);
    setIsSubmitting(false);
  }, [initialData, open, form]);

  const checkForChanges = () => {
    if (!isEdit || !initialData) {
      setHasChanges(true);
      return;
    }
    const current = form.getFieldsValue();
    const original = {
      name: initialData.name,
      price: initialData.price,
      category: initialData.category,
      description: initialData.description,
      imageUrl: initialData.images?.[0]?.url,
    };

    const changed = (Object.keys(original) as (keyof typeof original)[]).some(
      (key) => current[key] !== original[key]
    );
    setHasChanges(changed);
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateProduct({
          _id: initialData?._id!,
          name: values.name,
          price: values.price,
          category: values.category,
          description: values.description,
          images: [{ url: values.imageUrl, alt: values.name }],
        });
        message.success(`Successfully UPDATED ${values.name}`);
      } else {
        await createProduct({
          name: values.name,
          price: values.price,
          category: values.category,
          description: values.description,
          images: [{ url: values.imageUrl, alt: values.name }],
        });
        message.success(`Successfully CREATED ${values.name}`);
      }
      setOpen(false);
      setIsEdit(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={checkForChanges}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Product name is required" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Price is required" },
            { type: "number", min: 1, message: "Price must be at least 1" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Description is required" },
            { min: 10, message: "Description must be at least 10 characters" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[
            { required: true, message: "Image URL is required" },
            { type: "url", message: "Please enter a valid URL" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const values = form.getFieldsValue();

            const allFilled = REQUIRED_FIELDS.every((field) => {
              const val = values[field];
              return val !== undefined && val !== null && val !== "";
            });

            const hasErrors = form
              .getFieldsError()
              .some(({ errors }) => errors.length > 0);

            const isButtonDisabled =
              isSubmitting ||
              !allFilled ||
              hasErrors ||
              (isEdit && !hasChanges);

            return (
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isButtonDisabled}
                loading={isSubmitting}
              >
                {isEdit ? "Update Product" : "Add Product"}
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InputModal;