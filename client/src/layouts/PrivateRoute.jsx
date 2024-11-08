import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

export default function PrivateRoute({isAuthenticated, children}){
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    
    return children
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}