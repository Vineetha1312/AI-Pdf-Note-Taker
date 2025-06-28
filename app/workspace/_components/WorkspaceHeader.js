import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function WorkspaceHeader({fileName}) {
  return (
    <div className='p-4 flex justify-between shadow-md'>
        <Image src={"/V-Profile-logo.svg"} alt='logo' width={50} height={40}/>
        <h2 className="font-bold">{fileName}</h2>
        <div className="flex gap-2 items-center">
        <Button>Save</Button>
        <UserButton/>
        </div>
        
    </div>
  )
}

export default WorkspaceHeader