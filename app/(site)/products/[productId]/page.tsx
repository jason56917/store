import { getProductById } from '@/actions/products/getProductById'
import { getProductsByCategoryId } from '@/actions/products/getProductsByCategoryId'

import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/layout/Container'
import { Gallery } from '@/components/products/Gallery'
import { Info } from '@/components/products/Info'
import { ProductList } from '@/components/products/ProductList'

interface Props {
  params: {
    productId: string
  }
}

export default async function ProductIdPage({
  params,
}: Props) {
  const product = await getProductById(params.productId)
  const sameCategoryProducts = await getProductsByCategoryId(product?.category.id)
  const relatedProducts = sameCategoryProducts.filter((sameCategoryProduct) => sameCategoryProduct.id !== product?.id)

  return (
    <div className={'bg-white'}>
      <Container>
        <div className={'px-4 py-10 sm:px-6 lg:px-8'}>
          <div className={'lg:grid grid-cols-2 lg:items-start lg:gap-x-8'}>
            <div>
              {product && (
                <Gallery images={product.images} />
              )}
            </div>
            <div className={'mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'}>
              {product && (
                <Info product={product} />
              )}
            </div>
          </div>
          <Separator className={'my-6'} />
          <ProductList
            title={'Related products'}
            products={relatedProducts}
          />
        </div>
      </Container>
    </div>
  )
}