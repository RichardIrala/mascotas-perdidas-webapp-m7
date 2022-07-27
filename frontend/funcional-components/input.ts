export const crearInput = (
  labelTitle: string,
  inputName: string,
  inputType?: string
) => {
  return /*html*/ `
      <label class="label">
        <span>${labelTitle}</span>
        <input class="form__input" name=${inputName} type=${
    inputType || "text"
  }> 
      </label>
    `;
};

export const inputCss = () => {
  return /*css*/ `
    .label {
      display: flex;
      flex-direction: column;
    }
    .form__input {
        font-size: 32px;
        border-radius: 2px;
        border: #000000 solid 2px;
        width: 335px;
    }
  `;
};
