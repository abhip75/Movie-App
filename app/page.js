"use client";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/utils/tmdbApi";
import Sidebar from "@/components/Sidebar";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  useEffect(() => {
    fetchMovies("popular").then(setMovies);
  }, []);

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 w-full">
        {/* Heading and Search Input */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Trending Movies</h1>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg w-60 text-black"
          />
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="bg-gray-800 text-white p-3 rounded-lg flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded"
                  />
                  <h3 className="mt-2 text-center text-lg font-semibold">{movie.title}</h3>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <AiFillStar
                        key={i}
                        className={`text-yellow-400 ${
                          i < Math.round(movie.vote_average / 2) ? "opacity-100" : "opacity-30"
                        }`}
                        size={18}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
