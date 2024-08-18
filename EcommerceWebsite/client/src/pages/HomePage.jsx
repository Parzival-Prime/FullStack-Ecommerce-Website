import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/homePage.css'
import '../styles/home-scroller.css'
import toast from 'react-hot-toast'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="home-container">

        {/* =========== Hero Section =========== */}
        <section className="home-hero-section">
          <h1 className="home-hero-title">Whispering Willow</h1>
          <p className="home-hero-subtitle">Embrace Nature’s Best for Your Hair & Skin</p>
          <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1723342616/xhvtjqhy2vlfutgdqun2.png" alt="Image" className="home-hero-image" />
          <p className="home-hero-text">Nourish your hair and skin with our range of all-natural, high-quality products. Crafted with care, inspired by nature.</p>
          <button className="home-hero-button" onClick={() => navigate('/products')}>Explore Products</button>
        </section>

        {/* ================= Our Story Section ==================== */}
        <section className="home-story-section">
          <h1 className="home-story-title">Our Story</h1>
          <p className="home-story-para">Established in 2010, Whispering Willow was born out of a passion for creating a unique experience that reconnects people with nature. Over the years, we have grown and evolved, constantly striving to enhance our offerings and provide an unforgettable stay for our guests. Our commitment to sustainability and eco-friendly practices ensures that we preserve the natural beauty around us for future generations.
          </p>

          <h1 className='story-boxes-title'>Commited to Deliver top-tier customer experiences</h1>
          <div className="story-boxes">
            <div>
              <div className="box">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.4 39.9" className='story-leaf'>
                  <path d="M24.7,27.6a1.1,1.1,0,0,1,.1-.5A3.6,3.6,0,0,0,22.5,26a19.6,19.6,0,0,0-9-.1c-.5.1-1.7.9-2.6.5s2.2-3,3-4.1c3-3.8,4.6-4.2,7.8-5a9.2,9.2,0,0,0,4.8-3.9A19.3,19.3,0,0,0,30.3,2.6a5.4,5.4,0,0,0,0-1.8h-.1L29.5.1h-.6a53.4,53.4,0,0,0-6.5,5,17.6,17.6,0,0,0-5.5,10.5,4.1,4.1,0,0,1-.8,1.9l-5.4,6.2c-.2.2-2.1,3.2-1.8,1.6a16.2,16.2,0,0,0-.3-7.9C8,15,8.4,12.8,7.5,10.7c-.9-.3-1.3,0-1.5.5-1,2.4-2.2,4.7-3,7.3A15.9,15.9,0,0,0,3.7,30a4.9,4.9,0,0,1,.4,1.1,4.2,4.2,0,0,1,.4,1.2C3.1,34.7,1.4,36.6,0,39.1l1,.8.9-1.6c.9-1.6,2-3.1,3-4.6s2.2-1.6,4.1-.8l1,.3C16.5,35.1,21.1,33.5,24.7,27.6ZM5.5,30.7C2.6,26,3.3,16.7,6.7,14.4,8.6,20.5,8.3,25.9,5.5,30.7ZM17.9,16.2C19,9.2,23.5,5.3,28.7,1.8c.3.5.4.6.4.8A4.9,4.9,0,0,1,29,3.8a21,21,0,0,1-3.4,8.6,10.6,10.6,0,0,1-5.2,3.9A2.3,2.3,0,0,1,17.9,16.2ZM8.1,30.8c2.4-3.6,9.5-5.1,14.3-3.1C19.9,32.9,13.1,34.4,8.1,30.8Z" ></path>
                </svg>
                <h4>Natural & Organic</h4>
                <p>Mother Nature knows best</p>
              </div>

              <div className="box">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.8 40.6" className='story-rabbit'>
                  <path d="M59.4,37.7a35.7,35.7,0,0,1-1.7-3.3,36.8,36.8,0,0,0-2-3.9h-.1a4.1,4.1,0,0,0-1.9-2,4.8,4.8,0,0,0-2.4-.1,2.8,2.8,0,0,1-1.6,0c-.2-.2-.1-.5.1-1.1a4.8,4.8,0,0,0,.5-1.8h0a.3.3,0,0,0-.1-.2c.1-.1.1-.2.3-.2h0a3.4,3.4,0,0,0,1.6-.4A2.2,2.2,0,0,0,53,22v-.3A2.8,2.8,0,0,0,52,20a3.2,3.2,0,0,0-2.2-.7,1.8,1.8,0,0,0-1.7,1.2c-1.6-1.3-2.4-2.4-8.3-2.3-1.3,0-4.3,1.5-6,1.5-4.2,0-10.9-2.8-14-6.2-1.5-1.7-1.6-4.1-1.6-6.3a14.6,14.6,0,0,0-.6-4.9c-.3-.8-.7-2-1.8-2.3s-1.6.6-1.9,1.6A2.2,2.2,0,0,0,11.6.9a1.6,1.6,0,0,0-.9.7c-.6,1.8,2.1,7.5,3.9,10.5.1.1.3.4-.1.4s-2.3-.2-2.7-.1c-2.4.2-2.9.8-4.3,1.8s-2.7,2.2-2.8,3.4a3.1,3.1,0,0,0,.6,1.9,7,7,0,0,0,4.5,2.8c1.3.2,3.7.5,5.3-.6s.5.1.5.1a10.8,10.8,0,0,1,0,1.8c-.1.3-.4,1.6-.5,2A1.9,1.9,0,0,1,14,26.7h-.9A41.1,41.1,0,0,1,7.7,26a41.9,41.9,0,0,1-5-1.8A2.5,2.5,0,0,0,1,23.9a1.6,1.6,0,0,0-.8,2.2,3.8,3.8,0,0,0,1,1.3l1.1.8c4.2,2,7.3,2.9,13.2,1.6a11.9,11.9,0,0,1,2.5-.2,5.3,5.3,0,0,1,3.2,1l1.2.6c4,2,8.4,2.6,14.2,2.4l.7.7c.6.7,2.2.9,2.7,1a27,27,0,0,0,8.6-1.4,15.7,15.7,0,0,1,2.5-1.4c.8.2,1,1,1.7,2.6a13,13,0,0,0,1.5,4.1c.4.8,2.4,1.4,3.2,1.4a4.7,4.7,0,0,0,1.7-.4C60.1,39.8,59.8,38.8,59.4,37.7ZM58,38.8a2.8,2.8,0,0,1-2.3-.2,13.7,13.7,0,0,1-1.4-3.7c-1.8-3.7-2.2-3.7-3.5-3.8h-.3A3.2,3.2,0,0,0,49,32l-1,.5a26.4,26.4,0,0,1-8.1,1.3,4.9,4.9,0,0,1-3.3-4.2.1.1,0,0,0-.1-.1h0v-.2c-.8-.4-1,.6-1,.6a4.3,4.3,0,0,0,.5,2.2h0c-.1.2-.1.4-.2.4a25.7,25.7,0,0,1-12.6-2.5l-1.2-.6A6.5,6.5,0,0,0,18,28.1h-.9l-2,.6C10.6,30.2,4.4,28.5,2.6,27l-.9-.6c-.5-.5-.6-.6-.4-1.2s1.1.1,1.8.4a33.3,33.3,0,0,0,5.3,1.7l4.3.4h1.1a4,4,0,0,0,2-1.1,7.1,7.1,0,0,0,.7-1.5,1.4,1.4,0,0,0,.2-.7c0-.2.1-.9.1-1.2a7.1,7.1,0,0,0-.4-3.2c-.5-.9-1.2.2-1.4.4a7.4,7.4,0,0,1-4.9.8,4.9,4.9,0,0,1-3.7-2.3,1.8,1.8,0,0,1-.1-1.7c.3-.7.5-.8,1.8-1.8a7.3,7.3,0,0,1,4.2-1.8,2.9,2.9,0,0,1,1.6.1,4.8,4.8,0,0,0,1.7,0,1,1,0,0,0,.6-1.2v-.3c-2-2.9-4-7.2-4.2-9a.5.5,0,0,1,.2-.5.8.8,0,0,1,.9.2,6.1,6.1,0,0,1,.7,1.4,3.1,3.1,0,0,0,1,.8c.4,0,.3-.4.3-.4V2.4s.3-.9.7-.4h0a1.4,1.4,0,0,1,.4.8A10.4,10.4,0,0,1,17,6.6c0,2.2-.3,5.2,1.7,7.3,3.3,3.8,10.1,6.9,14.7,6.9,1.8,0,4.9-1,6.3-1.1,4.6-.2,6.3.2,7.9,2.5l.6.2h.6a4.1,4.1,0,0,0,.5-.9c.2-.4.2-.5.7-.6a1.4,1.4,0,0,1,1.1.4c.2.2.4.4.4.6v.4c.1.6.1.8-.2,1s-.6.2-1.2.1h-.9a.8.8,0,0,0-.4,1.1c.4,1-.1,1.6-.4,2.4a2.7,2.7,0,0,0,.1,2.6h.1a3.3,3.3,0,0,0,2.9.4,2.8,2.8,0,0,1,1.6,0,2.8,2.8,0,0,1,1.2,1.4h.1A26.3,26.3,0,0,1,56.3,35c.5,1,.9,2,1.7,3.4S58.1,38.8,58,38.8Z"></path>
                </svg>
                <h4>Natural & Organic</h4>
                <p>Mother Nature knows best</p>
              </div>
            </div>

            <div>
              <div className="box">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 23" className='story-hand'>
                  <path d="M57.4,2.1a3.2,3.2,0,0,0-3,.1,10.8,10.8,0,0,0-2.2,1.5L50.7,4.9a49.7,49.7,0,0,0-4.6,3.7l-2.5,2L51.9.9,50.7.1h-.1C48.2-.4,46.2,1.6,44,4L42.2,6c-1.4,1.6-3.1,3.4-4.6,4.8l2.5-4c2.2-3.1,2.1-4.1,1.9-4.6a.9.9,0,0,0-.6-.6c-1.1-.3-2.8.8-3.5,1.8a12.7,12.7,0,0,0-1.2,1.8l-.4.8a29.2,29.2,0,0,1-3.6,4.6h-.6A55.3,55.3,0,0,1,24.7,6a17.2,17.2,0,0,0-5.3-2.9c-5.3-2-8.5.4-12.2,3.8A30,30,0,0,1,4,9.6L1.7,10.7H1.4l-.7.4v.2A8.2,8.2,0,0,0,0,15.1a7,7,0,0,0,1.2,3.6c.7.9,3.9,4.3,5.4,4.3h.5l1.5-1.5c1.3-1.4,2.6-2.8,4.2-3.1a8.5,8.5,0,0,1,4.5.6l.8.2a32.2,32.2,0,0,1,4.2,1.6c3.2,1.3,6.5,2.6,9.2,2.2,4.2-.9,8.3-2,13.2-3.5a48.1,48.1,0,0,0,11.8-5.7,1.4,1.4,0,0,0,.4-1.1v-.2a1.3,1.3,0,0,0-.7-.9c-1.2-.6-3.1.1-3.6.3l-1.5.7a7.6,7.6,0,0,1-4.6,1.4s-.3-.2-.1-.4a5.8,5.8,0,0,1,1.2-1c3.2-2.6,7.2-5.8,10.3-8.9l.2-.2V3.2A1.3,1.3,0,0,0,57.4,2.1ZM43.1,6.8l1.7-2c2-2.1,3.6-3.8,5.3-3.6l-9,10.5h0v.2l-.5.2H38.6s-.4-.2-.1-.4h0C40,10.2,41.7,8.4,43.1,6.8Zm-5.8-.2.4-.8c.2-.4.4-.6,1.2-1.8a4.2,4.2,0,0,1,2-1.3h0c0,.3-.2,1.2-1.8,3.5L36,11.3h0s-.4.4-.7.4L34,11.4a.2.2,0,0,1-.1-.3h0C34.8,10,36.1,8.4,37.3,6.6Zm14.3,7,1.3-.7a4,4,0,0,1,2.7-.3h.1a43.8,43.8,0,0,1-11.3,5.5c-4.9,1.5-9,2.5-13.2,3.4-2.2.4-5.4-.9-8.5-2.1A28.5,28.5,0,0,0,18.4,18l-.7-.3a9.5,9.5,0,0,0-5.1-.5c-2,.3-3.4,1.9-4.9,3.4L6.5,21.8a14.4,14.4,0,0,1-4.4-3.9A5.3,5.3,0,0,1,1.2,15a8,8,0,0,1,.4-3l.3-.2h.2a24.1,24.1,0,0,0,2.5-1.1A32.9,32.9,0,0,0,8,7.8C12.1,4,14.6,2.6,19,4.2a16.5,16.5,0,0,1,5,2.7,45.4,45.4,0,0,0,7.6,4.9l.9.4h0a22.9,22.9,0,0,0,6.9,1l3.6.3a3.2,3.2,0,0,1,2.1.8.7.7,0,0,1,.1.5,1.2,1.2,0,0,1-1.2.9,34.8,34.8,0,0,0-9.5.3,17.4,17.4,0,0,1-5.8.2h-.3s-.2,1,.1,1.1a17.5,17.5,0,0,0,6.2-.1,35.5,35.5,0,0,1,9.2-.4,2.2,2.2,0,0,0,2.1-1h.1a.9.9,0,0,1,.8-.6h0A10,10,0,0,0,51.6,13.6Zm-4.8-2.1-1.3,1h0l-.6.2h0l-1.1-.3h0s-.2-.2,0-.3h0l3-2.5a49.7,49.7,0,0,1,4.6-3.7l1.5-1.1a10.3,10.3,0,0,1,2-1.5,2.3,2.3,0,0,1,1.8-.1C53.6,6.1,49.8,9.1,46.8,11.5Z"></path>
                </svg>
                <h4>Natural & Organic</h4>
                <p>Mother Nature knows best</p>
              </div>

              <div className="box">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512" xmlSpace="preserve" className='story-bag'>
                  <g>
                    <g>
                      <path d="M401.067,145.067H358.4V102.4C358.4,45.935,312.465,0,256,0S153.6,45.935,153.6,102.4v42.667h-42.667c-4.71,0-8.533,3.823-8.533,8.533v349.867c0,4.71,3.823,8.533,8.533,8.533h290.133c4.71,0,8.533-3.823,8.533-8.533V153.6C409.6,148.89,405.777,145.067,401.067,145.067z M170.667,102.4c0-47.053,38.281-85.333,85.333-85.333s85.333,38.281,85.333,85.333v42.667H170.667V102.4z M392.533,494.933H119.467v-332.8H153.6v25.6c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-25.6h170.667v25.6c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-25.6h34.133V494.933z" />
                    </g>
                  </g>
                </svg>
                <h4>Natural & Organic</h4>
                <p>Mother Nature knows best</p>
              </div>
            </div>
          </div>
        </section >

        {/* ================= Popular Products ===================== */}
        <section className="popular-products-section">
          <h1 className="popular-products-section-title">Our Most Popular Products</h1>
          <div className="popular-products-carousel">

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(163, 252, 232)' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722448928/qd6rbid2serizhy3iheb.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">Aqua Bliss Hair Mask</h4>
                <p className="popular-product-card-description">{('A nourishing hair mask to hydrate and repair dry and damaged hair.').substring(0, 68)}</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(87, 91, 91)', color: 'whiteSmoke' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449014/hizcboocazwd7lx4gdik.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Charcoal Detox Clay Mask').substring(0, 20)}</h4>
                <p className="popular-product-card-description">{('A detoxifying clay mask to draw out impurities and improve skin clarity.').substring(0, 68)}</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: '#ecd1ac' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449080/afxn3hvp5aktimux0euw.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Golden Elixer Anti-Aging Serum').substring(0, 20)}...</h4>
                <p className="popular-product-card-description">{('A luxurious anti-aging serum to reduce the appearance of fine lines and wrinkles.').substring(0, 68)}...</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: '#dac2ec' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449537/ilifns4wuscfwsxisgks.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">Lavender Blossom Floral Soap</h4>
                <p className="popular-product-card-description">A floral soap bar with a gentle lavender fragrance.</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(64, 50, 133, .9)', color: 'white' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449797/ihrkaupmbxd5aynbabfv.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Midnight Radiance Night Cream').substring(0, 17)}...</h4>
                <p className="popular-product-card-description">{('A rich night cream to nourish and revitalize your skin while you sleep.').substring(0, 68)}...</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(163, 252, 232)' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449892/xusfamzgc33sozpqjksz.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Ocean Breeze Face Mist').substring(0, 17)}...</h4>
                <p className="popular-product-card-description">{('A refreshing face mist that hydrates and revitalizes your skin.').substring(0, 68)}...</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: '#fcd2d2' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722450010/u6tebdmp8xvzvskspurg.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Rose Petal Eye Serum').substring(0, 17)}...</h4>
                <p className="popular-product-card-description">{('A gentle eye serum with rose petals to reduce puffiness and dark circles').substring(0, 68)}...</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: '#ecd1ac' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722450075/tthzvtwf1kp7ow5rsgsg.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">Daisy Hair Oil</h4>
                <p className="popular-product-card-description">A nourishing hair oil infused with daisy extract for shiny, healthy hair.</p>
              </div>
            </div>

            {/* Reapeating */}

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(163, 252, 232)' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722448928/qd6rbid2serizhy3iheb.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">Aqua Bliss Hair Mask</h4>
                <p className="popular-product-card-description">{('A nourishing hair mask to hydrate and repair dry and damaged hair.').substring(0, 68)}</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: 'rgb(87, 91, 91)', color: 'whiteSmoke' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449014/hizcboocazwd7lx4gdik.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Charcoal Detox Clay Mask').substring(0, 20)}</h4>
                <p className="popular-product-card-description">{('A detoxifying clay mask to draw out impurities and improve skin clarity.').substring(0, 68)}</p>
              </div>
            </div>

            <div className="popular-product-card" style={{ backgroundColor: '#ecd1ac' }}>
              <div className="popular-product-card-upper">
                <img src="http://res.cloudinary.com/dro8qbk8j/image/upload/v1722449080/afxn3hvp5aktimux0euw.jpg" alt="Product Image" className="popular-product-card-image" />
              </div>
              <div className="popular-product-card-lower">
                <h4 className="popular-product-card-title">{('Golden Elixer Anti-Aging Serum').substring(0, 20)}...</h4>
                <p className="popular-product-card-description">{('A luxurious anti-aging serum to reduce the appearance of fine lines and wrinkles.').substring(0, 68)}...</p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= We are Better Section ================ */}
        <section className="We-are-better-section">

          <div className="we-are-better" style={{ backgroundColor: '#c4fcf0' }}>
            <div className="we-are-better-left">
              <h2>Craftsmanship and Quality</h2>
              <p>Our products are crafted with meticulous attention to detail using the finest materials. Each item undergoes rigorous quality checks to ensure it meets our high standards, ensuring you receive nothing but the best.</p>
            </div>
            <div className="we-are-better-right">
              <img src="/homePage/newFolder1/aquaBliss2.jpg" alt="" />
            </div>
          </div>

          <div className="we-are-better we-are-better-right-image" style={{
            backgroundColor
              : '#ffe5d1',
          }}>
            <div className="we-are-better-right" style={{ marginRight: '1.2rem' }}>
              <img src="/homePage/newFolder1/goldenElixer4.jpg" alt="" />
            </div>
            <div className="we-are-better-left">
              <h2>Personalized Service</h2>
              <p>We believe in creating experiences, not just transactions. Our dedicated team takes the time to understand your needs and preferences, offering tailored solutions that exceed your expectations.</p>
            </div>
          </div>

          <div className="we-are-better" style={{ backgroundColor: '#4e5956', color: '#ffff' }}>
            <div className="we-are-better-left">
              <h2>Innovation and Design</h2>
              <p>We stay ahead of the curve by continually embracing new technologies and design trends. Our products feature cutting-edge innovations and aesthetic appeal, setting new standards in the industry.</p>
            </div>
            <div className="we-are-better-right">
              <img src="/homePage/newFolder1/clayMask3.jpg" alt="" />
            </div>
          </div>

          <div className="we-are-better" style={{
            backgroundColor
              : '#e2d3fa',
          }}>
            <div className="we-are-better-right" style={{ marginRight: '1.2rem' }}>
              <img src="/homePage/newFolder1/lavenderSoap3.jpg" alt="" className='we-are-better-left-image'/>
            </div>
            <div className="we-are-better-left">
              <h2>Sustainability Commitment</h2>
              <p>We are committed to environmental responsibility. Our sustainable practices and eco-friendly materials reflect our dedication to preserving the planet for future generations.</p>
            </div>
          </div>
        </section>

        {/* ================ Reviews Section ============ */}
        <section className="reviews-section">
          <h1>Some Feedbacks from Our Customers</h1>
          {/* <---- Main Container ----> */}
          <div className="reviews-carousel-container">
            <Swiper
              className="reviews-carousel-wrapper"
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: '.button-prev',
                nextEl: '.button-next',
              }}
              pagination={{ clickable: true }}
              spaceBetween={50}
              slidesPerView={'auto'}
              loop={true}
            >


              <SwiperSlide className="reviews-carousel-item">
                <p>"From the moment I placed my order to the delivery, everything was seamless. The quality of the products exceeded my expectations, and the customer service team was incredibly helpful. Whispering Willow has earned a loyal customer in me!"</p>
                <h4>~ Olivia J.</h4>
              </SwiperSlide>

              <SwiperSlide className="reviews-carousel-item">
                <p>"Whispering Willow is my go-to for unique, artisanal gifts. The website is easy to navigate, and shipping is always prompt. I appreciate the thoughtful packaging and the handwritten notes that come with every order. Keep up the great work!"</p>
                <h4>~ David K.</h4>
              </SwiperSlide>

              <SwiperSlide className="reviews-carousel-item">
                <p>"The quality of the products at Whispering Willow is outstanding. I recently tried their new collection and was blown away by the craftsmanship. The only reason I'm not giving a 5-star rating is that I wish there were more options for customization."</p>
                <h4>~ Sarah M.</h4>
              </SwiperSlide>

              <SwiperSlide className="reviews-carousel-item">
                <p>"I've been a loyal customer for years, and Whispering Willow never disappoints. Their products are always fresh, and the attention to detail in every item is impressive. The personalized touch in their service makes every purchase feel special."</p>
                <h4>~ James T.</h4>
              </SwiperSlide>

              <SwiperSlide className="reviews-carousel-item">
                <p>"Whispering Willow has been a game-changer for me! The natural, hand-crafted products are top-notch, and the customer service is exceptional. I especially love their eco-friendly packaging and the way they truly care about sustainability. "</p>
                <h4>~ Emily R.</h4>
              </SwiperSlide>
            </Swiper>

            <div style={{
              position: 'absolute',
              left: '3rem',
              backgroundColor: 'rgb(229, 229, 230, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%'
            }}
              className='button-prev'
            >
              <ArrowBackIosIcon sx={{ color: 'white', transform: 'translateX(.2rem)' }} />
            </div>

            <div style={{
              position: 'absolute',
              right: '2.7rem',
              backgroundColor: 'rgb(229, 229, 230, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%'
            }}
              className='button-next'
            >
              <ArrowForwardIosIcon sx={{ color: 'white' }} />
            </div>
          </div>
        </section>
      </div >
    </>
  )
}

export default HomePage
