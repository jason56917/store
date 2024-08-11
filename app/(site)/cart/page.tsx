import { CartList } from '@/components/cart/CartList'
import { Summary } from '@/components/cart/Summary'
import { Suspense } from 'react'

export default async function CartPage() {
  return (
    <div className={'mx-auto max-w-7xl'}>
      <div className={'px-4 py-16 sm:px-6 lg:px-8'}>
        <h1 className={'text-3xl font-bold text-black'}>
          Shopping Cart
        </h1>
        <div className={'mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'}>
          <div className={'lg:col-span-7'}>
            <CartList />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Summary />
          </Suspense>
        </div>
      </div>
    </div>
  )
}