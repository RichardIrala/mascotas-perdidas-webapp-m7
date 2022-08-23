import algoliasearch from "algoliasearch";

// Conecta y autentica con nuestra app de algolia
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

// Crea un nuevo index y record
export const indexAlgolia = client.initIndex(process.env.ALGOLIA_INDEX);
