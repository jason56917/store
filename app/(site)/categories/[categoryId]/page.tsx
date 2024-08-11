import { getCategoryById } from '@/actions/categories/getCategoryById'
import { getSizesByStoreId } from '@/actions/sizes/getSizesByStoreId'
import { getColorsByStoreId } from '@/actions/colors/getColorsByStoreId'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Filter } from '@/components/categories/Filter'
import { Banner } from '@/components/layout/Banner'
import { NoResults } from '@/components/products/NoResults'
import { ProductCard } from '@/components/products/ProductCard'
import { Container } from '@/components/layout/Container'

interface Props {
  params: {
    categoryId: string
  },
  searchParams: {
    sizeId: string
    colorId: string
  }
}

export default async function CategoryIdPage({
  params,
  searchParams,
}: Props) {
  const category = await getCategoryById(params.categoryId)
  const sizes = await getSizesByStoreId()
  const colors = await getColorsByStoreId()

  const filteredProducts = category?.products.filter((product) => {
    if (searchParams.sizeId && searchParams.colorId) {
      return product.sizes.some((size) => size.id === searchParams.sizeId)
        && product.colors.some((color) => color.id === searchParams.colorId)
    } else if (searchParams.sizeId) {
      return product.sizes.some((size) => size.id === searchParams.sizeId)
    } else if (searchParams.colorId) {
      return product.colors.some((color) => color.id === searchParams.colorId)
    }
    return true
  }
  )

  return (
    <Container>
      <Banner imageUrl={category?.imageUrl} />

      <div className={'px-4 sm:px-6 lg:px-8 pb-24'}>
        <div className={'lg:grid lg:grid-cols-5 lg:gap-x-8'}>
          {/* 手機模式 */}
          <Sheet>
            <SheetTrigger
              asChild
              className={'lg:hidden'}
            >
              <Button
                size={'sm'}
              >
                篩選+
              </Button>
            </SheetTrigger>
            <SheetContent className={'flex flex-col'}>
              <Filter
                name={'選擇尺寸'}
                queryName={'sizeId'}
                data={sizes}
              />
              <Filter
                name={'選擇顏色'}
                queryName={'colorId'}
                data={colors}
              />
            </SheetContent>
          </Sheet>

          {/* 桌機模式 */}
          <div className={'hidden lg:flex flex-col'}>
            <Filter
              name={'選擇尺寸'}
              queryName={'sizeId'}
              data={sizes}
            />
            <Filter
              name={'選擇顏色'}
              queryName={'colorId'}
              data={colors}
            />
          </div>

          <div className={'mt-6 lg:col-span-4 lg:mt-0'}>
            {filteredProducts?.length === 0 && (
              <NoResults />
            )}
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}