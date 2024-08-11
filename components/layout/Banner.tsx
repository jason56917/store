'use client'

import Image from 'next/image'

interface Props {
  imageUrl?: string
}

export const Banner = ({
  imageUrl,
}: Props) => {
  if (!imageUrl) return
  return (
    <div className={'relative aspect-square md:aspect-[2.4/1] rounded-xl overflow-hidden'}>
      <Image
        src={imageUrl}
        alt={'Banner'}
        fill
        className={'p-4 sm:p-6 lg:p-8 object-cover'}
      />
    </div>
  )
}