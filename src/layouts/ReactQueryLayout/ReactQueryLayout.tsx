import React from 'react';
import './ReactQueryLayout.scss'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

const fetchPokemon = async (): Promise<Pokemon[]> => {
  const randomPokemonIds = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 500) + 1
  );
  const pokemonDataPromises = randomPokemonIds.map(id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
  );
  return Promise.all(pokemonDataPromises);
};

function ReactQueryLayout() {
  const { data, isLoading, error } = useQuery<Pokemon[]>(
    'pokemon',
    fetchPokemon, {
      refetchOnWindowFocus: false, // default: true
    }
  );

  console.log(data)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="ReactQueryLayout">
      <h1>Random Pokemon</h1>
      <ul className="ReactQueryLayout__List">
        {data?.map(pokemon => (
          <li key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const queryClient = new QueryClient();

const ReactQueryLayoutWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryLayout />
    </QueryClientProvider>
  );
};


export default ReactQueryLayoutWrapper;