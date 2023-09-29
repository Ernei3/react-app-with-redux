import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const initialMovies = {
  listName: 'Favorite',
  movies: [
    'Dune', 'Across the Spiderverse', 'Oppenheimer'
  ]
}

function movies(state = initialMovies, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state, movies: [...state.movies, action.movie]
      }
    case 'UPDATE':
      const index = state.movies.indexOf(action.movieName);

      if( index === -1 ){
        console.error("The movie wasn't found.")
        return state;
      }

      let tmp = [...state.movies];
      tmp[index] = action.newMovieName;

      return {
        ...state,
        movies: tmp
      }
    case 'DELETE':
      return {
        ...state,
        movies: state.movies.filter(( movie ) => movie !== action.movieName)
      }
    case 'DELETE_ALL':
      return {...state, movies: []};
    default:
      return state
  }
}

const movieStore = createStore(movies);
window.store = movieStore;

function App() {
  return (
    <div className="App">
      <h1>{movieStore.getState().listName} movies</h1>
      {
        movieStore.getState().movies.map((movie) => <div key={movie}>{movie}</div>)
      }
    </div>
  );
}

export default App;
