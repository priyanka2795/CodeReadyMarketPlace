import React, {useEffect} from 'react'
import AuthorHeader from './AuthorHeader'
import MyProducts from './MyProducts'

function AuthorDashboard() {
  useEffect(()=>{
    window.scrollTo(0, 0)
  })
  return (
    <div>
      <AuthorHeader/>
      <MyProducts/>
    </div>
  )
}

export default AuthorDashboard