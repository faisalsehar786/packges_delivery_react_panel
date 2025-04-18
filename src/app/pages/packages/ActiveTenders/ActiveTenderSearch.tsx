import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";
import { handleGetRequest } from "../../../services";

type OptionType = {
  value: number | null;
  label: string;
};

const ActiveTenderSearch = (props: any) => {
  const { status } = props;

  const [value, onChange] = useState<OptionType | null>();
  let hasMore = true;
  let searchTerm = "";
  let currentPage = 0;
  const navigate = useNavigate();

  const loadOptions = async (search: string) => {
    let goals = [];

    if (search === searchTerm) {
      currentPage += 1;
    } else {
      currentPage = 1;
      searchTerm = search;
      hasMore = true;
    }

    if (search && hasMore) {
      const pageNo = currentPage;
      const pageSize = 100;

      try {
        const { data, pagination }: any = await handleGetRequest(
          `/tender/admin_get_all?check_cond=true`,
          {
            params: {
              search,
              page: pageNo,
              limit: pageSize,
              withOrCond: true,
              is_for_driver: true,
              order_status: status ? status : "processing",
              status: "accepted",
            },
          }
        )(() => {});

        goals = data.map((goal: any) => {
          return {
            value: goal?._id,
            label: `${goal.title} - ${goal?.order?.order_no}`,
          };
        });

        const { page, pages } = pagination;

        hasMore = page < pages;
      } catch (error) {
        currentPage = 0;
        searchTerm = "";
      }
    } else {
      currentPage = 0;
      searchTerm = "";
    }

    return {
      options: [...goals],
      hasMore,
    };
  };

  useEffect(() => {
    if (value) {
      navigate(`/home/published_job/${value.value}`);
    }
  }, [value]);

  return (
    <AsyncPaginate
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      debounceTimeout={500}
      components={{
        DropdownIndicator: null,
      }}
      placeholder="Søk sendinger..."
      className="w-100"
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

          borderColor: "#c6e0ec",
          borderRadius: "8px",
          color: "#5d6d7e",
          fontSize: "14px",
          height: "46px",
        }),
      }}
      noOptionsMessage={() => (searchTerm ? "Ingen resultater" : null)}
    />
  );
};

export default ActiveTenderSearch;
