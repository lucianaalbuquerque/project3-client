import { useState, useEffect } from 'react'
import axios from 'axios'

function ProfileEditPage() {
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>Add info about your brand
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder="write about your brand" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" name="logoUrl" placeholder="your logo here" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default ProfileEditPage