import { useState } from "react";
import { Link } from "react-router-dom";
import config from '../config';

const Home = () => {

  const [searchText, setSearchText] = useState('');
  // On utilise un state pour garder nos données
  const [games, setGames] = useState([]);

  const handleSearch = () => {
    const url = `${config.API.url}games?key=${config.API.key}&search=${encodeURI(searchText)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => { setGames(data.results) })
      .catch(() => { alert('Une erreur est survenue') })
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" autoFocus={true}
              onKeyUp={(e) => { if (e.key === "Enter") handleSearch() }}
              onChange={e => { setSearchText(e.target.value) }}
              value={searchText}
              placeholder='Rechercher' />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Rechercher</button>
          </div>
        </div>
      </div>

      {/* Ajoutons notre liste */}
      <ul className="list-group">
        {games.map(game => (
          <li className="list-group-item" key={game.id} >
            <Link to={`/details/${game.slug}`}>
              <div className="row">
                <div className="col-2"><img src={game.background_image} alt="" className="img-fluid w-10" /></div>
                <div className="col">
                  <div className="h3">{game.name}</div>
                  <div>{game.rating}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div >
  )
}

export default Home 
