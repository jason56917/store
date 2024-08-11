'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CategoryType, ColorType, ImageType, ProductType, SizeType } from '@/types'

interface Props {
  product: ProductType & {
    images: ImageType[]
    sizes: SizeType[]
    colors: ColorType[]
    category: CategoryType
  }
}

export const ProductCard = ({
  product,
}: Props) => {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/products/${id}`)
  }
  return (
    <div
      onClick={() => handleClick(product.id)}
      className={'bg-white group cursor-pointer rounded-xl border p-3 space-y-4'}
    >
      <div className={'aspect-square rounded-xl bg-gray-100 relative'}>
        <Image
          src={product.images[0].imageUrl}
          alt={product.name}
          fill
          className={'object-cover rounded-md'}
        />
      </div>
      <div className={'flex flex-col'}>
        {/* <p className={'flex justify-center font-semibold text-lg'}>{product.category.name}</p> */}
        <div className={'flex gap-2'}>
          顏色:
          {product.colors.map((color) => (
            <div
              key={color.id}
              className={'h-5 w-5 rounded-full border'}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
        <div className={'flex gap-2'}>
          尺寸:
          {product.sizes.map((size) => (
            <div key={size.id}>
              {size.value}
            </div>
          ))}
        </div>
        <p className={'mt-2 flex justify-center'}>{product.name}</p>
        <p className={'flex justify-center'}>${product.price}</p>
      </div>
    </div>
  )
}