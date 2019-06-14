import React from "react";
import Moment from "react-moment";
import { FaTimes } from "react-icons/fa";
import { constants } from "config";

const ListAppointments = ({ appointments, onDelete, onUpdate }) => {
  // construct the components list
  const CList = appointments.map(appointment => {
    return (
      <div key={appointment.id} className="pet-item col media py-3">
        <div className="mr-3">
          <button
            className="pet-delete btn btn-sm btn-danger"
            onClick={ev => {
              onDelete(appointment);
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="pet-info media-body">
          <div className="pet-head d-flex">
            <span
              className="pet-name"
              contentEditable
              suppressContentEditableWarning
              onKeyUp={ev => {
                const target = ev.target;
                const value = target.textContent;

                appointment.petName = value;

                onUpdate(appointment);
              }}
            >
              {appointment.petName}
            </span>
            <span className="apt-date ml-auto">
              <Moment
                date={appointment.aptDate}
                parse={constants.aptDateFormat}
                format="dddd, MMM Do, YYYY @ HH:mm"
              />
            </span>
          </div>

          <div className="owner-name">
            <span className="label-item">Owner: </span>
            <span
              contentEditable
              suppressContentEditableWarning
              onKeyUp={ev => {
                const target = ev.target;
                const value = target.textContent;

                appointment.ownerName = value;

                onUpdate(appointment);
              }}
            >
              {appointment.ownerName}
            </span>
          </div>
          <div className="apt-notes">{appointment.aptNotes}</div>
        </div>
      </div>
    );
  });

  return <div className="appointment-list item-list mb-3">{CList}</div>;
};

export default ListAppointments;
