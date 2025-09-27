import React from "react";
import Moment from "react-moment";
import { FaTimes } from "react-icons/fa";
import { constants } from "config";

import "./ListAppointments.scss";

const ListAppointments = ({ appointments, onDelete, onUpdate }) => {
  // construct the components list
  const CList = appointments.map((appointment) => {
    return (
      <div
        key={appointment._id}
        className="appointment row justify-content-between py-3"
      >
        <div className="col-11">
          <div className="row">
            <div
              className="col name"
              contentEditable
              suppressContentEditableWarning
              onBlur={(ev) => {
                const target = ev.target;
                const value = target.textContent;
                appointment[constants.apiFields.name] = value;
                onUpdate(appointment);
              }}
            >
              {appointment[constants.apiFields.name]}
            </div>
            <div className="col-auto date">
              <Moment
                date={appointment[constants.apiFields.date]}
                format="dddd, MMM Do, YYYY @ HH:mm"
              />
            </div>
          </div>

          <div className="row mb-3 host">
            <div className="col">
              <span className="label">Host: </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(ev) => {
                  const target = ev.target;
                  const value = target.textContent;
                  appointment[constants.apiFields.host] = value;
                  onUpdate(appointment);
                }}
              >
                {appointment[constants.apiFields.host]}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="notes">
                {appointment[constants.apiFields.notes]}
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button
            className="delete btn btn-sm btn-danger"
            onClick={(ev) => {
              onDelete(appointment);
            }}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    );
  });

  return <div className="list-appointments item-list mb-3">{CList}</div>;
};

export default ListAppointments;
