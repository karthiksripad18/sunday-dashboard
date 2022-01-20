import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { fetchGames } from '../../redux/actions/actions';
import { gamesStateType } from '../../redux/reducers/gamesReducer';
import ReactLoading from 'react-loading';
import { gameObjType } from '../../redux/types';
import GameTile from '../../components/GameTile/GameTile';

import './Overview.css';

const Overview = (): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch();
    const { error, loading, gamesList }: gamesStateType = useSelector(({ games }: { games: gamesStateType }) => games);

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    // Separate Active Games & Inactive Games 
    const activeGames: gameObjType[] = [];
    const inActiveGames: gameObjType[] = [];
    gamesList.forEach((game: gameObjType) => {
        if (game.active) activeGames.push(game);
        else inActiveGames.push(game);
    });

    return (
        <div data-test="component-overview" className='overview'>
            {
                error !== null?
                <ErrorDisplay errorMsg={error} />
                :
                loading?
                <ReactLoading type={'spin'} color={'white'} height={75} width={75} />
                :
                <div data-test="component-game-list" className='overview__games'>
                    {
                        <>
                            {
                                activeGames.map((game: gameObjType) => (
                                    <Link key={game.id} to={`/game/${game.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
                                        <GameTile {...game} />
                                    </Link>
                                ))
                            }
                            <hr />
                            {
                                inActiveGames.map((game: gameObjType) => (
                                    <GameTile key={game.id} {...game} />
                                ))
                            }
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default Overview;
