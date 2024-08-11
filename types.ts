// 從getCategories()取得的資料顯示有以下屬性
// id、createdAt、updatedAt、name、storeId、billboardId
// 但在此不需要全部都定義出來
// 只對需要的屬性定義即可
export interface StoreType {
  id: string
  name: string
  categories: CategoryType[]
  products: ProductType[]
}

export interface BillboardType {
  id: string
  name: string
  imageUrl: string
}

export interface CategoryType {
  id: string
  name: string
  imageUrl: string
}

// 從後端網站取得資料後使用console.log來分析屬性
// 再來寫上屬性名稱及其定義
// 寫上會使用到的屬性即可
export interface SizeType {
  id: string
  name: string
  value: string
}

export interface ColorType {
  id: string
  name: string
  value: string
}

export interface ImageType {
  id: string
  imageUrl: string
}

export interface ProductType {
  id: string
  category: CategoryType
  name: string
  price: string
  isFeatured: boolean
  sizes: SizeType[]
  colors: ColorType[]
  images: ImageType[]
}

export interface OrderType {
  product: ProductType
  size: SizeType
  color: ColorType
  amount: number
}

export interface UserType {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string | null
  email: string | null
  emailVerified: Date | null
  hashedPassword: string | null
  image: string | null
}
