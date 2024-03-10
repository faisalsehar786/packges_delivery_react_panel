import { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { handleGetRequest } from '../../services'

const OrgUsersSearch = (props: any) => {
  const { pushOrgUserProp } = props
  const [value, onChange] = useState<any>()
  let hasMore = true
  let searchTerm = ''
  let currentPage = 0

  const loadOptions = async (search: string) => {
    let returnArray = []

    if (search === searchTerm) {
      currentPage += 1
    } else {
      currentPage = 1
      searchTerm = search
      hasMore = true
    }

    if (search && hasMore) {
      const pageNo = currentPage
      const pageSize = 100

      try {
        const { data, pagination }: any = await handleGetRequest(
          `/organisation_user/search_org_user`,
          {
            params: {
              search,
              page: pageNo,
              limit: pageSize,
            },
          }
        )(() => {})

        returnArray = data.map((item: any) => {
          return {
            _id: item?._id,
            org_id: item?.organisation_id,
            label: `${item?.first_name} ${item?.last_name} - ${item?.email} - +${item?.mobile_number}`,
          }
        })

        const { page, pages } = pagination

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
      options: [...returnArray],
      hasMore,
    }
  }

  useEffect(() => {
    if (value) {
      pushOrgUserProp(value)
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
      placeholder='Søk Organisasjons brukere...'
      className='form-control form-control-sm border-0 p-1'
      styles={{
        control: (provided) => ({
          ...provided,
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

export default OrgUsersSearch
