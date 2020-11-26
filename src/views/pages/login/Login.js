import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { isAuth } from '../../../Auth/Auth';
import {LoginValidate} from '../../../validate/LoginValidate'
import Axios from 'axios';
import  Config  from '../../../config';

const Login = () => {
  const isAuthenticated=isAuth();
   const [data,setData]=useState({});
   const [error,setError]=useState({})
   const validate=LoginValidate;
   const history=useHistory()
   
  if(isAuthenticated){
    return <Redirect  to="/" />
  }

  const handleSubmit=(event)=>{
      event.preventDefault();
      setError(validate(data))
      console.log(error)
      if(error.success==true){
        Axios.post(`${Config.baseApi}/account/signin`, {
           username:data.userName ,
           password:data.password
       }).
       then(response=>{
         if(response.status!==200){
           setError({success:false,error:'User dose not exist'})
           return;
         }
         localStorage.setItem("w_auth", JSON.stringify(response.data));
         history.push('/');
       }).
       catch(error=>{
         setError({success:false,error:"Server error"})
       })
    }
  
  }
 
  return (
    
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {error.success==false && <p className="text-danger" >{error.error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={e=>setData({...data,userName:e.target.value})}type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={e=>setData({...data,password:e.target.value})}type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
