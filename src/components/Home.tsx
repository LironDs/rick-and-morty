import { FunctionComponent, useEffect, useState } from "react";
import Episode from "../interfaces/Episode";
import {
  getEpisodes,
  getSeasonOne,
  getSeasonTwo,
  getSeasonThree,
  getSeasonFour,
  getSeasonFive,
} from "../services/episodeServices";
import { Link } from "react-router-dom";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (selectedSeason) {
        try {
          let response;

          switch (selectedSeason) {
            case "1":
              response = await getSeasonOne();
              break;
            case "2":
              response = await getSeasonTwo();
              break;
            case "3":
              response = await getSeasonThree();
              break;
            case "4":
              response = await getSeasonFour();
              break;
            case "5":
              response = await getSeasonFive();
              break;
            default:
              response = await getEpisodes();
              break;
          }

          setEpisodes(response.data);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      }
    };

    fetchEpisodes();
  }, [selectedSeason]);

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <>
      <div className="container">
        <select onChange={handleSeasonChange}>
          <option value="">--Please choose a Season--</option>
          <option value="1">Season One</option>
          <option value="2">Season Two</option>
          <option value="3">Season Three</option>
          <option value="4">Season Four</option>
          <option value="5">Season Five</option>
        </select>
      </div>

      <div>
        {episodes.map((episode) => (
          <Link key={episode.id} to={`/episode/${episode.id}`}>
            <div>{episode.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
