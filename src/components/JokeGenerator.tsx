import React, { useState } from 'react';
import { Joke } from '@/types';

export const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Joke[]>([]);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data: Joke = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (joke && !favorites.some(fav => fav.id === joke.id)) {
      setFavorites([...favorites, joke]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  React.useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">😂 Joke Generator</h1>
          <p className="text-purple-100 text-lg">Get a random joke every time you click!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 min-h-64 flex flex-col justify-between">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 text-xl font-semibold">❌ {error}</p>
            </div>
          ) : joke ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{joke.setup}</h2>
                <p className="text-xl text-gray-600 mb-4 font-semibold text-purple-600">{joke.punchline}</p>
                <p className="text-sm text-gray-400">Type: {joke.type}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={fetchJoke}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Get Another Joke
                </button>
                <button
                  onClick={addToFavorites}
                  className="flex-1 bg-yellow-400 text-gray-800 py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  ❤️ Add to Favorites
                </button>
              </div>
            </>
          ) : null}
        </div>

        {favorites.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">⭐ My Favorites ({favorites.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {favorites.map(fav => (
                <div key={fav.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="font-semibold text-gray-800 mb-2">{fav.setup}</p>
                  <p className="text-gray-600 mb-3">{fav.punchline}</p>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};