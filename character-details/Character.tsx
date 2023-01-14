import * as React from 'react';
import { ICharacter, IOrigin, ILocation } from '../interfaces';
import './Character.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export default function Character() {
  /*
   ** TODO: Implantation of display result page logic + UI + back to home page
   ** @see Endpoint for character details: https://rickandmortyapi.com/api/character/${characterId}
   */
  const param = useParams();
  const idParams = param.id;
  const [character, updatecharactert] = useState<ICharacter[]>([]);
  const [origin, updateorigin] = useState<IOrigin[]>([]);
  const [location, updatelocation] = useState<ILocation[]>([]);

  useEffect(() => {
    fetch(`${defaultEndpoint}${idParams}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        updatecharactert(data);
        updateorigin(data.origin);
        updatelocation(data.location);
        //console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="titleCharacter">Character Details</h2>
      <div className="layout">
        <div>
          <img
            className="imgChaaracter"
            src={character.image}
            alt={character.image}
          />
        </div>
        <div className="infoCharacter">
          <div>
            <p>Name : {character.name}</p>
            <p className="statusChaaracter">{character.status}</p>
          </div>
          <p>Gender : {character.gender}</p>
          <p>Species : {character.species}</p>
          <p>Locations : {location.name}</p>
          <p>Originaly From : {origin.name}</p>
        </div>
      </div>
      <Link to="/" className="linkBack">
        Back to All Characters
      </Link>
    </div>
  );
}
