import { Suspense } from 'react'
import LoadingRender from './_components/LoadingRender'
import ExploreCategorysRender from './_components/ExploreCategorysRender'

type Props = {}

export default function ExploreCategorys({ }: Props) {
     return (
          <div className=" space-y-8">
               <header>
                    <h2>Explore Categories</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, nam?</p>
               </header>

               <Suspense fallback={<LoadingRender />}>
                    <ExploreCategorysRender />
               </Suspense>

          </div>
     )
}