import { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { handleGetRequest } from '../../services'

type OptionType = {
  _id: any
  label: string
}

const OrgSearch = (props: any) => {
  const { pushOrgProp } = props
  const [value, onChange] = useState<OptionType | null>()

  let hasMore = true
  let searchTerm = ''
  let currentPage = 0

  const loadOptions = async (search: string) => {
    let returnArray: { _id: any; label: string }[] = []

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
        const { data, pagination }: any = await handleGetRequest(`/organisation/search`, {
          params: {
            search,
            base64: true,
            page: pageNo,
            limit: pageSize,
          },
        })(() => {})

        returnArray = data.map((item: any) => {
          return {
            _id: item?._id,
            label: `${item?.org_name} - ${item?.organisation_number}`,
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
      pushOrgProp(value)
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
      placeholder='Søk Organisasjons ...'
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

export default OrgSearch
