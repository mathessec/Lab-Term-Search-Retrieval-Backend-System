import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
function protectedRouter({children}) {
    let token =sessionStorage.getItem("token")

   return token ? children: <Navigate to='/login'/>
}

export default protectedRouter