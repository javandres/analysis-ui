import React from 'react'

// const logo = {
//   fontFamily: `'Gill Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif`,
//   display: 'inline-block',
//   letterSpacing: 0,
//   paddingTop: '2.5rem',
//   paddingLeft: '2.5rem',
//   // backgroundImage:
//   //   'url(https://d2f1n6ed3ipuic.cloudfront.net/conveyal-128x128.png)',
//   backgroundSize: '2rem',
//   lineHeight: '4rem',
//   backgroundRepeat: 'no-repeat',
//   fontWeight: 100,
//   whiteSpace: 'nowrap'
// }

export default function Logo() {
  return (
    <div className='page-header text-center' style={{borderBottom: 'none'}}>
      <img style={{width: 400}} src='http://ubica.ec/temp/logo_llactalab.png' />
      <h1>LlactaLAB</h1>
      <div>
        <h5>
          <img
            style={{width: 18}}
            src='https://d2f1n6ed3ipuic.cloudfront.net/conveyal-128x128.png'
          />{' '}
          conveyal analysis
        </h5>
      </div>
    </div>
  )
}
