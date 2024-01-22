export default interface Character {
  id?: number;
  name: string;
  status: string;
  species: string;
  image: string;
  listOfEpisodes: string[];
  lastKnownLocation: object;
}
