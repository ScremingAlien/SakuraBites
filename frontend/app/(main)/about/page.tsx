import React from 'react'

type Props = {}

/*------------------------------------
show data about this project and by whome this was created with what motive
--------------------------------------*/

export default function page({ }: Props) {
  return (
    <section>

    <div className=' bg-ONE p-16 rounded-2xl'>
        <h2 className=' '> About Our <br />  <span className=' text-THREE'>Culinary</span>  Stories</h2>
      </div>
      some image --

      <div className=' minidiv space-y-5'>
        <h2 className=' text-center'>Our  <span className=' text-THREE'>Team</span> </h2>
        <p className=' text-center text-lg'>
          We have an entire team of geniuses behind us at SukraBites who are experts in a little bit of everything – from customer service, to social media, to videography, to assisting with recipe shoots. They are EVERYTHING.
        </p>
        <p className=' text-center text-lg'>
          Our team helps keep it all running smoothly.
        </p>
      </div>
    </section>
  )
}