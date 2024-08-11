'use server'

import { CategoryType, ColorType, ImageType, ProductType, SizeType } from '@/types'

export async function getCategoryById(
  id: string
): Promise<(CategoryType & {
  products: (ProductType & {
    images: ImageType[]
    sizes: SizeType[]
    colors: ColorType[]
  })[]
}) | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      next: { revalidate: 0 },
    })
    if (!response.ok) {
      throw new Error(`API 回應錯誤: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data) {
      return null
    }

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}