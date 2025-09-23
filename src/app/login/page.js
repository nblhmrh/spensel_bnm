'use client'
import React from 'react'
import {useAuth} from '@/context/authContext'
import { Button, TextField } from '@mui/material'

function page() {
  const {login}=useAuth()
  const [form,setForm]=React.useState({
    email:'',
    password:'',
  })
  const[error,setError]=React.useState('')
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await login(form)
    }catch(error){
      setError(error.response.data.message)
    }
  }
  return (
    <>
      <div className='h-screen justify-center items-center'>
        <div className='w=[500px] border shadow-md'>
            <div className='text-center'>
              <span className='text-2xl font-bold'>login</span>
              <form className='p-2' onSubmit={handleSubmit}>
                  <TextField label='email' name='email' onChange={handleChange} variant='outlined' fullWidth/>                  
                  <TextField label='password' name='password'sx={{marginTop:2, marginBottom:2}} onChange={handleChange} variant='outlined' fullWidth/>
                  <Button type='submit' fullWidth variant='contained'>Login</Button>
              </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default page