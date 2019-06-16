import React, { useEffect, useState } from "react";
import moment from "moment";

import { constants, enums } from "config";

import "./App.css";

import AddAppointments from "components/AddAppointments/AddAppointments";
import SearchAppointments from "components/SearchAppointments/SearchAppointments";
import ListAppointments from "components/ListAppointments/ListAppointments";

function validateResponse(response) {
  if (!response.ok) {
    throw response;
  }
  return response;
}

const commonHeaders = {
  "content-type": "application/json",
  "cache-control": "no-cache",
  "x-apikey": constants.apiKey
};

function App() {
  const [apiCall, setApiCall] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState(
    appointments
  );

  // API call
  useEffect(() => {
    fetch(constants.appointmentsApiPath, {
      method: "GET",
      headers: commonHeaders
    })
      .then(validateResponse)
      .then(response => response.json())
      .then(json => {
        const a = json;
        if (Array.isArray(a)) {
          setAppointments(a); // will trigger render
          setDisplayedAppointments(a); // will trigger render
        }
      })
      .catch(err => {
        console.error(`GET Appointments Failed.`);
      });
  }, [apiCall]);

  // delete
  async function onDelete(appointment) {
    return fetch(`${constants.appointmentsApiPath}/${appointment._id}`, {
      method: "DELETE",
      headers: commonHeaders
    })
      .then(validateResponse)
      .then(response => {
        setApiCall(!apiCall);
        return response;
      })
      .catch(err => {
        console.error(`DELETE Appointment ID "${appointment._id}" Failed.`);
      });
  }

  // add
  async function onAdd(appointment) {
    return fetch(constants.appointmentsApiPath, {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify(appointment)
    })
      .then(validateResponse)
      .then(response => {
        setApiCall(!apiCall);
        return response;
      });
  }

  // update
  async function onUpdate(appointment) {
    return fetch(`${constants.appointmentsApiPath}/${appointment._id}`, {
      method: "PUT",
      headers: commonHeaders,
      body: JSON.stringify(appointment)
    })
      .then(validateResponse)
      .then(response => {
        setApiCall(!apiCall);
        return response;
      })
      .catch(err => {
        console.error(`PUT Appointment ID "${appointment._id}" Failed.`);
      });
  }

  /*
   Add Form
   *******************************************************/

  const [displayAddForm, setDisplayAddForm] = useState(false);

  // toggle display add form
  function toggleDisplayAddForm() {
    setDisplayAddForm(!displayAddForm);
  }

  /*
   Search and Sort Appointments
   *******************************************************/

  // handle search
  function handleSearch(searchValue) {
    // normalize search value
    searchValue = searchValue.toLowerCase();

    const filteredAppointments = appointments.filter(appointment => {
      // normalize values
      const name = appointment[constants.apiFields.name].toLowerCase();
      const host = appointment[constants.apiFields.host].toLowerCase();
      const notes = appointment[constants.apiFields.notes].toLowerCase();

      return (
        name.indexOf(searchValue) !== -1 ||
        host.indexOf(searchValue) !== -1 ||
        notes.indexOf(searchValue) !== -1
      );
    });

    setDisplayedAppointments(filteredAppointments);
  }

  // sort
  const [sortBy, setSortBy] = useState(enums.sortBy.date);

  // sort order
  const [sortOrder, setSortOrder] = useState(enums.sortOrder.DESC);
  const sortOrderKey = sortOrder === enums.sortOrder.DESC ? 1 : -1;

  displayedAppointments.sort((a, b) => {
    const sortByKeys = Object.keys(enums.sortBy);
    const key = sortByKeys[sortBy];

    let x = a[key];
    let y = b[key];

    // sort by date is unique
    if (sortBy === enums.sortBy.date) {
      x = moment(x, constants.dateFormat).unix();
      y = moment(y, constants.dateFormat).unix();
    } else {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }

    if (x > y) {
      return -1 * sortOrderKey;
    }
    if (x < y) {
      return sortOrderKey;
    }
    return 0;
  });

  /*
   Render
   *******************************************************/

  return (
    <main className="page bg-white">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="container">
              <AddAppointments
                displayForm={displayAddForm}
                toggleDisplayForm={toggleDisplayAddForm}
                handleAdd={onAdd}
              />
              <SearchAppointments
                handleSearch={handleSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <ListAppointments
                appointments={displayedAppointments}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
