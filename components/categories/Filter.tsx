'use client'

import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ColorType, SizeType } from '@/types'

import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

interface Props {
  name: string
  queryName: string
  data: SizeType[] | ColorType[]
}

export const Filter = ({
  name,
  queryName,
  data,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectValue = searchParams.get(queryName)

  const handleSelect = (id: string) => {
    const current = queryString.parse(searchParams.toString())

    const query = {
      ...current,
      [queryName]: id,
    }

    if (current[queryName] === id) {
      query[queryName] = null
    }

    const url = queryString.stringifyUrl({
      url: pathname,
      query,
    }, { skipNull: true })

    router.push(url)
  }

  return (
    <div className={'mb-8 mx-4 flex flex-col space-y-4'}>
      <h3 className={'text-lg font-semibold'}>
        {name}
      </h3>
      <Separator />
      <div className={'flex flex-wrap gap-2'}>
        {data.map((filter) => (
          <div
            key={filter.id}
            className={'flex items-center'}
          >
            <Button
              variant={'ghost'}
              onClick={() => handleSelect(filter.id)}
              className={cn(
                'rounded-full border',
                selectValue === filter.id && 'bg-black text-white'
              )}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}