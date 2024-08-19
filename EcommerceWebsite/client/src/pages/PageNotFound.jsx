import React from 'react'

function PageNotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '3rem',
      padding: '5rem',
      backgroundColor: 'var(--rosewood1)'
    }}>
      
        <img src='\pagenotfound\notfound.svg'
          alt="image"
          style={{
            minWidth: 200,
            maxWidth: 400,
          }}
        />
      
      <h1
        style={{ fontFamily: 'var(--sansitaSwashed)', color: 'var(--rosewood5)' }}>
        Oops Page Not Found
      </h1>
    </div>
  )
}

export default PageNotFound
