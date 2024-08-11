'use client'

import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hook/cart/useCart'

import { Button } from '../ui/button'

export const ShoppingCart = () => {
  const router = useRouter()
  const cart = useCart()

  const handleClick = () => {
    router.push('/cart')
  }

  return (
    <div className={'ml-auto flex items-center gap-x-4'}>
      <Button
        size={'sm'}
        onClick={handleClick}
        className={'rounded-full my-2'}
      >
        <ShoppingBag className={'h-5 w-5'} />
        <span className={'ml-2 text-sm font-medium text-white'}>
          {/* 顯示數量 */}
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}