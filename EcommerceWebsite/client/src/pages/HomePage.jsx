import React from 'react'
import '../styles/homePage.css'

function HomePage() {
  return (
    <>
      <div className="home-container">
        <section className="home-hero-section">
          <h1 className="home-hero-title">Whispering Willow</h1>
          <p className="home-hero-p1">Embrace Nature’s Best for Your Hair & Skin</p>
          <img src="\homePage\temphd.png" alt="Image" className="home-hero-image" />
          <p className="home-hero-text">Nourish your hair and skin with our range of all-natural, high-quality products. Crafted with care, inspired by nature.</p>
          <button className="home-hero-button">Explore Products</button>
        </section>
      </div>
    </>
  )
}

export default HomePage
