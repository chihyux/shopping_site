import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from '../../config/config'
import { Auth } from '../../contexts/authContext'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthWrapper, AuthBtn } from './Styled'

const SignUp:React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [routeRedirect, setRouteRedirect] = useState(false)

    const {state, dispatch, openNotification, contextHolder} = useContext(Auth)

    if(state.user) return <Redirect to="/" />;
    if(routeRedirect) return <Redirect to='/' />

    const postSignUp = async (email:string, password:string) => {
        const user = await firebase.auth().createUserWithEmailAndPassword(email,password)
        .catch(err => {
        console.log('post err', err.messsage)
        openNotification('Sign Up')
        return dispatch({
            type: 'SIGNUP_ERROR',
            payload: err.message
        })
        })
    return user
  }
    const signup = async() => {
        // console.log(state)
        // e.preventDefault()
        // console.log('form sent')
        let res = await postSignUp(email, password)
        if(res) {
            setRouteRedirect(true)
            openNotification('Sign Up')
            return dispatch({
                type: 'SIGNUP_SUCCESS',
                payload: res.user.email
            })
        }
        setEmail('')
        setPassword('')
    }

    return (
          <AuthWrapper>
          {contextHolder}
          <h5>註冊帳號</h5>
          <Form
              className="login-form"
              onFinish={signup}
              >
          <Form.Item
              label='email'
              name="email"
          >
              <label htmlFor='email'></label>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                     placeholder="Email" 
                     type='email' id='email' value={email}
                     onChange={(e)=> setEmail(e.target.value)} required />
          </Form.Item>
          <Form.Item
              label='password'
              name="email"
          >
              <label htmlFor='password'></label>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                      type='password' id='password' value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                      placeholder="Password" required />
          </Form.Item>
          <AuthBtn>
              <Button type="primary" htmlType="submit" className="login-form-button">註冊</Button>
              <Button><Link to='/logIn'>返回並登入</Link></Button>
          </AuthBtn>
          </Form>
      </AuthWrapper>
    )
}

export default SignUp
