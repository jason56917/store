'use server'

import { CategoryType, StoreType } from '@/types'

export async function getStore(): Promise<StoreType & {
  categories: CategoryType[]
} | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${process.env.NEXT_PUBLIC_STORE_ID}`)
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