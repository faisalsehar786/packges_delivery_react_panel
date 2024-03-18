/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../_metronic/helpers'

type Props = {
  titleMain?: string
  description?: string
  date?: string
  loginTime?: string
}
const ContentHeader: React.FC<Props> = ({titleMain, date, loginTime, description}) => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body'>
        <div className='d-flex flex-wrap flex-sm-nowrap'>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <div className='fontSizeMainTitle text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {titleMain}
                  </div>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 pe-2'>
                  <div className=' fontsizechfslogtime d-flex align-items-center text-gray-400 text-hover-primary me-5 '>
                    {description}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className=' fw-bold fs-6  text-end'>
                  <div className=' text-dark text-hover-primary fontsizechfsdate '>
                    {date}
                    {/* <KTSVG
                      path='/media/icons/Calendar.svg'
                      className='iconAutoStyle iconAutoStyleMargin me-1 mx-2'
                    /> */}
                  </div>

                  <div className=' text-gray-400 text-hover-primary mt-3 fontsizechfslogtime'>
                    {loginTime}
                    {/*   <KTSVG
                      path='/media/icons/Shield-check.svg'
                      className='iconAutoStyle iconAutoStyleMargin me-1 mx-2'
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ContentHeader}
