
import {   getMostPopular } from '@/lib/homepage/homepage.api'
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

export default async function MostPopularRecipeRender({ }: Props) {

     const { data } = await getMostPopular();
     
     return (
          <div className=' grid grid-cols-4 gap-5'>
               {
                    data?.map((recipe, index: number) =>
                    (<div key={index} className='  space-y-1'>
                         <div className=' relative aspect-4/3'>
                              <Image src={recipe.coverImage} alt={recipe.title} fill className=' w-full h-full object-cover rounded-md' />
                         </div>

                         <Link href={`/${recipe.slug}`}   >
                              <span className={` font-garamond text-2xl  hover:underline underline-offset-[5px] decoration-THREE duration-300   tracking-wide decoration-1 cursor-pointer`}>
                                   {recipe.title}
                              </span>
                              <br />
                              <span className='  text-black/60 text-[15px] '>
                                   Difficulty - <span className=' uppercase text-sm text-black  font-medium'>{recipe.difficulty}</span>
                              </span>
                         </Link>
                    </div>
                    ))
               }

          </div>
     )
}