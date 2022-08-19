import { state } from "../state";

export const crearTextArea = (
  labelTitle: string,
  inputName: string,
  inputType?: string,
  extraClass?: string,
  placeholder?: string
) => {
  return /*html*/ `
    <label class="label--textarea">
      <span>${labelTitle.toUpperCase()}</span>
      <textarea class="form__textarea ${extraClass ? extraClass : ""}" 
      name=${inputName} 
      type=${inputType || "text"}
      rows="5"
      placeholder=${placeholder || ""}></textarea>
    </label>
  `;
};

export const textareaCss = () => {
  return /*css*/ `
      .label--textarea {
        display: flex;
        flex-direction: column;
        ${state.setFont(500)}
      }
      .form__textarea {
          font-size: 32px;
          border-radius: 2px;
          border: #000000 solid 2px;
          width: 335px;
          ${state.setFont(400)}
          resize: none;
      }
    `;
};
