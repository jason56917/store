'use client'

import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { useCart } from '@/hook/cart/useCart'
import { cn } from '@/lib/utils'
import { ColorType, ProductType, SizeType } from '@/types'

import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
  product: ProductType
}

export const Info = ({
  product,
}: Props) => {
  const [sizeSelected, setSizeSelected] = useState<SizeType>()
  const [colorSelected, setColorSelected] = useState<ColorType>()
  const [inputAmount, setInputAmount] = useState(1)

  const cart = useCart()

  const handleAddToCart = () => {
    if (!sizeSelected || !colorSelected) {
      toast.error('尚未選擇顏色或尺寸')
    } else {
      const item = {
        product,
        size: sizeSelected,
        color: colorSelected,
        amount: inputAmount,
      }

      cart.addItem(item)
    }
  }

  return (
    <div className={'space-y-4'}>
      <h1 className={'text-3xl font-bold text-gray-900'}>
        {product.name}
      </h1>
      <div className={'flex items-end justify-between'}>
        <p className={'text-2xl text-gray-900'}>
          ${product.price}
        </p>
      </div>
      <Separator />
      <div className={'flex flex-col gap-y-6'}>
        <div className={'flex items-center gap-x-4'}>
          <h3 className={'font-semibold text-lg text-black'}>
            尺寸:
          </h3>
          {product.sizes.map((size) => (
            <Button
              key={size.id}
              size={'icon'}
              variant={'ghost'}
              onClick={() => setSizeSelected(size)}
              className={cn(
                'border border-gray-500',
                sizeSelected === size && 'ring-2 ring-offset-2 ring-black border-none'
              )}
            >
              {size.value}
            </Button>
          ))}
        </div>

        <div className={'flex items-center gap-x-4'}>
          <h3 className={'font-semibold text-lg text-black'}>
            顏色:
          </h3>
          {product.colors.map((color) => (
            <div
              key={color.id}
              onClick={() => setColorSelected(color)}
              className={cn(
                'border border-gray-500 rounded-full h-8 w-8 hover:cursor-pointer',
                colorSelected === color && 'ring-2 ring-offset-2 ring-black border-none'
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>

        <div className={'flex items-center gap-x-4'}>
          <h3 className={'font-semibold text-lg text-black'}>
            數量:
          </h3>
          <Input
            type={'number'}
            min={1}
            step={1}
            value={inputAmount}
            onChange={(e) => setInputAmount(parseInt(e.target.value))}
            className={'max-w-[70px] h-10'}
          />
        </div>
      </div>
      <div className={'mt-6 flex items-center gap-x-3'}>
        <Button
          onClick={handleAddToCart}
          className={'flex items-center gap-x-2 rounded-full'}
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  )
}