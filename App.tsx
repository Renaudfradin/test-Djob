import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import './App.module.css';
import { ICharacter, IInfo } from './interfaces';
import Character from './character-details/Character';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

function Home() {
  const navigate = useNavigate();
  //handle reult state
  const [results, updateResults] = useState<ICharacter[]>([]);
  const [page, updatePage] = useState<IInfo>({
    current: defaultEndpoint,
  } as IInfo);
  const [inputvalue, updateinputvalue] = useState('');

  const { current } = page;

  // effect for get all characters
  useEffect(() => {
    async function requestResult() {
      const res = await fetch(defaultEndpoint);
      const nextData = await res.json();

      updateResults((prev: ICharacter[]) => {
        return [...prev, ...nextData.results];
      });

      updatePage((prev: IInfo) => {
        return { ...prev, ...nextData.info };
      });
    }
    requestResult();
  }, []);
  /*
   ** TODO: logic to display more results comes here
   ** @see Endpoint for load more: https://rickandmortyapi.com/api/character?page=${nextPage}
   */
  function handleLoadMore() {
    console.log();
  }

  /*
   ** TODO: logic to search results comes here
   ** Endpoint for search result: https://rickandmortyapi.com/api/character/?name=${searchTerm}
   */
  function handleChange(event) {
    updateinputvalue(event.target.value);
  }

  function handleOnSubmitSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputvalue);

    fetch(`${defaultEndpoint}?name=${inputvalue}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.results);
        updateResults(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">The Rick and Morty</h1>

        <p className="description">Welcome to Rick and Morty world</p>
        <form className="search" onSubmit={handleOnSubmitSearch}>
          <input
            name="query"
            type="search"
            value={inputvalue}
            onChange={handleChange}
          />
          <button>Search</button>
        </form>

        <ul className="grid">
          {results.length &&
            results.map((result) => {
              const { id, name, image } = result;
              return (
                <li key={id} className="card">
                  <div
                    onClick={() =>
                      navigate(`/character/${id}`, { state: { id } })
                    }
                  >
                    <img src={image} alt={`${name} Thumbnail`} />
                    <h3>{name}</h3>
                  </div>
                </li>
              );
            })}
        </ul>
        <p>
          <button className="btn" onClick={handleLoadMore}>
            Load More
          </button>
        </p>
      </main>

      <footer className="footer">
        <a
          href="https://sites.google.com/devoteam.com/ct-studio-front/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' Devoteam Pole Front'}
        </a>
      </footer>
    </div>
  );
}

// routes of the app
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/character/:id', element: <Character /> },
    { path: '*', element: <Home /> },
  ]);
  return routes;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
