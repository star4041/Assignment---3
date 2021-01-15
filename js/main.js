const api_key= '5b63cb9e0d4398dbaac1dafa1b4200e5';
const search_base_url = 'https://api.themoviedb.org/3/search/movie?api_key=';
const trending = 'https://api.themoviedb.org/3/trending/all/week?api_key=5b63cb9e0d4398dbaac1dafa1b4200e5'; 
const nowplaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=5b63cb9e0d4398dbaac1dafa1b4200e5&language=en-US&page=1';
const toprated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=5b63cb9e0d4398dbaac1dafa1b4200e5&language=en-US&page=1';
const upcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=5b63cb9e0d4398dbaac1dafa1b4200e5&language=en-US&page=1';


const location1 = '#trend';
const location2 = '#nowplay';
const location3 = '#top';
const location4 = '#upcom';


function fetchdata(path,location){
    fetch(path)
        .then(response =>{
            return response.json();
    })
        .then(data =>{
        console.log(data.results);
        const html = data.results
            .map(movie =>{
                 return `
                    <div class="to">
                    <a onclick="moviedata(${movie.id})"><img src="https://image.tmdb.org/t/p/w342${movie.poster_path || movie.backdrop_path}" alt="watch 1"></a>
                    <div class="to_indent">
                    <p style="color: gold;">&#9733; ${movie.vote_average}</p>
                    <h2 style="color: white; font-size: 15px; font-weight: 400;" >${movie.title || movie.original_name} </h2>
                    <button>&#43; Watchlist</button>
                    </div>
                    </div>
                    `; 
                 })
                .join("");
        console.log(html);
       document.querySelector(location).insertAdjacentHTML('afterbegin', html);
    });
}

fetchdata(trending,location1);
fetchdata(nowplaying,location2);
fetchdata(toprated,location3);
fetchdata(upcoming,location4);

function searchmovie() {
    var x = document.getElementById("query").value 
    var search = `${search_base_url}${api_key}&query=${x}`;  
    document.getElementById('searchresults').style.display = "block";
    
    function rendersearch(search){
    fetch(search)
        .then(response =>{
            return response.json();
    })
        .then(data =>{
        console.log(data.results);
        const html = data.results
            .map(movie =>{
                 return `
                    <div class="to" style = "width: auto !important;">
                    <a onclick="moviedata(${movie.id})"><img src="https://image.tmdb.org/t/p/w342${movie.poster_path || movie.backdrop_path}" alt="watch 1"></a>
                    <div class="to_indent">
                    <p style="color: gold;">&#9733; ${movie.vote_average}</p>
                    <h2 style="color: white; font-size: 15px; font-weight: 400;" >${movie.title || movie.original_name} </h2>
                    <button>&#43; Watchlist</button>
                    </div>
                    </div>
                    `;
                 })
                .join("");
       document.querySelector('#resl').insertAdjacentHTML('afterbegin', html);
    });
}
rendersearch(search);
}



function moviedata(id){
    document.getElementById("overlay").style.display = "block";
    var mid = id;
    var movie_url = `https://api.themoviedb.org/3/movie/${mid}?api_key=${api_key}&language=en-US`;
    fetch(movie_url)
        .then(response =>{
            return response.json();
    })
        .then(data =>{
        console.log(data);
        document.querySelector('#details').innerHTML=`<div class="to" style="width:100% !important;">
                    <img src="https://image.tmdb.org/t/p/w342${data.poster_path || data.backdrop_path}" alt="watch 1">
                    <div class="to_indent" style="float: right !important; width: 80% !important; text-align:left !important;">
                    <p style="color: gold;">&#9733; ${data.vote_average}</p>    
                    <h2 style=" font-size: 20px; font-weight: 400;" >${data.title || data.original_title}</h2>
                    <p>Runtime : ${data.runtime} mins</p>
                    <p>Release Date : ${data.release_date}</p>
                    <p>Tagline : ${data.tagline}</p>
                    <p>Overview : ${data.overview}</p>
                    <button>&#43; Watchlist</button>
                    </div>
                    </div>
                    <style> @media screen and (max-width: 600px) {.to{height: auto;}}</style>    
                        `; 
       
    });
}
    /*
for (let r of data.list) { 
     document.getElementById("Trending").innerHTML = data;   
        
    }
      /*let tab = `
        <img src="https://image.tmdb.org/t/p/w500${r.backdrop_path}" alt="watch 1">
        <div class="to_indent">
        <p style="color: gold;">&#9733; ${r.vote_average}</p>
        <h2 style="color: white; font-size: 15px; font-weight: 400;" >${r.title}</h2>
        <button>&#43; Watchlist</button>
        </div>`; 
    } 
    document.getElementById("Trending").innerHTML = tab; */
