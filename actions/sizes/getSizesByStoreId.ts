'use server'

import { SizeType } from '@/types'

export async function getSizesByStoreId(): Promise<SizeType[] | []> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${process.env.NEXT_PUBLIC_STORE_ID}/sizes`)
    if (!response.ok) {
      throw new Error(`API 回應錯誤: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data) {
      return []
    }

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}