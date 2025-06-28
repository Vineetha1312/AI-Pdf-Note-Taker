import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

function WorkspaceHeader({fileName}) {
  return (
    <div className='p-4 flex justify-between shadow-md'>
        {/* <Image src={"/V-Profile-logo.svg"} alt='logo' width={50} height={40}/> */}
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">PDF Note AI</span>
          </div>
        <h2 className="font-bold">{fileName}</h2>
        <div className="flex gap-2 items-center">
        <Button>Save</Button>
        <UserButton/>
        </div>
        
    </div>
  )
}

export default WorkspaceHeader