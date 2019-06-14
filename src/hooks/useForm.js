import { useState } from "react";

function useForm() {
  const [state, setState] = useState({});

  function updateField(ev) {
    const target = ev.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const newState = {
      ...state,
      [name]: value
    };

    setState(newState);
  }

  function getField(fieldName) {
    if (fieldName in state) {
      return state[fieldName];
    }
    return "";
  }

  function clear() {
    setState({});
  }

  return { formData: state, getField, updateField, clear };
}

export default useForm;
