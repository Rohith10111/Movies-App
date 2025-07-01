import MovieCard from "../components/MovieCard";
import { useState,useEffect } from "react";
import {searchMovies,getPopularMovies} from"../services/api";

import "../css/Home.css"

function Home  ()  {
    const [searchQuery,setsearchQuery]=useState("");
    const[movies,setMovies]=useState([]);
    const[error,setError]=useState(null);
    const[loading,setLoading]=useState(true)
   useEffect(()=>{
    const loadPopularMovies=async()=>{
        try{
            const popularMovies=await getPopularMovies()
            setMovies(popularMovies)
        }catch(err){
            console.log(err)
            setError("Failed to Load movies...")
        }
        finally{
            setLoading(false)
        }
    }
    loadPopularMovies()
   },[])
    const handleSearch=async(e)=>{
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return
        setLoading(true)
        try{
            const searchRes=await searchMovies(searchQuery)
            setMovies(searchRes);
            setError(null);
        }catch(err){
            console.log(err)
            setError("Failed to search Movies...")
        }finally{
            setLoading(false)
        }
        setsearchQuery("");
    };
    return(
        <div className="home">
             <form onSubmit={handleSearch} className="search-form">
                <input type ="text" placeholder="search for movies.." className="search-input" value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)} />
                <button type ="submit" className="Search-button">Search</button>
            </form>
            {error && <div className="error-messsage">{error}</div> }
            {loading ? <div className="loading">Loading..</div> : <div className="movies-grid">
                {movies.map((movie)=>(
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            }
            <div className="movies-grid">
                {movies.map((movie)=>(
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}
export default Home
