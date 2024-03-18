import React from 'react'

type Props = {
  titleMain?: string
  description?: string
  systemUsersNumber?: string
  systemUsersText?: string
  CustomersNumber?: string
  CustomersText?: string
}
const ContentHeader2: React.FC<Props> = ({
  titleMain,
  systemUsersNumber,
  systemUsersText,
  CustomersNumber,
  CustomersText,
  description,
}) => {
  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body'>
          <div className='d-flex flex-wrap flex-sm-nowrap '>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='fontSizeMainTitle text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {titleMain}
                    </div>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <div className='fontsizechfslogtime d-flex align-items-center text-gray-400 text-hover-primary me-5 '>
                      {description}
                    </div>
                  </div>
                </div>

                <div className='d-flex '>
                  <div className='d-flex flex-wrap flex-stack'>
                    <div className='d-flex flex-column flex-grow-1'>
                      <div className='d-flex flex-wrap'>
                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 '>
                          <div className='d-flex align-items-center'>
                            <i className='bi bi-people-fill iconbtnStylecx  me-2 text-info'></i>
                            <div className='fs-2 fw-bolder'> {systemUsersNumber}</div>
                          </div>

                          <div className=' text-gray-400 fontsizechfslogtime2'>
                            {' '}
                            {systemUsersText}
                          </div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4'>
                          <div className='d-flex align-items-center'>
                            <i className='bi bi-people-fill iconbtnStylecx  me-2 text-info'></i>
                            <div className='fs-2 fw-bolder'> {CustomersNumber}</div>
                          </div>

                          <div className=' text-gray-400 fontsizechfslogtime2'>{CustomersText}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {ContentHeader2}
