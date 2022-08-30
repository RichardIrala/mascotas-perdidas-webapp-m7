export const instanciar_send_email_petinfo_page = () => {
  customElements.define(
    "send-email-petinfo-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        this.shadow.innerHTML = `
        <header-el></header-el>
        <report-infopet-el></report-infopet-el>`;
      }
      addListeners() {}
    }
  );
};
