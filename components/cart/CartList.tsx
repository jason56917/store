'use client'

import { useCart } from '@/hook/cart/useCart'

import { CartItem } from './CartItem'

export const CartList = () => {
  const cart = useCart()

  return (
    <div>
      {cart.items.length === 0 && (
        <p className={'text-neutral-500'}>
          No items ad to cart.
        </p>
      )}
      <ul>
        {cart.items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
          />
        ))}
      </ul>
    </div>
  )
}