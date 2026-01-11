import React from 'react'

/*------------------------------------
User by slug
--------------------------------------*/

type Props = {
  params: Promise<{ slug: string }>
}
export default async function page({ params }: Props) {
  const { slug } = await params;
  return (
    <section>
      {slug}
      - userpage

      <br />


      <h5 className=' font-garamond  text-4xl'>Focaccia Grinder Sandwich</h5>

    </section>
  )
}