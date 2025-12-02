// Cart API helper functions

export interface CartItemData {
  productId: number;
  quantity: number;
  attributes?: string[];
}

export async function fetchCart() {
  const response = await fetch("/api/cart");
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
}

export async function addToCartAPI(data: CartItemData) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }
  return response.json();
}

export async function updateCartItemAPI(cartItemId: number, quantity: number) {
  const response = await fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId, quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart");
  }
  return response.json();
}

export async function removeFromCartAPI(cartItemId: number) {
  const response = await fetch(`/api/cart?itemId=${cartItemId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove from cart");
  }
  return response.json();
}
