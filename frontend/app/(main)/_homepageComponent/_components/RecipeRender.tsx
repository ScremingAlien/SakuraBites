import { getQuickPicks } from '@/lib/homepage/homepage.api'
import Link from 'next/link';

type Props = {}

export default async function RecipeRender({ }: Props) {

     const { data } = await getQuickPicks();
     return (
          <div className=' grid grid-cols-4'>
               {
                    data?.map((recipe, index: number) =>
                    (
                         <Link href={`/${recipe.slug}`}
                              key={index}
                              className={`bb hover:underline`}>
                              {recipe.title}
                              <br />
                              {recipe.difficulty}
                         </Link>
                    ))
               }

          </div>
     )
}