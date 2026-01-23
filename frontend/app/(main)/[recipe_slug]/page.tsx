
import RenderMainRecipe from './_component/RenderRecipe/RenderMainRecipe'
import QuestionAsked from './_component/questions/QuestionAsked'
import Reviews from './_component/reviews/Reviews'
 
import { Suspense } from 'react'
import { getRecipeBySlug } from '@/lib/homepage/homepage.api'

/*------------------------------------
Prop = recipe's slug,
--------------------------------------*/

type Props = {
  params: Promise<{ recipe_slug: string }>
}

export default async function page({ params }: Props) {
  const { recipe_slug } = await params;

  const data_recipe  = await getRecipeBySlug({ slug: recipe_slug });


  return (
    <section className=''>
      <RenderMainRecipe slug={recipe_slug} data={data_recipe?.data} />

      <Suspense fallback={<p>Loading...</p>}>
        <QuestionAsked id={data_recipe.data._id} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Reviews id={data_recipe.data._id} />
      </Suspense>


    </section>
  )
}