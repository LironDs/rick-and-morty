import axios from "axios";

let api: string = "https://rickandmortyapi.com/api/episode";

export function getEpisodes() {
  return axios.get(api);
}

export function getSeasonOne() {
  return axios.get(`${api}/1,2,3,4,5,6,7,8,9,10,11`);
}
export function getSeasonTwo() {
  return axios.get(`${api}/12,13,14,15,16,17,18,19,20,21`);
}
export function getSeasonThree() {
  return axios.get(`${api}/22,23,24,25,26,27,28,29,30,31`);
}
export function getSeasonFour() {
  return axios.get(`${api}/32,33,34,35,36,37,38,39,40,41`);
}

export function getSeasonFive() {
  return axios.get(`${api}/42,43,44,45,46,47,48,49,50,51`);
}

export function getEpisodeById(param: string) {
  return axios.get(`${api}/${param}`);
}
