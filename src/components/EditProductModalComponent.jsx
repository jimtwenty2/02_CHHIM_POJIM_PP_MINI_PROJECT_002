"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getProductCategoriesAction,
  updateProductAction, 
} from "@/action/product.action";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), "Price must be a number"),
  categoryId: z.string().min(1, "Please select a category"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  colors: z.array(z.string()).min(1, "Select at least one color"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  description: z.string().optional(),
});

export default function EditProductModal({ isOpen, onClose, product }) {
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product && isOpen) {
      reset({
        name: product.name || product.productName || "",
        price: product.price?.toString() || "",
        categoryId: product.categoryId?.toString() || "",
        imageUrl: product.imageUrl || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        description: product.description || "",
      });
    }
  }, [product, isOpen, reset]);

  useEffect(() => {
    if (isOpen) {
      async function fetchCategories() {
        try {
          const data = await getProductCategoriesAction();
          if (data) setCategories(data);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        }
      }
      fetchCategories();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const productPayload = {
        ...data,
        price: parseFloat(data.price),
      };

      const result = await updateProductAction(product.productId, productPayload);

      if (result.success) {
        toast.success("Product updated successfully!");
        onClose();
      } else {
        toast.error(result.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="3xl"
      radius="2xl"
      classNames={{
        closeButton: "top-4 right-4 border border-gray-100 p-1 hover:bg-gray-50 rounded-full",
      }}
    >
      <ModalContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900">Edit product</h2>
            <p className="text-sm font-medium text-gray-400">
              Update the details for <strong>{product?.name || "this product"}</strong>.
            </p>
          </ModalHeader>

          <ModalBody className="gap-6 py-2">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    classNames={{ inputWrapper: "rounded-xl border-gray-200" }}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Price"
                    labelPlacement="outside"
                    type="number"
                    variant="bordered"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    classNames={{ inputWrapper: "rounded-xl border-gray-200" }}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    labelPlacement="outside"
                    variant="bordered"
                    selectedKeys={field.value ? [field.value] : []}
                    isInvalid={!!errors.categoryId}
                    errorMessage={errors.categoryId?.message}
                    classNames={{ trigger: "rounded-xl border-gray-200" }}
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.categoryId || cat.id} textValue={cat.categoryName || cat.name}>
                        {cat.categoryName || cat.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Image URL"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={!!errors.imageUrl}
                    errorMessage={errors.imageUrl?.message}
                    classNames={{ inputWrapper: "rounded-xl border-gray-200" }}
                  />
                )}
              />
            </div>

            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  label="Colors"
                  orientation="horizontal"
                  value={field.value}
                  onValueChange={field.onChange}
                  isInvalid={!!errors.colors}
                  errorMessage={errors.colors?.message}
                  classNames={{ label: "text-sm font-medium text-gray-700 mb-2" }}
                >
                  {["green", "gray", "red", "blue", "white"].map((c) => (
                    <Checkbox key={c} value={c} classNames={{ wrapper: "rounded-full", label: "text-xs capitalize" }}>
                      {c}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
            />

            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  label="Sizes"
                  orientation="horizontal"
                  value={field.value}
                  onValueChange={field.onChange}
                  isInvalid={!!errors.sizes}
                  errorMessage={errors.sizes?.message}
                  classNames={{ label: "text-sm font-medium text-gray-700 mb-2" }}
                >
                  {["s", "m", "l", "xl", "xxl"].map((s) => (
                    <Checkbox key={s} value={s} classNames={{ wrapper: "rounded-md", label: "text-xs uppercase" }}>
                      {s}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  classNames={{ inputWrapper: "rounded-2xl border-gray-200 min-h-[100px]" }}
                />
              )}
            />
          </ModalBody>

          <ModalFooter className="gap-3 pt-4">
            <Button
              variant="bordered"
              onPress={onClose}
              className="rounded-full px-8 font-bold text-gray-500 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="rounded-full bg-[#a3ff12] px-10 font-bold text-gray-900 shadow-sm transition hover:bg-[#92e610]"
            >
              Update product
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}