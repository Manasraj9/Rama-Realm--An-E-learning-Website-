import React from 'react'
import Card, { CardContent } from '../ui/card'
import {Avatar} from '../ui/avatar'
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Badge} from '../ui/badge'

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg h-[19rem] bg-slate-200 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className='mb-3'>
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="course"
          className='w-full h-36 object-cover rounded-t-lg'
        />
      </div>
      <CardContent>
        <h3 className='hover:underline font-bold text-lg truncate mb-3'>Nextjs Complete Course in Hindi 2024</h3>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <h2 className='font-robert-regular text-sm'>John Doe</h2>
          </div>
          <Badge className={'bg-violet-300 text-white font-medium font-circular-web py-2 px-4 shadow-lg rounded-full block hover:text-violet-500 md:inline-block mx-auto md:mx-0'}>
            interactive
          </Badge>
        </div>
        <div className='mt-3 hover:underline text-sm font-circular-web'>
          <h2>A interactive course by John Doe. Where you can learn new skills and knowledge</h2>
        </div>
      </CardContent>
    </Card>
  )
}

export default Course
