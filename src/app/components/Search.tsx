import React from "react";
import { useDebounce } from "../../_metronic/helpers";

interface Props {
  onChange: (search: string) => void;
  hasButton?: boolean;
  placeholder?: string;
}

const Search: React.FC<Props> = ({ onChange, hasButton, placeholder }) => {
  const [search, setSearch] = React.useState("");
  const debouncedSearchTerm: any = useDebounce(search, 500);

  React.useEffect(() => {
    if (hasButton) return;
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // bootstrap input with search icon
  return (
    <div className="form-group has-search d-flex">
      <input
        type="text"
        className="form-control"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        placeholder={placeholder || "Search"}
      />
      {hasButton && (
        <>
          &nbsp;
          <button
            onClick={() => onChange(search)}
            className="btn btn-primary "
            type="submit"
          >
            Search
          </button>
        </>
      )}
    </div>
  );
};

export default Search;
