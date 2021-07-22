import React, { Fragment } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DashboardPage from '../../pages/DashboardPage'

import { useState, useEffect } from 'react'
import ModalForm from '../modal/Login'


const ProtectedRoute = ({isAdmin,component : Component,...rest}) => {
    const [showModal, setShowModal] = useState(false)
    const { authenticate,user, loading } = useSelector(state => state.auth)
    const history = useHistory()
    const handleCloseProtect = () => {
        history.push('/')
    }
 

    useEffect(() => {
        if (!authenticate) {
            
            setShowModal(true)
        }
      }, [authenticate]);
    return (
        <Fragment>
            
         
                <Route
                    {...rest}
                    render={props => {
                    
                        if (!authenticate) {
                            return (
                                <>
                                     <DashboardPage  /> 
                                <ModalForm
                                visible={showModal}
                                showModal={showModal}
                                handleClose={handleCloseProtect}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
           
                                />
                        
                                </>
                            )
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect to="/" />
                        }

                        
                        return <Component {...props} />
                    }}
                />
            
        </Fragment>
    )
}

export default ProtectedRoute