import React, {useContext, useEffect, useState} from 'react'
import $ from 'jquery'
import {handleGetRequest} from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import moment from 'moment'

interface Props {
  id: string
}

const TransactionsTable: React.FC<Props> = ({id}) => {
  const [transactions, setTransactions] = useState<any>([])
  const [limit, setlimit] = useState(10)
  const [page, setPage] = useState(1)
  const {setLoading} = useContext(LoadingContext)

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
    getTransactions()
  }, [page, limit])

  return (
    <div className='table-responsive'>
      <div className='table align-middle gs-0 gy-4'>
        {transactions.finalRes?.map((transaction: any, index: number) => {
          return (
            <>
              <div className='transactions-header row d-flex align-items-center fw-bold text-muted mt-2'>
                <div className='col-md-3 ps-4  rounded-start '>
                  <span className='ps-4 d-block'> Formål : {transaction?.goal_title}</span>
                </div>

                <div className='col-md-3 '>
                  <span>maks beløp : {transaction?.max_amount / 100}</span>
                </div>

                <div className='col-md-3 '>
                  <span className='d-block'>
                    TREKKDATO : {moment(transaction?.created_at).format('DD.MM.YYYY')}
                  </span>
                </div>

                <div
                  className='col-md-3  text-end rounded-end px-4 pe-8  vertical-align-middle
                  '
                >
                  <button onClick={() => showDetails(index)} className='btn btn-info btn-sm'>
                    DETALJER
                  </button>
                </div>
              </div>

              {/* <div id={`details${index}`} className='d-none mt-4 mb-2'>
                <div className='row d-flex align-items-center'>
                  <div className='col-md-3'>
                    <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      &nbsp; &nbsp; DATO
                    </span>
                  </div>
                  <div className='col-md-3'>
                    <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      TRANSAKSJONER
                    </span>
                  </div>
                  <div className='col-md-3'>
                    <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      STØTTEBELØP
                    </span>
                  </div>
                  <div className='col-md-3'>
                    <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6 px-4 text-end'>
                      BELØP &nbsp; &nbsp;
                    </span>
                  </div>
                </div>
                {transaction?.pending_payment_list?.map((pending: any) => {
                  return (
                    <div className='row d-flex align-items-center bg-gray transactions-body mb-4'>
                      <span className='col-md-3 text-dark fw-bold text-hover-primary d-block mb-2 fs-6 d-block'>
                        &nbsp; &nbsp; {moment(pending?.created_at).format('DD.MM.YYYY')}
                      </span>

                      <span className='col-md-3 text-dark fw-bold text-hover-primary d-block mb-2 fs-6 d-block'>
                        {pending?.no_of_transactions}
                      </span>

                      <span className='col-md-3 text-dark fw-bold text-hover-primary d-block mb-2 fs-6 d-block'>
                        {pending?.support_amount}
                      </span>

                      <span className='col-md-3 text-dark fw-bold text-hover-primary d-block mb-2 fs-6 d-block px-4 text-end'>
                        {pending?.amount} &nbsp; &nbsp; &nbsp;
                      </span>
                    </div>
                  )
                })}
              </div> */}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionsTable
