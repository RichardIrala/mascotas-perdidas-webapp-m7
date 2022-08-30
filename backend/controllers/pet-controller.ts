import { cloudinary } from "../lib/cloudinary";
import { Pet } from "../models/index";
import { indexAlgolia } from "../lib/algolia";

//Subida de imagen a Cloudinary
const uploadImage = async (pictureURL: string) => {
  if (pictureURL) {
    const imagen = await cloudinary.uploader.upload(pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    return imagen.secure_url;
  }
};

//Creación de una nueva mascota a los reportes
export const newPet = async (
  UserId: number,
  name: string,
  longPictureURL: string,
  last_location: string,
  lat: number,
  lng: number,
  description?: string
) => {
  try {
    const pictureURL = await uploadImage(longPictureURL);
    const pet = await Pet.create({
      UserId,
      name,
      pictureURL,
      last_location,
      lat,
      lng,
      description,
    });
    console.log(pet, "Se ha creado la mascota nueva");

    const record = {
      objectID: pet.get("id"),
      last_location,
      _geoloc: {
        lat,
        lng,
      },
    };
    const newLocationAlgolia = await indexAlgolia
      .saveObject(record)
      .wait()
      .catch((err) => err);

    return { pet, newLocationAlgolia };
  } catch (error) {
    return { error };
  }
};

//Retorna todas las mascotas registradas
export const getPets = async () => {
  return await Pet.findAll();
};

//Retorna todas las mascotas cerca de X ubicación
export const getPetsCercaDe = async (lat: number, lng: number) => {
  try {
    const { hits } = await indexAlgolia.search("", {
      aroundLatLng: `${lat}, ${lng}`,
      // //aroundRadius esta expresado en metros
      aroundRadius: kmToMeters(100),
    });

    const allPets = await getPets();

    return petsOfIds(hits, allPets);
  } catch (error) {
    return { error };
  }

  function kmToMeters(kilometers: number) {
    return kilometers * 1000;
  }
};

//Busca y retorna pets reportados por un usuario particular
export const petsReportedBy = async (UserId: string) => {
  try {
    const pets = await Pet.findAll({ where: { UserId } });
    return pets;
  } catch (error) {
    return { message: error.message };
  }
};

//Marcar mascota como encontrada
export const petFounded = async (id: number, UserId: number) => {
  try {
    const updatedPet = await Pet.update(
      { founded: true },
      {
        where: {
          id,
          UserId,
        },
      }
    );
    if (updatedPet[0] == 0) {
      return {
        message: "el ID de la mascota no existe o su dueño no es el indicado",
      };
    } else return { message: "Nos alegra saber que encontraron a tu mascota" };
  } catch (error) {
    return { error: error.message };
  }
};

//Modifica datos de una mascota reportada

export const modifyPetInfo = async (
  UserId: number,
  PetId: number,
  { last_location, lat, lng, name, pictureURL }
) => {
  try {
    const newPic = await uploadImage(pictureURL);
    const object: any = {};

    if (last_location) {
      object.last_location = last_location;
    }

    if (lat) {
      object.lat = lat;
    }

    if (lng) {
      object.lng = lng;
    }

    if (name) {
      object.name = name;
    }

    if (newPic) {
      object.pictureURL = newPic;
    }

    const pet = await Pet.update(object, { where: { UserId, id: PetId } });

    const record = {
      objectID: PetId,
      last_location,
      _geoloc: {
        lat,
        lng,
      },
    };
    const newLocationAlgolia = await indexAlgolia
      .saveObject(record)
      .wait()
      .catch((err) => err);

    if (pet[0] == 1 && newLocationAlgolia.objectID == PetId) {
      console.log(newLocationAlgolia);
      return { message: "Datos actualizados" };
    } else {
      return { message: "Datos no actualizados" };
    }
  } catch (error) {
    return { message: error.message };
  }
};

function petsOfIds(algoliaData: any[], allPets: any[]) {
  const ids = algoliaData.map((data) => data.objectID);
  const pets = allPets.filter((pet) => {
    return ids.includes(pet.id.toString());
  });
  return pets;
}
