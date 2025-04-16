import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const InterviewCard = ({interview}) => {
   
    const timeFormater = (time) => {
        const date = new Date(time)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);

    }
    const copyLink = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL+`/interview/${interview?.interview_id}`
        navigator.clipboard.writeText(url) 
       toast.success('Link copied to clipboard')
    }
    const handleShare = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL+`/interview/${interview?.interview_id}`
        if (navigator.share) {
            navigator.share({
                title: 'Interview Link',
                text: 'Join the interview',
                url: url,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            copyLink()
            toast.error('Your browser does not support sharing')
        }

    }
  return (
    
    <div className="flex flex-col  bg-white rounded-lg shadow-md  hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

      <div className="flex flex-col p-4 leading-normal">
       <div className='flex items-center justify-between w-full'> <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{interview?.jobPosition}</h5>
       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{timeFormater(interview?.created_at)}</p></div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 border border-gray-300 rounded-lg p-2 max-h-40 overflow-auto">{interview?.jobDescription}</p>
      </div>
      <p className=' text-gray-700 dark:text-gray-400 px-5'>{interview?.interviewDuration}</p>
      <div className='flex items-end justify-between p-2 gap-2 w-full  h-full'>
        <Button variant={"outline"} onClick={()=>copyLink()}  className="cursor-pointer"> <Copy /> Copy Link</Button>
        <Button className="cursor-pointer" onClick={()=>handleShare()} >Send Link</Button>
      </div>
    </div>
  )
}

export default InterviewCard