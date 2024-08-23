import React from 'react'
import '../styles/loader.css'

function Loader() {
  return (
    <div className="loader">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle fill='#9A16B2' stroke='#9A16B2' strokeWidth='15' r='15' cx='35' cy='100'><animate attributeName='cx' calcMode='spline' dur='2' values='35;165;165;35;35' keySplines='0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1' repeatCount='indefinite' begin='0'></animate></circle><circle fill='#9A16B2' stroke='#9A16B2' strokeWidth='15' opacity='.8' r='15' cx='35' cy='100'><animate attributeName='cx' calcMode='spline' dur='2' values='35;165;165;35;35' keySplines='0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1' repeatCount='indefinite' begin='0.05'></animate></circle><circle fill='#9A16B2' stroke='#9A16B2' strokeWidth='15' opacity='.6' r='15' cx='35' cy='100'><animate attributeName='cx' calcMode='spline' dur='2' values='35;165;165;35;35' keySplines='0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1' repeatCount='indefinite' begin='.1'></animate></circle><circle fill='#9A16B2' stroke='#9A16B2' strokeWidth='15' opacity='.4' r='15' cx='35' cy='100'><animate attributeName='cx' calcMode='spline' dur='2' values='35;165;165;35;35' keySplines='0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1' repeatCount='indefinite' begin='.15'></animate></circle><circle fill='#9A16B2' stroke='#9A16B2' strokeWidth='15' opacity='.2' r='15' cx='35' cy='100'><animate attributeName='cx' calcMode='spline' dur='2' values='35;165;165;35;35' keySplines='0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1' repeatCount='indefinite' begin='.2'></animate></circle></svg>
    </div>
  )
}

export default Loader
