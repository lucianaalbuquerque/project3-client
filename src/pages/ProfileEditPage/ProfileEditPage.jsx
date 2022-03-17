import { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';

function ProfileEditPage() {
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='about'>
       <h3>Add info about your brand</h3> 
      <form onSubmit={handleSubmit}>
        <TextField size="small"  type="text" name="description" placeholder="write about your brand" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <TextField size="small"  type="text" name="logoUrl" placeholder="your logo here" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default ProfileEditPage