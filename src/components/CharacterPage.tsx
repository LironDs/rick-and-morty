import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: [];
  location: {
    name: string;
  };
  firstSeenIn: string;
}

interface CharacterPageProps {}

const CharacterPage: FunctionComponent<CharacterPageProps> = () => {
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [episodeNumbers, setEpisodeNumbers] = useState<number[] | null>(null);
  const [firstEpisodeNumber, setFirstEpisodeNumber] = useState<number | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        const character = characterResponse.data as Character;
        setCharacterData(character);

        // Extract episode numbers from episode URLs
        const extractedEpisodeNumbers = character.episode.map((episodeUrl) => {
          const episodeId = (episodeUrl as string).split("/").pop(); // Extract the last part of the URL
          return episodeId ? parseInt(episodeId, 10) : null; // Parse as integer
        });

        // Set episode numbers state
        setEpisodeNumbers(
          extractedEpisodeNumbers.filter((episodeNumber) => episodeNumber !== null) as number[]
        );
        setFirstEpisodeNumber(extractedEpisodeNumbers[0] ?? null);
      } catch (error) {
        console.error(`Error fetching character details for character ID ${id}:`, error);
      }
    };

    fetchCharacterData();
  }, [id]);
  if (characterData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container" style={{ marginBottom: "50px" }}>
        <div className="row text-center">
          <h3 className="">{characterData.name}</h3>

          <div className="col-md">
            <img src={characterData.image} className=" col-md" alt={characterData.name} />
          </div>
          <div className="col">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Status: {characterData.status}</li>
              <li className="list-group-item">Species: {characterData.species}</li>
              <li className="list-group-item">
                List of episodes numbers: {episodeNumbers?.join(", ")}
              </li>
              <li className="list-group-item">
                Last known location: {characterData.location.name}
              </li>
              <li className="list-group-item">First episode: {firstEpisodeNumber}</li>
            </ul>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-info" onClick={() => navigate("/")}>
              Home
            </button>

            <button type="button" className="btn btn-info" onClick={() => navigate(-1)}>
              Prev
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
