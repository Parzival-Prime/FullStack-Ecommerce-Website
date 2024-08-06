import React, { useState, useEffect, useRef } from 'react'
import '../styles/profile.css'
import { RiCake2Line, RiCalendar2Line, RiArrowGoBackFill, RiArrowLeftLine } from '@remixicon/react'
import { Button, TextField, styled } from '@mui/material'
import FlexCenter from '../components/FlexCenter'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import SendIcon from '@mui/icons-material/Send';
import toast from 'react-hot-toast'
import { axiosInstance } from '../App'
import customParseFormat from 'dayjs/plugin/customParseFormat';

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
  width: '90%',
});

const formDataToJson = (formData) => {
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  return jsonObject;
};

function Profile() {
  const [userData, setUserData] = useState({})
  const [localData, setLocalData] = useState({})
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const fileInputRef = useRef(null)
  const gobackRef = useRef(null)
  const formData = new FormData()

  // For Update Form
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState(0)
  const [pincode, setPincode] = useState(0)
  const [createdAt, setCreatedAt] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState({});
  dayjs.extend(customParseFormat);
  const format = 'DD-MM-YYYY';

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const convertDateFormat = (date) => {
    const arrVar = date.split('-')
    const newVar = months[parseInt(arrVar[1]) - 1]
    const mainVar = `${arrVar[0]} ${newVar} ${arrVar[2]}`
    return mainVar
  }

  const getUserData = () => {
    try {
      const gotData = JSON.parse(localStorage.getItem('user')) || {}
      if(gotData){
        setLocalData(gotData)
        setUserData(gotData.value)
      }
    } catch (error) {
      console.log(error, "error while retrieving data from localStorage")
      toast.error("error while retrieving data")
    }
  }

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setName(userData.name || '')
      setEmail(userData.email || '')
      setAddress(userData.address || '')
      setPincode(userData.pincode || '')
      setPhone(userData.phone || '')
      setCreatedAt(convertDateFormat((((((userData.createdAt).split('T'))[0]).split('-')).reverse()).join('-')))
      setDateOfBirth(dayjs(`${userData.dateOfBirth}`, format))
    }
  }, [userData])

  const handleFlexCenterClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const makeFormData = () => {
    formData.append('name', name)
    formData.append('email', email)
    formData.append('dateOfBirth', dateOfBirth.format('DD-MM-YYYY'))
    formData.append('address', address)
    formData.append('pincode', pincode)
    formData.append('phone', phone)
    if(file){
      formData.append('file', file)
    } else {
      formData.append('profileImage', userData.profileImage)
    }
    handleUpdate(formData)
  }

  const handleUpdate = async (formData) => {
    try {
      const { data } = await axiosInstance.put('/api/v1/auth/update-user', formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

      if (data?.success) {
        console.log("Data Updated Successfully")
        console.log(data.user)
        const newlocalData = {"expiry": localData.expiry, "value": data.user}
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(newlocalData))
        window.location.reload()
        gobackRef.current.click()
        toast.success('Update Successful')
      }
    } catch (error) {
      console.log(error, "Error occured")

    }
  }

  const handlePopUpToggle = (e) => {
    e.stopPropagation()
    setIsPopUpOpen(prev => !prev)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {userData ? (<>
          <div style={{ height: '90svh', width: '100%', position: 'relative' }}>
            {!isPopUpOpen ?
              (<div className="profile-container">
                <div className="profile-upper">
                  <div className="profile-image-container">
                    <img src={userData.profileImage} alt="Profile Image" className="profile-image" />
                  </div>
                  <div className="edit-profile" onClick={handlePopUpToggle}>Edit profile</div>
                  <div className="profile-name">{userData.name || 'No name available'}</div>
                  <div className="profile-email">{userData.email || 'No email available'}</div>
                  <div className="profile-dateofbirth">
                    <RiCake2Line />{userData.dateOfBirth ? convertDateFormat(userData.dateOfBirth) : 'Date of Birth not available'}
                  </div>
                  <div className="profile-joinedOn"><RiCalendar2Line />{createdAt}</div>
                </div>
                <div className="profile-lower">
                  <h4 className="profile-lower-address-title">Your Address: </h4>
                  <div className="profile-address">{userData.address || 'No address available'}
                    <div className="profile-pincode">Pincode - {userData.pincode || '123456'}</div>
                  </div>
                  <h4 className="profile-lower-phoneNumber-title">Your Phone Number: </h4>
                  <div className="profile-phoneNumber">{userData.phone}</div>
                </div>
              </div>)
              : (<>
                <div className="profile-edit-popup-backdrop" onClick={handlePopUpToggle}></div>
                <div className="profile-edit-popup-container">
                  <div className="profile-edit-popup-goback-container" ref={gobackRef} onClick={handlePopUpToggle}><RiArrowLeftLine /></div>
                  <FlexCenter className="profile-edit-popup-upper">

                    <div
                      htmlFor="profile-Image-update"
                      onClick={handleFlexCenterClick} className="profile-edit-popup-image-container" >
                      <img
                        src={file ? URL.createObjectURL(file) : userData.profileImage}
                        alt="Popup profile Image"
                        className='profile-edit-poup-image'
                      />
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      id="profile-Image-update"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />

{/* {console.log(dateOfBirth)} */}
                    <TextField
                      label="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      size='small'
                      sx={{
                        marginBottom: '1rem',
                        width: '90%'
                      }}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      size='small'
                      sx={{
                        marginBottom: '1rem',
                        width: '90%'
                      }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        type="number"
                        value={dateOfBirth}
                        onChange={(newValue) => setDateOfBirth(newValue)}
                        slots={{
                          textField: (params) => (
                            <StyledTextField
                              {...params}
                              sx={{
                                '& .date-picker-margin': {
                                  marginBottom: '1rem',
                                  width: '90%'
                                }
                              }}
                            />
                          ),
                        }}
                      />
                    </LocalizationProvider>
                  </FlexCenter>

                  <FlexCenter className="profile-edit-popup-lower">
                    <TextField
                      label="Address"
                      type="number"
                      multiline
                      maxRows={3}
                      value={address}
                      onChange={(e) => setAddress(e.currentTarget.value)}
                      size='large'
                      sx={{
                        marginBottom: '1rem',
                        width: '90%'
                      }}
                    />
                    <TextField
                      label="Pincode"
                      type="number"
                      value={pincode}
                      onChange={(e) => setPincode(e.currentTarget.value)}
                      size='small'
                      sx={{
                        marginBottom: '1rem',
                        width: '90%'
                      }}
                    />
                    <TextField
                      label="Phone Number"
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                      size='small'
                      sx={{
                        marginBottom: '2rem',
                        width: '90%'
                      }}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={makeFormData}>Update</Button>
                  </FlexCenter>
                </div>
              </>)}
          </div>
        </>) : (<p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>)}
    </>
  )
}

export default Profile
