import * as sgMail from "@sendgrid/mail";

//Conexión con Sendgrids
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export { sgMail as sendgrids };
