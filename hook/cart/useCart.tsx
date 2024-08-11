import { toast } from 'sonner'
import { create } from 'zustand'
// persist用於在狀態中實現持久化。
// 這意味著購物車的狀態將在瀏覽器的 localStorage 中儲存，
// 以便即使在頁面刷新後也能保留購物車內容

// 使用 createJSONStorage 來設定 persist 中的持久化存儲
// 將購物車的狀態儲存在瀏覽器的 localStorage 中，以便在頁面刷新後保留購物車內容。
// 這個設定指定了 localStorage 作為存儲介面。
import { persist, createJSONStorage } from 'zustand/middleware'
import { OrderType } from '@/types'

interface Cart {
  items: OrderType[]
  addItem: (data: OrderType) => void
  updateItemAmount: (data: OrderType, amount: number) => void
  removeItem: (id: string, size: string, color: string) => void
  removeAll: () => void
}

export const useCart = create(
  persist<Cart>(
    // 使用set和get針對CartStore每個狀態和動作進行設定或獲取狀態
    (set, get) => ({
      // 項目陣列: 給予購物車預設空陣列
      items: [],
      // 增加項目
      addItem: (data: OrderType) => {
        // 先使用get()來取得目前的items項目
        const currentItems = get().items
        // 再來比對現有的items項目是否與要增加的項目重複
        // 保留重複項目
        const existingItem = currentItems.find(
          (item) =>
            item.product.id === data.product.id
            && item.size.id === data.size.id
            && item.color.id === data.color.id
        )

        // 如果相同的條件就顯示已存在
        if (existingItem) {
          return toast.error('Item already in cart.')
        }

        // 將要增加的項目加入的項目陣列
        set({ items: [...currentItems, data] })
        toast.success('Item added to cart.')
      },

      // 更新項目數量
      updateItemAmount: (data: OrderType, amount: number) => {
        const currentItems = get().items
        set({
          items: [
            ...currentItems.map((item) => {
              if (
                item.product.id === data.product.id
                && item.size.id === data.size.id
                && item.color.id === data.color.id
              ) {
                return { ...item, amount: amount }
              }
              return item
            })
          ],
        })
      },

      // 移除單個項目
      removeItem: (id: string, size: string, color: string) => {
        const currentItems = get().items
        // 比對是否有重複項目，保留不重複項目
        set({
          items: [
            ...currentItems.filter(
              (item) =>
                // 疑問: 應該用&&，但反而是使用||才能正確移除
                // 解答: 在保留元素當中，
                // 使用|| 只要符合其中一個條件就可以保留
                // 使用&& 則會變成須滿足全部的條件才能保留，則會造成全部項目都被移除
                item.product.id !== id
                || item.size.id !== size
                || item.color.id !== color
            )
          ],
        })
        toast.success('Item removed from the cart.')
      },

      // 清空項目陣列
      removeAll: () => set({ items: [] }),
    }),
    // 以下為persist 函數的配置，
    // 指定了持久化存儲的名稱為 'CartStorage'，
    // 並使用createJSONStorage來將購物車狀態儲存在瀏覽器的localStorage中
    {
      name: 'CartStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
