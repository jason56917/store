import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { OrderType } from '@/types'

interface DataType {
  name: string;
  email: string;
  phone: string;
  address: string;
  storeId: string;
  orderItems: OrderType[];
}

export const useCheckout = () => {
  const mutation = useMutation({
    mutationFn: async (data: DataType) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`Internal error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('訂單已訂購')
    },
    onError: (error: Error) => {
      toast.error(`訂購失敗: ${error.message}`)
    },
  })

  return mutation
}