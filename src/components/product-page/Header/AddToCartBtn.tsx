"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";
import { trackAddToCart } from "@/lib/analytics";

type Props = {
  data: Product & { quantity: number };
  disabled?: boolean;
};

const AddToCartBtn = ({ data, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const handleClick = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: [sizeSelection, colorSelection.name],
        discount: data.discount,
        quantity: data.quantity,
      })
    );

    trackAddToCart({
      item_id: data.id,
      item_name: data.title,
      price: data.price,
      quantity: data.quantity,
    });
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className="bg-sky-500 hover:bg-sky-600 w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white transition-all disabled:opacity-60"
      onClick={handleClick}
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
