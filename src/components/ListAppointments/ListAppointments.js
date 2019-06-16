import React from "react";
import Moment from "react-moment";
import { FaTimes } from "react-icons/fa";
import { constants } from "config";

const ListAppointments = ({ appointments, onDelete, onUpdate }) => {
  // construct the components list
  const CList = appointments.map(appointment => {
    return (
      <div key={appointment._id} className="appointment col media py-3">
        <div className="mr-3">
          <button
            className="delete btn btn-sm btn-danger"
            onClick={ev => {
              onDelete(appointment);
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="media-body">
          <div className="d-flex">
            <span
              className="name"
              contentEditable
              suppressContentEditableWarning
              onBlur={ev => {
                const target = ev.target;
                const value = target.textContent;
                appointment[constants.apiFields.name] = value;
                onUpdate(appointment);
              }}
            >
              {appointment[constants.apiFields.name]}
            </span>
            <span className="date ml-auto">
              <Moment
                date={appointment[constants.apiFields.date]}
                format="dddd, MMM Do, YYYY @ HH:mm"
              />
            </span>
          </div>

          <div className="host">
            <span className="label">Host: </span>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={ev => {
                const target = ev.target;
                const value = target.textContent;
                appointment[constants.apiFields.host] = value;
                onUpdate(appointment);
              }}
            >
              {appointment[constants.apiFields.host]}
            </span>
          </div>
          <div className="notes">{appointment[constants.apiFields.notes]}</div>
        </div>
      </div>
    );
  });

  return <div className="list-appointments item-list mb-3">{CList}</div>;
};

export default ListAppointments;
