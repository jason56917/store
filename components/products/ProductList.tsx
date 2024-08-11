'use client'

import { CategoryType, ColorType, ImageType, ProductType, SizeType } from '@/types'

import { NoResults } from './NoResults'
import { ProductCard } from './ProductCard'

interface Props {
  title: string
  products: (ProductType & {
    images: ImageType[]
    sizes: SizeType[]
    colors: ColorType[]
    category: CategoryType
  })[]
}

export const ProductList = ({
  title,
  products,
}: Props) => {
  return (
    <div className={'space-y-4'}>
      <h3 className={'font-bold text-3xl'}>
        {title}
      </h3>
      {products && products.length === 0 && (
        <NoResults />
      )}
      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {products && products.length !== 0 && products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}