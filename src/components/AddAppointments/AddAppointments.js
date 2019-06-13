import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import useForm from "hooks/useForm";

const AddAppointments = ({ displayForm, toggleDisplayForm, handleAdd }) => {
  const { getField, updateField, clear } = useForm();

  // on submit
  function onSubmit(ev) {
    ev.preventDefault();

    // format form data
    const appointment = {
      petName: getField("petName"),
      ownerName: getField("ownerName"),
      aptNotes: getField("aptNotes"),
      aptDate: `${getField("aptDate")} ${getField("aptTime")}`
    };

    // add appointment
    handleAdd(appointment);

    // clear form
    clear();

    // close form
    toggleDisplayForm();
  }

  return (
    <div
      className={
        "card textcenter mt-3" + (displayForm ? "" : " add-appointment")
      }
    >
      <div
        className="apt-addheading card-header bg-primary text-white"
        onClick={ev => {
          toggleDisplayForm();
        }}
      >
        {displayForm ? <FaMinus /> : <FaPlus />}
        &nbsp; Add Appointment
      </div>

      <div className="card-body">
        <form id="aptForm" noValidate onSubmit={onSubmit}>
          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="petName"
            >
              Pet Name
            </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                name="petName"
                value={getField("petName")}
                placeholder="Pet's Name"
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="ownerName"
            >
              Pet Owner
            </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                name="ownerName"
                value={getField("ownerName")}
                placeholder="Owner's Name"
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptDate"
            >
              Date
            </label>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="aptDate"
                value={getField("aptDate")}
                id="aptDate"
                onChange={updateField}
              />
            </div>
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptTime"
            >
              Time
            </label>
            <div className="col-md-4">
              <input
                type="time"
                className="form-control"
                name="aptTime"
                value={getField("aptTime")}
                id="aptTime"
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-md-2 text-md-right" htmlFor="aptNotes">
              Apt. Notes
            </label>
            <div className="col-md-10">
              <textarea
                className="form-control"
                rows="4"
                cols="50"
                name="aptNotes"
                value={getField("aptNotes")}
                id="aptNotes"
                placeholder="Appointment Notes"
                onChange={updateField}
              />
            </div>
          </div>

          <div className="form-group form-row mb-0">
            <div className="offset-md-2 col-md-10">
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
