"use client"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useState } from 'react'

const LatestInterviewsList = () => {
    const [interviewList, setInterviewList] = useState([])
  return (
    <div className='my-5'>
     <h2 className='font-bold text-2xl '>Previously Created Interviews</h2>
     {interviewList.length === 0 && (
        < div className='flex flex-col gap-3  items-center bg-white p-5 rounded-lg shadow-md'>
            <Video className='text-primary p-3 bg-blue-50 rounded-lg size-14' />
            <h2 className='font-bold text-xl'>No Interviews Found!</h2>
            <Button className='bg-primary text-white px-5 py-2 rounded-lg'>Create Interview</Button>
        </div>
     )}
     {interviewList.length > 0 && (
        <div className='flex flex-col gap-3'>
            {/* <InterviewCard /> */}
           
        </div>
     )
    }
    </div>
  )
}

export default LatestInterviewsList