'use client'

import { toast } from 'sonner'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useCart } from '@/hook/cart/useCart'
import { useCheckout } from '@/hook/api/useCheckout'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'

const formSchema = z.object({
  name: z.string().min(1, { message: '請輸入至少一個字元' }),
  email: z.string().email({ message: '請輸入有效的電子信箱' }),
  phone: z.string()
    .min(1, { message: '請輸入電話號碼' })
    .regex(/^[0-9+\-]+$/, { message: '電話號碼只能包含數字、加號和減號' }),
  address: z.string().min(1, { message: '請輸入至少一個字元' }),
})

export type FormValues = z.input<typeof formSchema>

export const Summary = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const cart = useCart()
  const checkoutMutation = useCheckout()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  })

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed')
      cart.removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong!')
    }
  }, [searchParams])

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.amount)
  }, 0)

  const handleCheckout = (values: FormValues) => {
    startTransition(() => {
      checkoutMutation.mutate(
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          storeId: `${process.env.NEXT_PUBLIC_STORE_ID}`,
          orderItems: cart.items,
        },
        {
          onSuccess: () => {
            cart.removeAll()
            router.push('/')
          },
        }
      )
    })
  }

  return (
    <div className={'space-y-2 rounded-lg bg-gray-50 px-4 sm:p-6 lg:col-span-5 lg:p-8'}>
      <div className={'space-y-4'}>
        <div className={'flex items-center justify-between'}>
          <div className={'text-lg font-medium text-gray-900'}>
            Order total
          </div>
          <div className={'flex gap-2'}>
            <p>總金額:</p>
            <div className={'text-gray-500'}>
              ${totalPrice}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <h2 className={'text-lg font-medium text-gray-900'}>
        Customer Information
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCheckout)}
        >
          <FormField
            name={'name'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  姓名
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={'請輸入訂購人姓名'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'email'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  信箱
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={'email'}
                    disabled={isPending}
                    placeholder={'請輸入訂購人信箱'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'phone'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  連絡電話
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={'tel'}
                    disabled={isPending}
                    placeholder={'請輸入訂購人連絡電話'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'address'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  地址
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={'請輸入訂購人連絡地址'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className={'my-6'} />
          <Button
            disabled={cart.items.length === 0}
            className={'w-full rounded-full'}
          >
            Checkout
          </Button>
        </form>
      </Form>
    </div>
  )
}