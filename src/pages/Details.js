//import { useParams } from "react-router-dom"

//const Details = () => { 
//const params = useParams();
//return (
//<div>Ceci est la page du jeu dont le slug est "{params.slug}"</div>
//)
//}

//export default Details

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import missing from '../assets/missing.jpg';
import config from '../config.js';

const GamePage = () => {
    const [game, setGame] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        (async () => {
            const game = await (await fetch(`${config.API.url}games/${slug}?key=${config.API.key}`)).json()
            setGame(game)
            console.log(game);
        })()
    }, [slug])

    return (
        <div>
            <div className='row mt-4'>
                <div className='col'>
                    <h2 className="">{game.name}</h2>
                </div>
                <div className='col text-end'>
                    <span className="badge rounded-pill bg-primary">{game.rating} / 5</span>
                </div>
            </div>
            <div class="text-center">
                <img src={game.background_image || missing} alt="" className='img-fluid' />
            </div>
            <div className="row">
                <div className='col-12 col-sm-6 '>
                    {game.developers ? game.developers.map((developer, index) => (
                        <div key={index} className="m-1">by {developer.name}</div>
                    )) : null}
                </div>
                <div className='col-12 col-sm-6 text-end'>
                    {game.platforms ? game.platforms.map((platform, index) => (
                        <span key={index} className="badge bg-secondary m-1">{platform.platform.name}</span>
                    )) : null}
                </div>
            </div>

            <h2 className="mt-4">Description</h2>
            <div className='row'>
                <div className='col'>
                    {game.description_raw}
                </div>
            </div>

            <h2 className="mt-4">Genre</h2>
            <div className="row">
                <div className='col'>
                    {game.genres ? game.genres.map((genre, index) => (
                        <div key={index} className="badge bg-primary m-1">{genre.name}</div>
                    )) : null}
                </div>
            </div>

            {(game.website && game.website.length > 0) ? (
                <div>
                    <h2 className="mt-4">Official site :</h2>
                    <a href={game.website}>{game.website}</a>
                </div>
            ) : null}

        </div>
    )
}

export default GamePage;
