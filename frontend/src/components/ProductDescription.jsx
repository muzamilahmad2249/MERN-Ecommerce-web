import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-20'>
      <div className='flex gap-3 mb-4'>
        <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
      </div>
      <div className='flex flex-col pb-16'>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sit quas. Sed quidem exercitationem perspiciatis illum magni odio, fugiat eveniet, molestias veritatis nostrum atque neque aliquam repellendus maxime impedit mollitia.
        </p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi inventore maiores quia iure nemo culpa recusandae nisi sit accusamus beatae tenetur odit vitae ex, fugiat, magni dolorem, delectus aperiam.</p>
      </div>
    </div>
  )
}

export default ProductDescription
