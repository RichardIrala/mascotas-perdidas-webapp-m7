import { sendgrids } from "../lib/sengrids";
import { Pet, User } from "../models/index";

const SENDGRID_SENDER = process.env.SENDGRID_SENDER;

export const sendEmailReport = async (
  petId: number,
  senderUserId: number,
  information: string
) => {
  try {
    const petAndOwnerrInfo: any = await Pet.findOne({
      where: { id: petId },
      include: [User],
    });

    const senderEmail: any = await User.findOne({
      where: { id: senderUserId },
    });

    const petOwnerEmail = petAndOwnerrInfo.User.email;

    const petName = petAndOwnerrInfo.name;

    const msg = {
      to: petOwnerEmail, // A quien va dirigido el correo
      from: SENDGRID_SENDER, // Quien envia el correo (tiene que ser un sender verificado dentro de mi Sendgrid)
      subject: "Reporte de mascota perdida WebApp Richard Irala", //Asunto del mensaje
      text: "Email enviado desde la WebApp de mascotas de Richard Irala", //?
      html: "<strong>WebApp de mascotas</strong>", //mensaje que va a llegar al usuario
      templateId: "d-7b4d05886d7848829db9160b37932802", //id del template que reemplaza al html en el correo
      dynamicTemplateData: {
        email: senderEmail.email,
        information,
        petName,
      },
    };
    const mensaje = await sendgrids.send(msg);

    // console.log(mensaje);
    return { message: "Mensaje enviado" };
  } catch (error) {
    return { message: error.message };
  }
};
