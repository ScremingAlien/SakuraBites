import React from 'react'
/*------------------------------------
Recipe category by category slug
--------------------------------------*/





type Props = {
  params: Promise<{ category: string }>
}
export default async function page({ params }: Props) {

  const { category } = await params

  return (
    <section>
      <div className=' rounded-2xl bg-ONE p-16 space-y-5'>
        <h2>
          {category}
        </h2>
        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, praesentium?</h4>
      </div>
      <br />
      page should include
      <br />

      1. header with category name, with some description
      <br />
      2. most popular recipes any 4 or 8
      <br />
      3. most revied recipes
      <br />
      4. then all recipe with pagination
    </section>
  )
}