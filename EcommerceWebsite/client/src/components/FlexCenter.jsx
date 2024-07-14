import React from 'react'

export default function FlexCenter({children, sx}){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            ...sx
        }}>
            {children}
        </div>
    )
}