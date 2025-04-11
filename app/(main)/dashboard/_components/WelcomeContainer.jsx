"use client"
import { useUser } from '@/app/provider'
import React from 'react'

const WelcomeContainer = () => {
    const {user} = useUser()
  return (
    <div>
        <h1 className='text-3xl font-bold'>Welcome {user?.name}</h1>
    </div>
  )
}

export default WelcomeContainer