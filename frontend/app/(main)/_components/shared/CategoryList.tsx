 
import Link from 'next/link'
type Props = {}

export default function CategoryList({ }: Props) {
     return (
          <div className='border-b border-ONE/20  pb-2 flex flex-row justify-between'>
               {
                    [0, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>
                         <Link href='/recipes/this-is-category'  key={index} className=' hov   font-normal uppercase tracking-[1px]'>category</Link>
                    )
               }
          </div>
     )
}