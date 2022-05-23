import React, { Component } from 'react';
import axios from 'axios';
// import { movies } from './GetMovies'
export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            movie:'',
            currPage:1
        }
    }
    async componentDidMount() {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=76623531b0778ba1d2d7ae482ec83768&language=en-US&page=${this.state.currPage}`);
        this.setState(
            {
                movie:res.data.results[0]
            }
        )
        // console.log(res);
    }
    render() {
        // let movie='';
        return (
            this.state.movie === "" ?
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :
                <>
                    <div className="card banner">
                        <img src={`https://image.tmdb.org/t/p/w500${this.state.movie.backdrop_path}`} className="card-img-top banner-img" alt="..." />
                        <div className="card-body banner-body">
                            <h1 className="card-title">{this.state.movie.original_title}</h1>
                            <p className="card-text">{this.state.movie.overview}</p>
                        </div>
                    </div>
                </>
        )
    }
}
