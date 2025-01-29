import React, { useState } from 'react'
import { transactionTimeStamp } from '../../utils'

const FeedbackCard = ({item}) => {
    const initialLength = 75
    const [length, setLength] = useState(initialLength);

    return (
        <div className='flex items-center justify-between w-full py-3 rounded p-4'>
            <div className='flex items-start gap-x-3'>
                <div className='w-[60px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-gray-200' style={{
                        backgroundImage: `url(" ${item.feedbackBy.avatar} ")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'none'
                    }}>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-full flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-500'>{item.feedbackBy.name} | {item.feedbackBy.department}</p>
                        <p className='text-sm text-gray-400'>{transactionTimeStamp(item.date).date}</p>
                    </div>
                    <p className='text-ellipsis overflow-hidden text-sm text-gray-600'>{item.feedback.slice(0, length)}{item.feedback.length > length && <span>...</span>}</p>
                    {item.feedback.length >= length && 
                        <>
                            {length < item.feedback.length && <button className='text-xs text-gray-400 font-medium' onClick={()=>{setLength(item.feedback.length)}}>Read more</button>}
                            {length === item.feedback.length && <button className='text-xs text-gray-400 font-medium' onClick={()=>{setLength(initialLength)}}>Read less</button>}
                        </>
                    }
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default FeedbackCard