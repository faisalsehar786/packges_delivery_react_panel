/* eslint-disable jsx-a11y/anchor-is-valid */
import $ from 'jquery'
import moment from 'moment'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {numberSpacing, toAbsoluteUrl} from '../../../../_metronic/helpers'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {handleGetRequest} from '../../../services'
import {TransactionsDrawer} from '../../Drawer/TransactionsDrawer'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

export default function StottespillereSingle() {
  const {id} = useParams<{id: string}>()
  const {setLoading} = useContext(LoadingContext)
  const [user, setUser] = useState<any>()
  const {setBreadcrumbs} = useContext(BreadcrumbsContext)
  const [transactions, setTransactions] = useState<any>([])
  const [selectedGoal, setSelectedGoal] = useState<any>()
  const [sortKey, setSortKey] = useState('goal_title')
  const [sortOrder, setSortOrder] = useState('DESC')
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  //create a ref of mounted
  let mounted = useRef(false)

  let i = 0

  const showDetails = (id: number) => {
    // show details using jquery slide transition top to bottom

    $(document).ready(function () {
      $(`#details${id}`).toggleClass('d-none')
      // $(`#details${id}`).fadeToggle('fast')
    })
  }
  const getTransactions = async () => {
    const resp: {
      data: any
      pagination: any
    } = await handleGetRequest(`/user/transactions/${id}`)(setLoading)
    setTransactions(resp)
  }

  useEffect(() => {
    if (mounted.current) {
      getTransactions()
    }
    mounted.current = true
  }, [page, limit])

  const handleSort = useCallback(
    (key: string) => {
      if (key === sortKey) {
        setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'))
        setPage(1)
      } else {
        setSortKey(key)
        setSortOrder('ASC')
        setPage(1)
      }
    },
    [sortKey]
  )

  const getSupports = async () => {
    const {data} = await handleGetRequest(`/user/detail_profile/${id}/${sortKey}/${sortOrder}`)(setLoading)
    setUser(data)
    setBreadcrumbs([
      {isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home'},
      {
        isActive: false,
        isSeparator: false,
        path: 'home/stottespillere',
        title: 'Støtte',
      },
      {
        isActive: false,
        isSeparator: false,
        path: 'home/stottespillere',
        title: 'Støttespillere',
      },
      {
        isActive: true,
        isSeparator: false,
        path: 'home/stottespillere',
        title: data?.first_name + ' ' + data?.last_name,
      },
    ])
    getTransactions()
  }

  const getAcc = (bank_account: string) => {
    if (bank_account) {
      const acc = bank_account.replace('NO', '')

      return acc.slice(0, 4) + ' ' + acc.slice(4, 6) + ' ' + acc.slice(6, 11)
    }
    return bank_account
  }

  const getLogo = (organisation: {
    organisation_logo: any
    organisation_logo_base64: string
  }): string | undefined => {
    if (organisation?.organisation_logo) {
      return organisation?.organisation_logo
    }
    if (organisation?.organisation_logo_base64) {
      return 'data:image/png;base64,' + organisation?.organisation_logo_base64
    }
    return
  }
  useEffect(() => {
    getSupports()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey, sortOrder])


  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <div>
          <h3 className='fw-bolder my-2'>Støttespiller detaljer</h3>
        </div>

        <div className='d-flex flex-wrap my-2'>
          <div className='me-4'></div>
          <Link to='/home/stottespillere' type='button' className='btn  btn-primary '>
            Tilbake til støttespillere
          </Link>
        </div>
      </div>

      <div className='row'>
        <div className='col-xl-4 '>
          <div className='flex-column flex-lg-row-auto  mb-10 '>
            <div className='card mb-5 mb-xl-8 h-150px'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div
                    className='card symbol symbol-60px me-3 border col-md-4
                  d-flex justify-content-center align-items-center
                  '
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      height: '90px',
                    }}
                  >
                    {user?.image ? (
                      <img
                        src={user?.image || toAbsoluteUrl('/media/svg/avatars/001-boy.svg')}
                        className='  logo svg-icon-cufs  img-fluid img-responsive '
                        alt=''
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    ) : (
                      <i className=' fa-duotone fa-user-astronaut fs-65px'></i>
                    )}
                  </div>
                  <div
                    className='d-flex justify-content-between flex-column align-items-between'
                    style={{
                      height: '86px',
                    }}
                  >
                    <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                      {user?.first_name} {user?.last_name}
                    </a>
                    <div>
                      <span className=' fw-bold d-block fs-7'>Støttespiller siden:</span>
                      <span className=' fw-bold d-block fs-7 me-5'>
                        {moment(user?.created_at).format('DD.MM.YYYY')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-4 '>
          <div className='flex-column flex-lg-row-auto  mb-10'>
            <div className='card mb-5 mb-xl-8 h-150px'>
              <div className='card-body'>
                <div className='row '>
                  <label className='col-lg-6 fw-bold'>E-post</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <a href={`mailto:${user?.email}`} className=' fs-6'>
                      {user?.email}
                    </a>
                  </div>
                </div>

                <div className='row my-2'>
                  <label className='col-lg-6 fw-bold'>Telefon</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>+{user?.mobile_number}</span>
                  </div>
                </div>
                <div className='row my-2'>
                  <label className='col-lg-6 fw-bold'>Bank navn</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>{user?.bank_name}</span>
                  </div>
                </div>

                {/* Konto */}
                <div className='row my-2'>
                  <label className='col-lg-6 fw-bold'>Konto</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>{getAcc(user?.bank_account)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-4 '>
          <div className='flex-column flex-lg-row-auto  mb-10'>
            <div className='card mb-5 mb-xl-8 h-150px'>
              <div className='card-body'>
                <div className='row '>
                  <label className='col-lg-6 fw-bold'>Aktive støtter</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>{user?.active_goal_support_count} stk</span>
                  </div>
                </div>
                <div className='row mt-2'>
                  <label className='col-lg-6 fw-bold'>Pausede støtter</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>{user?.paused_goal_support_count} stk</span>
                  </div>
                </div>
                <div className='row my-2'>
                  <label className='col-lg-6 fw-bold'> Avsluttede støtter</label>
                  <div className='col-lg-6 d-flex justify-content-end'>
                    <span className=' fs-6'>{user?.stopped_goal_support_count} stk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <div className={`card mb-5 mb-xl-8 p-0`}>
        <div className='card-header border-0 pt-5 d-flex'>
          <h3 className='card-title align-items-start flex-column '>
            <span className='card-label fw-bold fs-3 mb-1'>Registrerte støtter</span>
            <span className='text-muted mt-1 fw-bold fs-7'>
           Oversikt over alle registrerte støtter for valgt støttespiller
            </span>
          </h3>

          <div className='col-md-6'>
          
          </div>
        </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 rounded-start' style={{width: '40%'}}
                     onClick={() => handleSort('goal_title')}>
                      FORMÅL
                      {sortKey === 'goal_title' && (
                        <>
                          {sortOrder === 'ASC' ? (
                            <FaSortUp className='ms-2' />
                          ) : (
                            <FaSortDown className='ms-2' />
                          )}
                        </>
                      )}
                      {sortKey !== 'goal_title' && <FaSort className='ms-2' />}
                    </th>

                    <th className='' style={{width: '15%'}}  onClick={() => handleSort('sports_category_name')}>
                      Org
                      {sortKey === 'sports_category_name' && (
                        <>
                          {sortOrder === 'ASC' ? (
                            <FaSortUp className='ms-2' />
                          ) : (
                            <FaSortDown className='ms-2' />
                          )}
                        </>
                      )}
                      {sortKey !== 'sports_category_name' && <FaSort className='ms-2' />}
                      
                    </th>

                    <th className=' ' style={{width: '15%'}}  onClick={() => handleSort('support_amount')}>
                      Støttebeløp
                      {sortKey === 'support_amount' && (
                        <>
                          {sortOrder === 'ASC' ? (
                            <FaSortUp className='ms-2' />
                          ) : (
                            <FaSortDown className='ms-2' />
                          )}
                        </>
                      )}
                      {sortKey !== 'support_amount' && <FaSort className='ms-2' />}
                    </th>
                    <th style={{width: '15%'}}  onClick={() => handleSort('user_total_amount')}>TOTAL STØTTE
                    {sortKey === 'user_total_amount' && (
                        <>
                          {sortOrder === 'ASC' ? (
                            <FaSortUp className='ms-2' />
                          ) : (
                            <FaSortDown className='ms-2' />
                          )}
                        </>
                      )}
                      {sortKey !== 'user_total_amount' && <FaSort className='ms-2' />}
                      </th>
                    <th className='text-end rounded-end px-4' style={{width: '15%'}}  onClick={() => handleSort('status')}>
                      STATUS
                      {sortKey === 'status' && (
                        <>
                          {sortOrder === 'ASC' ? (
                            <FaSortUp className='ms-2' />
                          ) : (
                            <FaSortDown className='ms-2' />
                          )}
                        </>
                      )}
                      {sortKey !== 'status' && <FaSort className='ms-2' />}
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {user?.goal_support_list?.map((goal: any) => (
                    <tr key={goal?._id}>
                      <td>
                        <div
                          className='d-flex align-items-center'
                          // onClick={() => navigation(`/home/formalSingle/${goal?._id}`)}
                        >
                          <div className='img-wrapper me-5'>
                            {getLogo(goal) ? (
                              <img
                                src={getLogo(goal)}
                                alt=''
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                }}
                              />
                            ) : (
                              <i
                                className=' fa-duotone fa-image'
                                style={{
                                  fontSize: '34px',
                                }}
                              ></i>
                            )}
                          </div>
                          <div className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            <Link
                              to={`/home/formalSingle/${goal?.goal_id}`}
                              className='text-dark fw-bold text-hover-primary fs-6'
                            >
                              {goal?.goal_title}
                            </Link>
                            <span className='text-muted fw-semibold d-block font-1'>
                              Oppstart {moment(goal?.created_at).format('DD.MM.YYYY')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {goal?.organisation_name}
                          <span className='text-muted fw-semibold d-block font-1'>
                            {goal?.sports_category_name}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {numberSpacing(goal?.support_amount)}
                        </span>
                      </td>

                      <td>
                        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {numberSpacing(goal?.user_total_amount)}
                        </span>
                      </td>

                      <td className='text-end'>
                        <div className=''>
                          {goal?.status === 'paused' && (
                            <span className='btn btn-sm btn-light-primary status-btn'>Pauset</span>
                          )}
                          {goal?.status === 'active' && (
                            <span className='btn btn-sm btn-light-success status-btn'> Aktiv </span>
                          )}
                          {goal?.status === 'completed' && (
                            <span className='btn btn-sm btn-light-info status-btn'> Fullført </span>
                          )}
                          {goal?.status === 'canceled' && (
                            <span className='btn btn-sm btn-light-danger status-btn'>
                              {' '}
                              Avbrutt{' '}
                            </span>
                          )}

                          <span
                            id='kt_transaction_toggle'
                            onClick={() => setSelectedGoal(goal)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mx-2 min-w-auto'
                          >
                            <i className='fa-duotone fa-memo-circle-info'></i>
                          </span>
                        </div>
                      </td>
                      {/* <td>
                          <span
                            id='kt_transaction_toggle'
                            onClick={() => setSelectedGoal(goal)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 min-w-auto'
                          >
                            <i className='fa-duotone fa-memo-circle-info'></i>
                          </span>
                        </td> */}
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
              <div className='row'>
                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TransactionsDrawer selectedGoal={selectedGoal} selectedUser={id} />
    </>
  )
}
