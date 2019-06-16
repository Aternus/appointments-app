import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import moment from "moment";
import _ from "lodash";
import useForm from "hooks/useForm";
import { constants } from "config";

const formFields = {
  name: "name",
  host: "host",
  notes: "notes",
  date: "date",
  time: "time"
};

const AddAppointments = ({ displayForm, toggleDisplayForm, handleAdd }) => {
  const { getField, updateField, clear } = useForm();
  const [errors, setErrors] = useState({});

  // on submit
  function onSubmit(ev) {
    ev.preventDefault();

    // calculate moment
    const m = moment(
      `${getField(formFields.date)} ${getField(formFields.time)}`,
      constants.dateFormat
    );

    // format form data
    const appointment = {
      [constants.apiFields.name]: getField(formFields.name),
      [constants.apiFields.host]: getField(formFields.host),
      [constants.apiFields.notes]: getField(formFields.notes),
      [constants.apiFields.date]: m.toISOString()
    };

    // add appointment
    handleAdd(appointment)
      .then(response => {
        // clear form
        clear();

        // clear errors
        setErrors({});

        // close form
        toggleDisplayForm();
      })
      .catch(response => {
        response.json().then(setErrors);
      });
  }

  return (
    <div
      className={
        "add-appointments card textcenter mt-3" +
        (displayForm ? " show-body" : "")
      }
    >
      <div
        className="add-appointments__header card-header bg-primary text-white"
        onClick={ev => {
          toggleDisplayForm();
        }}
      >
        {displayForm ? <FaMinus /> : <FaPlus />}
        &nbsp; Add Appointment
      </div>

      <div className="add-appointments__body card-body">
        <form noValidate onSubmit={onSubmit}>
          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor={formFields.name}
            >
              Name
            </label>
            <div className="col-md-10">
              <input
                id={formFields.name}
                type="text"
                className="form-control"
                name={formFields.name}
                value={getField(formFields.name)}
                placeholder="Name..."
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor={formFields.host}
            >
              Host
            </label>
            <div className="col-md-10">
              <input
                id={formFields.host}
                type="text"
                className="form-control"
                name={formFields.host}
                value={getField(formFields.host)}
                placeholder="Host..."
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor={formFields.date}
            >
              Date
            </label>
            <div className="col-md-4">
              <input
                id={formFields.date}
                type="date"
                className="form-control"
                name={formFields.date}
                value={getField(formFields.date)}
                onChange={updateField}
              />
            </div>
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor={formFields.time}
            >
              Time
            </label>
            <div className="col-md-4">
              <input
                id={formFields.time}
                type="time"
                className="form-control"
                name={formFields.time}
                value={getField(formFields.time)}
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 text-md-right"
              htmlFor={formFields.notes}
            >
              Notes
            </label>
            <div className="col-md-10">
              <textarea
                id={formFields.notes}
                className="form-control"
                rows="4"
                cols="50"
                name={formFields.notes}
                value={getField(formFields.notes)}
                placeholder="Appointment Notes"
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row mb-0">
            <div className="col-md-2 text-md-right">
              {!_.isEmpty(errors) ? "Errors" : ""}
            </div>
            <div className="col-md-6">
              {!_.isEmpty(errors) && (
                <ul>
                  {errors.list.map((error, idx) => {
                    return (
                      <li key={idx}>
                        {_.capitalize(error.field)}: {error.message[0]}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary d-block ml-auto">
                Add Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
