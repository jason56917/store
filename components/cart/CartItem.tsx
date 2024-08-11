'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/hook/cart/useCart'
import { OrderType } from '@/types'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
  item: OrderType
}

export const CartItem = ({
  item,
}: Props) => {
  const cart = useCart()

  const [inputAmount, setInputAmount] = useState(item.amount)

  const handleRemove = () => {
    cart.removeItem(item.product.id, item.size.id, item.color.id)
  }

  return (
    <li className={'flex py-6 border-b'}>
      <div className={'relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'}>
        <Image
          src={item.product.images[0].imageUrl}
          alt={'Image'}
          fill
          className={'object-cover'}
        />
      </div>
      <div className={'relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'}>
        <div className={'absolute z-10 right-0 top-0'}>
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={handleRemove}
            className={'border rounded-full shadow-md'}
          >
            <X className={'h-4 w-4'} />
          </Button>
        </div>

        <div className={'flex justify-between'}>
          <div className={'h-full flex flex-col pr-9'}>
            {/* 產品名稱 */}
            <div className={'flex justify-between mb-4 text-lg font-semibold text-black'}>
              {item.product.name}
            </div>

            {/* 產品尺寸 */}
            <div className={'flex gap-2 mb-2'}>
              <p>尺寸:</p>
              <div className={'text-gray-500'}>
                {item.size.value}
              </div>
            </div>

            {/* 產品顏色 */}
            <div className={'flex gap-2 mb-2'}>
              <p>
                顏色:
              </p>
              <div
                className={'h-5 w-5 rounded-full border border-gray-600'}
                style={{ backgroundColor: item.color.value }}
              />
            </div>

            {/* 產品價錢  */}
            <div className={'flex gap-2 mb-2'}>
              <p>價錢:</p>
              <div className={'text-gray-500'}>
                ${item.product.price}
              </div>
            </div>

            {/* 產品數量 */}
            <div className={'mt-auto flex items-center gap-2'}>
              <p>數量:</p>
              <Input
                type={'number'}
                min={1}
                step={1}
                value={inputAmount}
                onChange={(e) => {
                  setInputAmount(parseInt(e.target.value))
                  cart.updateItemAmount(item, parseInt(e.target.value))
                }}
                className={'max-w-[70px]'}
              />
            </div>
          </div>

          <div className={'flex items-end gap-2 mr-6'}>
            <p>金額:</p>
            <div className={'text-gray-500'}>
              ${Number(item.product.price) * inputAmount}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}