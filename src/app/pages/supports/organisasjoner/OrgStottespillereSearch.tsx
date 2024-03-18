import React, {useContext, useEffect, useState} from 'react'
import {OptionsOrGroups, GroupBase} from 'react-select'
import {AsyncPaginate} from 'react-select-async-paginate'
import {handleGetRequest} from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {useNavigate} from 'react-router-dom'

type OptionType = {
  value: number | null
  label: string
}
   
const OrgStottespillereSearch: React.FC = (props:any) => {
  const [value, onChange] = useState<OptionType | null>()
  const {setLoading} = useContext(LoadingContext)
  let hasMore = true
  let searchTerm = ''
  let currentPage = 0
  const navigate = useNavigate()

  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) => {
    let players = []

    if (search === searchTerm) {
      currentPage = currentPage + 1
    } else {
      currentPage = 1
      searchTerm = search
      hasMore = true
    }

    if (search && hasMore) {
      const pageNo = currentPage
      const pageSize = 100

      try {
        const {data, pagination}: any = await handleGetRequest(`/user/search`, {
          params: {
            search,
            page: pageNo,
            limit: pageSize,
          },
        })((e: unknown) => {})

        players = data.map((player: any) => {
          return {
            value: player?._id,
            label: player?.first_name + ' ' + player?.last_name + ' - +' + player?.mobile_number,
          }
        })

        const {page, pages} = pagination

        hasMore = page < pages
      } catch (error) {
        currentPage = 0
        searchTerm = ''
      }
    } else {
      currentPage = 0
      searchTerm = ''
    }

    return {
      options: [...players],
      hasMore,
    }
  }

  useEffect(() => {
    if (value) {
      navigate(`/home/stottespillereSingle/${value.value}`)
    }
  }, [value])

  return (
    <AsyncPaginate
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      debounceTimeout={500}
      components={{
        DropdownIndicator: null,
      }}
      placeholder='Søk støttespillere...'
      className='w-100'
      styles={{
        control: (provided) => ({
          ...provided,
          // // border: ' 1px solid #E6E7E9',
          // // borderRadius: '4px',
          // height: '43px',
          // // bootstrap input
          // fontSize: '14px',
          // lineHeight: '1.42857143',
          // color: '#555',
          // backgroundColor: '#fff',
          // backgroundImage: 'none',
          // border: '1px solid #ccc',
          // borderRadius: '4px',
          // boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
          // transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',

          // border-color: #ebedf2;
          // border-radius: 4px;
          // color: #5d6d7e;
          // font-size: 14px;
          // height: 40px;
          // padding: 10px 15px;

          borderColor: '#c6e0ec',
          borderRadius: '8px',
          color: '#5d6d7e',
          fontSize: '14px',
          height: '46px',
        }),
      }}
      noOptionsMessage={() => (searchTerm ? 'Ingen resultater' : null)}
    />
  )
}

export default OrgStottespillereSearch
