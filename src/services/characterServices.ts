import axios from "axios";

let api: string = "https://rickandmortyapi.com/api/character";

export function getCharacter(id: string) {
  return axios.get(`${api}/${id}`);
}
