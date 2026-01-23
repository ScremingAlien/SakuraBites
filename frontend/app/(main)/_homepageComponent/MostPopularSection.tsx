import { Suspense } from "react"
import LoadingRender from "./_components/LoadingRender"
import MostPopularRecipeRender from "./_components/MostPopularRecipeRender"

type Props = {}

export default function MostPopularSection({ }: Props) {
     return (
          <div className=" space-y-8">
               <header>
                    <h2>Get our Most popular recipes</h2>
                    <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, amet! amet consectetur adipisicing elit. Maiores, nam?</p>
               </header>

               <Suspense fallback={<LoadingRender />}>
                    <MostPopularRecipeRender />
               </Suspense>

          </div>
     )
}