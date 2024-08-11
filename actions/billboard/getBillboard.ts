'use server'

import { BillboardType } from '@/types'

export async function getBillboard(): Promise<BillboardType | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/billboards/${process.env.NEXT_PUBLIC_BILLBOARD_ID}`, {
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