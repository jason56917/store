'use client'

import Link from 'next/link'
import { MainNav } from './MainNav'
import { CategoryType } from '@/types'

import { Container } from './Container'
import { ShoppingCart } from './ShoppingCart'

interface Props {
  categories?: CategoryType[]
}

export const Navbar = ({
  categories,
}: Props) => {
  return (
    <div className={'border-b'}>
      <Container>
        <div className={'relative flex px-4 sm:px-6 lg:px-8 h-1/6 items-center'}>
          <Link
            href={'/'}
            className={'ml-4 flex lg:ml-0 gap-x-2'}
          >
            <p className={'font-bold text-xl'}>
              Store
            </p>
          </Link>
          {categories && (
            <MainNav categories={categories} />
          )}
          <div className={'flex gap-2 ml-auto'}>
            <ShoppingCart />
          </div>
        </div>
      </Container>
    </div>
  )
}