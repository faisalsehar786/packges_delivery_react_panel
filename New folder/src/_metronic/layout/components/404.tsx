import React from 'react'
import './404.scss' // Assuming you have a separate CSS file for this component

const Page404: React.FC = () => {
  return (
    <div className='container-b'>
      <div className='copy-container center-xy'>
        <p className='p'>
          404. Page not found.
          <span
            className='handle'
            style={{
              animation: 'blink 1s infinite',
              background: '#ffe500',
              width: '14px',
              height: '30px',
              marginLeft: '5px',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          ></span>
        </p>
      </div>
    </div>
  )
}

export default Page404
