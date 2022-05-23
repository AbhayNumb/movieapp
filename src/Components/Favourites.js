import React, { Component } from 'react';
import { movies } from './GetMovies';
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      currMovie: "All Genre",
      movie: [],
      currText: '',
      limit: 5,
      currPage: 1
    }
  }
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    this.setState({
      movie: [...data]
    })
  }
  handlePagination = (val) => {
    this.setState({
      currPage: val
    })
  }
  handleCurrenMovie = (temp) => {
    this.setState({
      currMovie: temp
    })
  }
  populAsen = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    })
    this.setState({
      movie: [...temp]
    })
  }
  populDesen = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    })
    this.setState({
      movie: [...temp]
    })
  }
  ratingAsen = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    })
    this.setState({
      movie: [...temp]
    })
  }
  ratingDesen = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    })
    this.setState({
      movie: [...temp]
    })
  }
  handleDeletion = (id) => {
    let newarr = [];
    newarr = this.state.movie.filter((movieObj) => movieObj.id != id)
    this.setState({
      movie: [...newarr]
    })
    localStorage.setItem("movies-app", JSON.stringify(newarr))
  }
  inc=()=>{
    let val= this.state.limit;
    this.setState({
      limit:val+1
    })
  }
  dec=()=>{
    let val= this.state.limit;
    this.setState({
      limit:val-1
    })
  }
  render() {
    if (this.state.limit == '') {
      this.state.limit = 1;
    }
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    let genre = [];
    for (let i = 0; i < this.state.movie.length; i++) {
      if (genre.includes(genreids[this.state.movie[i].genre_ids[0]]) == false) {
        genre.push(genreids[this.state.movie[i].genre_ids[0]]);
      }
    }

    genre.unshift("All Genre")
    let filterArr = [];
    if (this.state.currMovie !== 'All Genre') {
      this.state.movie.filter((movieObj) => {
        if (this.state.currMovie == genreids[movieObj.genre_ids[0]]) {
          filterArr.push(movieObj);
        }
      })
    } else {
      filterArr = [...this.state.movie];
    }
    let temp = [];
    if (this.state.currText != '') {
      let currT = this.state.currText.toLowerCase();
      filterArr.map((movieObj) => {
        let val = movieObj.original_title.toLowerCase();
        if (val.includes(currT)) {
          temp.push(movieObj);
        }
      })
      filterArr = [...temp];
    }
    let pageArr = [];
    let page;
    page = Math.ceil(filterArr.length / this.state.limit);

    for (let i = 1; i <= page; i++) {
      pageArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filterArr = filterArr.slice(si, ei);
    return (
      <>
        <div class="row" >
          <div class="col-3">
            <ul class="list-group">
              {
                genre.map((genreObj) => (
                  this.state.currMovie === genreObj ?
                    <li class="list-group-item" style={{
                      backgroundColor: '#4834d4',
                      fontWeight: "bold",
                      color: "white"
                    }}>{genreObj}</li>
                    :
                    <li class="list-group-item" style={{
                      color: "#4834d4"
                    }} onClick={() => this.handleCurrenMovie(genreObj)}>{genreObj}</li>
                ))
              }
            </ul>
          </div>
          <div class="col-9">
            <div class="input-group">
              <input type="text" aria-label="First name" class="form-control" placeholder='Search'
                value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })}
              />
              <input type="text" aria-label="Last name" class="form-control" placeholder='Row-Cont'
                value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })}
              />
              <div className="limitChange">
                <i class="fas fa-sort-up" onClick={()=>this.inc()} />
                <i class="fas fa-sort-down" onClick={()=>this.dec()}/>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                    <i class="fas fa-sort-up" onClick={() => this.populAsen()} />
                    Popularity
                    <i class="fas fa-sort-down" onClick={() => this.populDesen()} />
                  </th>
                  <th scope="col">
                    <i class="fas fa-sort-up" onClick={() => this.ratingAsen()} />
                    Rating
                    <i class="fas fa-sort-down" onClick={() => this.ratingDesen()} />
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  filterArr.map((movieObj) => (
                    <tr>
                      <td><img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`}
                        style={{
                          height: "6rem"
                        }}
                      />{movieObj.original_title}</td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button type="button" class="btn btn-danger" onClick={() => this.handleDeletion(movieObj.id)}>Delete</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {
              pageArr.map((page) => (
                <li class="page-item"><a class="page-link" onClick={() => this.handlePagination(page)}>{page}</a></li>
              ))
            }
          </ul>
        </nav>
      </>)
  }
}
