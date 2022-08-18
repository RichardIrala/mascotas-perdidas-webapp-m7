import { state } from "../state";

export const crearInput = (
  labelTitle: string,
  inputName: string,
  inputType?: string,
  extraClass?: string,
  placeholder?: string
) => {
  return /*html*/ `
      <label class="label">
        <span>${labelTitle.toUpperCase()}</span>
        <input class="form__input ${extraClass ? extraClass : ""}" 
        name=${inputName} 
        type=${inputType || "text"}
        placeholder=${placeholder || ""}> 
      </label>
    `;
};

export const inputCss = () => {
  return /*css*/ `
    .label {
      display: flex;
      flex-direction: column;
      ${state.setFont(500)}
    }
    .form__input {
        font-size: 32px;
        border-radius: 2px;
        border: #000000 solid 2px;
        width: 335px;
        ${state.setFont(400)}
    }
  `;
};
