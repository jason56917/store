import { getBillboard } from '@/actions/billboard/getBillboard'
import { getProductsByStoreId } from '@/actions/products/getProductsByStoreId'

import { Banner } from '@/components/layout/Banner'
import { Container } from '@/components/layout/Container'
import { ProductList } from '@/components/products/ProductList'

export default async function Home() {
  const billboard = await getBillboard()
  const products = await getProductsByStoreId()

  return (
    <Container>
      <Banner imageUrl={billboard?.imageUrl} />
      <div className={'flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pb-24'}>
        {products && (
          <ProductList
            title='Featured Products'
            products={products}
          />
        )}
      </div>
    </Container>
  )
}
