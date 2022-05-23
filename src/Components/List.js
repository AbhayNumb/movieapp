import React, { Component } from 'react';
// import { movies } from './GetMovies';
import axios from 'axios';
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }
    async componentDidMount() {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=76623531b0778ba1d2d7ae482ec83768&language=en-US&page=${this.state.currPage}`);
        this.setState(
            {
                movies: [...res.data.results]
            }
        )
        // console.log(res);
    }
    changeMovie = async () => {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=76623531b0778ba1d2d7ae482ec83768&language=en-US&page=${this.state.currPage}`);
        this.setState(
            {
                movies: [...res.data.results]
            }
        )
    }
    handleNext = () => {
        let temp = [];
        if (this.state.currPage == this.state.parr.length) {
            for (let i = 1; i <= this.state.parr.length + 1; i++) {
                temp.push(i);
            }
            this.setState({
                parr: [...temp],
                currPage: this.state.parr.length + 1
            }, this.changeMovie);
        } else {
            this.setState({
                currPage: this.state.currPage + 1
            }, this.changeMovie);
        }

    }
    handlePrev = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovie)
        }
    }
    handleClick = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovie)
        }
    }
    handleFavourite = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]");
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id != movie.id);
        } else {
            oldData.push(movie);
        }
        localStorage.setItem("movies-app", JSON.stringify(oldData));
        this.handlefavouritesArray();
        console.log(oldData);
    }
    handlefavouritesArray = () => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]");
        let temp = oldData.map((movie) => {
            return movie.id;
        })
        this.setState({
            favourites: [...temp]
        })
    }
    render() {
        return (
            this.state.movies.length === "" ?
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : <>
                    <div className='allLists'>
                        {
                            this.state.movies.map((movieObj) => (
                                <div className="card each-movie" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => { this.setState({ hover: "" }) }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`} className="card-img-top each-movie-img" alt="..." />
                                    <div className="card-body each-movie-content">
                                        <h3 className="card-title " >{movieObj.original_title}</h3>
                                    </div>
                                    {   this.state.favourites.includes(movieObj.id)?
                                        this.state.hover == movieObj.id &&
                                        <a className="btn btn-primary each-movie-btn"
                                         onClick={() => this.handleFavourite(movieObj)}>REMOVE FROM FAVOURITE</a>
                                        :
                                        this.state.hover == movieObj.id &&
                                        <a className="btn btn-primary each-movie-btn"
                                         onClick={() => this.handleFavourite(movieObj)}>ADD TO FAVOURITE</a>
                                    }
                                </div>

                            ))
                        }
                    </div>
                    <div className='pagination '>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item hoverPointer"><a className="page-link"
                                    onClick={() => this.handlePrev()}>Previous</a></li>
                                {
                                    this.state.parr.map((parrObj) => (
                                        <li className="page-item hoverPointer"><a className="page-link"
                                            onClick={() => { this.handleClick(parrObj) }}>{parrObj}</a></li>
                                    ))
                                }
                                <li className="page-item hoverPointer"><a className="page-link"
                                    onClick={() => this.handleNext()}>Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </>
        )
    }
}
