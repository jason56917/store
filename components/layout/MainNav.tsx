'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CategoryType } from '@/types'

interface Props {
  categories: CategoryType[]
}

export const MainNav = ({
  categories,
}: Props) => {
  const pathname = usePathname()

  const routes = categories.map((category) => ({
    href: `/categories/${category.id}`,
    name: category.name,
    active: pathname === `/categories/${category.id}`,
  }))

  return (
    <nav className={'mx-6 flex items-center space-x-4 lg:space-x-6'}>
      {routes.map((route: { href: string; name: string; active: boolean }) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-black',
            route.active
              ? 'text-black'
              : 'text-neutral-500'
          )}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  )
}