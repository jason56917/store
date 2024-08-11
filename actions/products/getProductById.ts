'use server'

import { CategoryType, ColorType, ImageType, ProductType, SizeType } from '@/types'

export async function getProductById(
  id: string
): Promise<ProductType & {
  images: ImageType[]
  sizes: SizeType[]
  colors: ColorType[]
  category: CategoryType
} | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
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