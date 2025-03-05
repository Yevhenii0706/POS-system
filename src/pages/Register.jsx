import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: 1111111111,
    role: "",
    address: "",
    company: 11111111
  })

  const { name, email, password, firstName, lastName, phoneNumber, role, address, company } = form

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, success, error, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (error) {
      toast.error(message)
    }
    if (success || user) {
      navigate('/login')
    }
    dispatch(reset())
  }, [error, success, user, message, navigate, dispatch])

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username: name, email: email, password: password, first_name: firstName, last_name: lastName, phone_number: phoneNumber, role: role, address: address, companyId: company
    }

    dispatch(register(userData))
    navigate('/login')
  }

  return (
    <>
      <div className='auth-container'>
        <form className='register-form' onSubmit={handleSubmit}>

          <h1>Register</h1>
          <div className='formInput flex'>
            <div>
              <label>User Name</label>
            </div>
            <div>
              <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} />
            </div>
          </div>

          <div className='formInput'>
            <label>Email</label>
            <input type="email" placeholder='Email' name='email' value={email} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Password</label>
            <input type="password" placeholder='Password' name='password' value={password} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>First Name</label>
            <input type="text" placeholder='First Name' name='firstName' value={firstName} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Last Name</label>
            <input type="text" placeholder='Last Name' name='lastName' value={lastName} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Phone number</label>
            <input type="number" placeholder='Phone Number' name='phoneNumber' value={phoneNumber} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Role</label>
            <input type="text" placeholder='Role' name='role' value={role} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Address</label>
            <input type="text" placeholder='address' name='address' value={address} onChange={onChange} />
          </div>

          <div className='formInput'>
            <label>Company</label>
            <input type="text" placeholder='Company' name='company' value={company} onChange={onChange} />
          </div>

          <button type='submit' className='btn-grad'>Register</button>

          <div className='home'><a href='/'>Go to home page</a></div>
        </form>
      </div>
    </>
  )
}

export default Register