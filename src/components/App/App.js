import React, { useEffect, useState } from "react";
import { without } from "lodash";

import "./App.css";

import AddAppointments from "components/AddAppointments/AddAppointments";
import SearchAppointments from "components/SearchAppointments/SearchAppointments";
import ListAppointments from "components/ListAppointments/ListAppointments";

function App() {
  console.log("render App");

  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState(0);

  // API Call
  useEffect(() => {
    console.log("use effect");

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
        setAppointments(a); // will trigger render
        setAppointmentId(id); // will trigger render
      })
      .catch(err => {});
  }, []);

  // delete
  function onDelete(appointment) {
    const a = without(appointments, appointment);
    setAppointments(a); // will trigger render
  }

  const [displayAddForm, setDisplayAddForm] = useState(false);

  // toggle display add form
  function toggleDisplayAddForm() {
    setDisplayAddForm(!displayAddForm);
  }

  // handle add appointment
  function handleAddAppointment(appointment) {
    let id = appointmentId;
    appointment.id = id;
    id++;
    setAppointmentId(id);

    appointments.unshift(appointment);
    setAppointments(appointments);
  }

  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments
                displayForm={displayAddForm}
                toggleDisplayForm={toggleDisplayAddForm}
                handleAdd={handleAddAppointment}
              />
              <SearchAppointments />
              <ListAppointments
                appointments={appointments}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
