"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar"; 

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!id || !API_KEY) return; 

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then(setMovie)
      .catch((error) => console.error("Error fetching movie:", error)); 
  }, [id]);

  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar /> 
      
      <div className="flex-1 p-5 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg border-2 border-white cursor-pointer"
        />

        <div className="text-white flex-1 mb-9 self-start mt-10">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-4 text-md mb-2">{movie.overview}</p>
         
          <p className="mt-4 mb-2">
            🎭 Genres:{" "}
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="bg-gray-700 text-white px-2 py-1 rounded text-sm mr-2">
                {genre.name}
              </span>
            )) || "N/A"}
          </p>

          <p className="mt-2 mb-2">⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}/10</p>
          <p className="mt-2 mb-2">📅 Release Date: {movie.release_date}</p>
          
          
        </div>

        {/* Back Button */}
        <div className="flex justify-end cursor-pointer">
          <button 
            className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer" 
            onClick={() => router.back()} 
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
