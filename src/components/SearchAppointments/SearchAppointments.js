import React from "react";
import { enums } from "config";

const SearchAppointments = ({
  handleSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => {
  return (
    <div className="search-appointments row justify-content-center my-4">
      <div className="col-md-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            aria-label="Search Appointments"
            onChange={ev => {
              handleSearch(ev.target.value);
            }}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort by: <span className="caret" />
            </button>

            <div className="sort-menu dropdown-menu dropdown-menu-right">
              <button
                className={
                  "sort-by dropdown-item" +
                  (sortBy === enums.sortBy.date ? " active" : "")
                }
                onClick={() => {
                  setSortBy(enums.sortBy.date);
                }}
              >
                Date
              </button>
              <button
                className={
                  "sort-by dropdown-item" +
                  (sortBy === enums.sortBy.name ? " active" : "")
                }
                onClick={() => {
                  setSortBy(enums.sortBy.name);
                }}
              >
                Name
              </button>
              <button
                className={
                  "sort-by dropdown-item" +
                  (sortBy === enums.sortBy.host ? " active" : "")
                }
                onClick={() => {
                  setSortBy(enums.sortBy.host);
                }}
              >
                Host
              </button>
              <div role="separator" className="dropdown-divider" />
              <button
                className={
                  "sort-by dropdown-item" +
                  (sortOrder === enums.sortOrder.ASC ? " active" : "")
                }
                onClick={() => {
                  setSortOrder(enums.sortOrder.ASC);
                }}
              >
                Asc
              </button>
              <button
                className={
                  "sort-by dropdown-item" +
                  (sortOrder === enums.sortOrder.DESC ? " active" : "")
                }
                onClick={() => {
                  setSortOrder(enums.sortOrder.DESC);
                }}
              >
                Desc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAppointments;
