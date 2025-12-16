// src/components/cart/CartItems.jsx
import { ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";

export default function CartItems({ cart, onRemoveItem, onChangeQty }) {
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
        <p>Bag is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cart.map((item, idx) => {
        let maxQty = null;

        if (item.product.type === "ready_to_wear" && item.product.sizes) {
          const sizeEntry = item.product.sizes.find(
            (s) => s.size === item.size
          );
          if (sizeEntry && Number.isFinite(sizeEntry.stock)) {
            maxQty = sizeEntry.stock;
          }
        }

        return (
          <CartItem
            key={`${item.product.id}-${item.size}`}
            item={item}
            index={idx}
            maxQty={maxQty}
            onRemove={onRemoveItem}
            onChangeQty={onChangeQty}
          />
        );
      })}
    </div>
  );
}
