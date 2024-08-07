import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  PaginationState,
  QUERIES,
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  stringifyRequestQuery,
} from "../../../../../../_metronic/helpers";
import { useQueryRequest } from "./QueryRequestProvider";
import { User } from "./_models";
import { getUsers } from "./_requests";

const QueryResponseContext = createResponseContext<User>(initialQueryResponse);
const QueryResponseProvider: FC = ({ children }) => {
  const { state } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getUsers(query);
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  return (
    <QueryResponseContext.Provider
      value={{ isLoading: isFetching, refetch, response, query }}
    >
      {children}
    </QueryResponseContext.Provider>
  );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const { response } = useQueryResponse();
  if (!response) {
    return [];
  }

  return response?.data || [];
};

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  };

  const { response } = useQueryResponse();
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState;
  }

  return response.payload.pagination;
};

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse();
  return isLoading;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseLoading,
  useQueryResponsePagination,
};
