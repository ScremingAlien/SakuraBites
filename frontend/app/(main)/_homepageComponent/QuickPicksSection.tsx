import { Suspense } from "react"
import RecipeRender from "./_components/RecipeRenderQuickPicks"
import LoadingRender from "./_components/LoadingRender"

type Props = {}

export default function QuickPicksSection({ }: Props) {
     return (
          <div className=" space-y-8">
               <header>
                    <h2>Quick Picks</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, nam?</p>
               </header>

               <Suspense fallback={<LoadingRender />}>
                    <RecipeRender />
               </Suspense>

          </div>
     )
}