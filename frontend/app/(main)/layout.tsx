import {ReactNode} from 'react'

type Props = {
     children: ReactNode
}

export default function layout({children}: Props) {
  return (
    <div className=' font-sansita text-3xl '>
     Main layout
     {children}
    </div>
  )
}