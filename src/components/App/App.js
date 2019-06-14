import React, { useEffect, useState } from "react";
import { without } from "lodash";
import moment from "moment";

import { constants, enums } from "config";

import "./App.css";

import AddAppointments from "components/AddAppointments/AddAppointments";
import SearchAppointments from "components/SearchAppointments/SearchAppointments";
import ListAppointments from "components/ListAppointments/ListAppointments";

function App() {
  const [appointmentId, setAppointmentId] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState(
    appointments
  );

  // API Call
  useEffect(
    () => {
      fetch("./data.json")
        .then(response => response.json())
        .then(json => {
          let id = appointmentId;

          // process the json
          const a = json.map(item => {
            // add item id
            if (!item.id) {
              item.id = id;
              id++;
            }
            return item;
          });
          setAppointmentId(id); // will trigger render
          setAppointments(a); // will trigger render
          setDisplayedAppointments(a); // will trigger render
        })
        .catch(err => {});
    },
    // eslint-disable-next-line
    []
  );

  // delete
  function onDelete(appointment) {
    const a = without(appointments, appointment);
    setAppointments(a); // will trigger render
    setDisplayedAppointments(a); // will trigger render
  }

  // add
  function onAdd(appointment) {
    let id = appointmentId;
    appointment.id = id;
    id++;
    setAppointmentId(id); // will trigger render

    appointments.unshift(appointment);

    setAppointments(appointments); // will trigger render
    setDisplayedAppointments(appointments); // will trigger render
  }

  // update
  function onUpdate(appointment) {
    const idx = appointments.indexOf(appointment);
    appointments.splice(idx, 1, appointment);

    setAppointments(appointments); // will trigger render
    setDisplayedAppointments(appointments); // will trigger render
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
      const petName = appointment.petName.toLowerCase();
      const ownerName = appointment.ownerName.toLowerCase();
      const aptNotes = appointment.aptNotes.toLowerCase();

      return (
        petName.indexOf(searchValue) !== -1 ||
        ownerName.indexOf(searchValue) !== -1 ||
        aptNotes.indexOf(searchValue) !== -1
      );
    });

    setDisplayedAppointments(filteredAppointments);
  }

  // sort
  const [sortBy, setSortBy] = useState(enums.sortBy.aptDate);

  // sort order
  const [sortOrder, setSortOrder] = useState(enums.sortOrder.DESC);
  const sortOrderKey = sortOrder === enums.sortOrder.DESC ? 1 : -1;

  displayedAppointments.sort((a, b) => {
    const sortByKeys = Object.keys(enums.sortBy);
    const key = sortByKeys[sortBy];

    let x = a[key];
    let y = b[key];

    // sort by date is unique
    if (sortBy === enums.sortBy.aptDate) {
      x = moment(x, constants.aptDateFormat).unix();
      y = moment(y, constants.aptDateFormat).unix();
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
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
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
