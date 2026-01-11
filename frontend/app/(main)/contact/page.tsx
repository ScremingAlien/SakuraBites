import React from 'react'

type Props = {}

/*------------------------------------
show data about this project and by whome this was created with what motive
--------------------------------------*/

export default function page({ }: Props) {
  return (
    <section className=' space-y-12'>
      <div className=' bg-ONE p-16 rounded-2xl'>
        <h2>Get in touch <br /> <span className=' text-THREE'>with</span> Us</h2>
      </div>
      <div className='  flex flex-row  justify-between'>

        <div className=' pt-4'>
          <h2>Send <span className=' text-THREE'>Us</span> <br />  A message</h2>

        </div>

        <div className=' border'>
          input wala div
        </div>
      </div>
    </section>
  )
}