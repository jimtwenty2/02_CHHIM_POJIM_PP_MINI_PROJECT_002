"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { deleteProductAction } from "@/action/product.action";
import { toast } from "sonner";

export default function DeleteProductModal({ isOpen, onClose, product }) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!product?.productId) return;

    setIsDeleting(true);
    try {
      const result = await deleteProductAction(product.productId);
      if (result.success) {
        toast.success("Product deleted successfully");
        onClose();
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      radius="2xl"
      hideCloseButton
    >
      <ModalContent className="p-4 rounded-2xl">
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900">Delete product?</h2>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-500">
            This will remove{" "}
            <span className="font-bold text-gray-800">
              {product?.name || product?.productName}
            </span>
            .
          </p>
        </ModalBody>
        <ModalFooter className="justify-end gap-3">
          <Button
            variant="light"
            onPress={onClose}
            className="font-bold text-gray-600"
          >
            Cancel
          </Button>
          <Button
            isLoading={isDeleting}
            onPress={handleDelete}
            className="bg-[#ffe4e9] font-bold text-[#ff4d6d] hover:bg-[#ffccd5] rounded-xl px-8"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
