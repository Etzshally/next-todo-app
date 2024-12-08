"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

const UserAccNav = () => {
  return (
    <Button onClick={() => signOut({
        redirect:true,
        callbackUrl:`${window.location.origin}/sign-in`
    })} variant='destructive'>
    Logout
  </Button>
  )
}

export default UserAccNav