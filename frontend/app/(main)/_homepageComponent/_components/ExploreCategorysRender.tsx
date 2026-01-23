import { getCategoryHighlight } from '@/lib/homepage/homepage.api'
import Link from 'next/link';

type Props = {}

export default async function ExploreCategorysRender({ }: Props) {

     const { data } = await getCategoryHighlight();


     return (
          <div className=' grid grid-cols-4 gap-5'>
               {
                    data?.map((recipe, index: number) =>
                    (<div key={index} className='  space-y-1'>
                         <Link href={`/${recipe.name}`}   >
                              <span className={` font-garamond text-3xl  hover:underline underline-offset-[5px] decoration-THREE duration-300   tracking-wide decoration-1 cursor-pointer`}>
                                   {recipe.name}
                              </span>
                              <br />
                              <p className=''> <span className=' text-THREE font-semibold'>{recipe.recipeCount} + </span>recipes</p>
                              <p>{recipe.description}</p>
                              
                         </Link>
                    </div>
                    ))
               }

          </div>
     )
}