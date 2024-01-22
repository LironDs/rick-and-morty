import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

interface EpisodePageProps {}

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  characters: string[]; // URLs of characters
  url: string;
  created: string;
}

const EpisodePage: FunctionComponent<EpisodePageProps> = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characterData, setCharacterData] = useState<Character[]>([]);

  useEffect(() => {
    const fetchEpisodeAndCharacters = async () => {
      try {
        // Fetch episode details
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        const episodeData: Episode = episodeResponse.data;

        // Set episode state
        setEpisode(episodeData);

        // Fetch character data for each character URL
        const characterDataArray = await Promise.all(
          episodeData.characters.map(async (characterUrl: string) => {
            try {
              const characterResponse = await axios.get(characterUrl);
              return characterResponse.data as Character;
            } catch (error) {
              console.error(`Error fetching character data for ${characterUrl}:`, error);
              return { id: -1, name: "Unknown Character" } as Character; // Provide a default value for the error case
            }
          })
        );

        // Set character data state
        setCharacterData(characterDataArray);
      } catch (error) {
        console.error(`Error fetching episode details for episode ID ${id}:`, error);
      }
    };

    fetchEpisodeAndCharacters();
  }, [id]);

  if (!episode) {
    return <div>Loading...</div>; // Add a loading indicator while data is being fetched
  }

  return (
    <div className="container-fluid " style={{ marginBottom: "50px" }}>
      {/* <div className="card"> */}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h1>Episode Name: {episode.name}</h1>
        </li>
        <li className="list-group-item">Air Date: {episode.air_date}</li>
        <h4>Character Names:</h4>
        <div className="row justify-content-center">
          {characterData.map((character, index) => (
            <div className="card" style={{ width: "18rem", margin: "10px" }}>
              <Link to={`/character/${character.id}`}>
                <h5 className="card-title" key={index}>
                  {character.name}
                </h5>

                <div>
                  <img
                    src={character.image}
                    alt={character.name}
                    width={200}
                    className="card-img-top"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ul>
      {/* </div> */}
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-info" onClick={() => navigate("/")}>
          Home
        </button>

        <button type="button" className="btn btn-info" onClick={() => navigate(-1)}>
          Prev
        </button>
      </div>
    </div>
  );
};

export default EpisodePage;
