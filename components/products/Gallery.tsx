'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageType } from '@/types'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

interface Props {
  images: ImageType[]
}

export const Gallery = ({
  images,
}: Props) => {
  const [selectImage, setSelectImage] = useState(images[0].id)

  const handleSelect = (imageId: string) => {
    setSelectImage(imageId)
  }

  return (
    <Tabs
      defaultValue={images[0].id}
      className={'w-full flex flex-col-reverse relative'}
    >
      <TabsList className={'grid grid-cols-4 gap-2 mt-6 h-full w-full bg-inherit'}>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'relative rounded-md aspect-square items-center justify-center',
              selectImage === image.id && 'ring-2 ring-black ring-offset-2'
            )}
          >
            <TabsTrigger
              value={image.id}
              onClick={() => handleSelect(image.id)}
            >
              <Image
                src={image.imageUrl}
                alt={'Image'}
                fill
                className={'rounded-lg object-cover'}
              />
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <div className={'w-full'}>
        <div className={'relative aspect-square'}>
          {images.map((image) => (
            <TabsContent
              key={image.id}
              value={image.id}
            >
              <Image
                src={image.imageUrl}
                alt={'Image'}
                fill
                className={'rounded-lg object-cover'}
              />
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  )
}