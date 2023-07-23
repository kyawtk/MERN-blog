
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protect = ({children}) => {
    const {userInfo} = useSelector(state=> state.auth)
if(!userInfo){
    return <Navigate to='/login' replace></Navigate>
}
  return children
}

export default Protect