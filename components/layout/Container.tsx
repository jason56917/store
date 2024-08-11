'use client'

interface Props {
  children: React.ReactNode
}

export const Container = ({
  children,
}: Props) => {
  return (
    <div className={'mx-auto max-w-3xl'}>
      {children}
    </div>
  )
}