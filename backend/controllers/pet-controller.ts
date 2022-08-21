import { cloudinary } from "../lib/cloudinary";
import { Pet } from "../models/index";
import { indexAlgolia } from "../lib/algolia";

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

export const getPets = async () => {
  return await Pet.findAll();
};

export const getPetsCercaDe = async (lat: number, lng: number) => {
  // Search the index and print the results
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

function petsOfIds(algoliaData: any[], allPets: any[]) {
  const ids = algoliaData.map((data) => data.objectID);
  const pets = allPets.filter((pet) => {
    return ids.includes(pet.id.toString());
  });
  return pets;
}
