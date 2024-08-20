import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/footer.css'
import { RiInstagramLine, RiTwitterXLine, RiYoutubeLine, RiCopyrightLine } from '@remixicon/react'

function Footer() {
  const navigate = useNavigate()
  return (
    <>
      <div className="footer-line"></div>
      <div className="footer">
        <div className="footer-logo" onClick={()=>navigate('/home')}>Whispering Willow</div>
        <div className="footer-upper">
          <div className='footer-upper-b1'>
            <Link to={'/about'} className="items">About Us</Link>
            <Link to={'/contact'} className="items">Contact Us</Link>
          </div>
          <div className='footer-upper-b2'>
            <Link to={'https://www.instagram.com/parzival_1629/'} className="items"><RiInstagramLine /></Link>
            <Link to={'https://www.youtube.com/'} className="items"><RiYoutubeLine /></Link>
            <Link to={'https://x.com/parzival_1629'} className="items"><RiTwitterXLine /></Link>
          </div>
        </div>
        <div className="footer-copyright">All Rights Reserved to Owner of Whispering Willow <RiCopyrightLine className='copy' /> </div>
      </div>
    </>
  )
}

export default Footer
