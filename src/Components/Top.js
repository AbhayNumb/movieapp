import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Top extends Component {
    render() {
        return (
            <div style={{
                height: "4rem",
                display: "flex",
                alignItems: 'center',
                gap: "1.5rem",
                textUnderlineOffset:"none"
            }}>
                <Link to="/" style={{textDecoration:'none'}} ><h1>MovieApp</h1></Link>
                <Link to="/favourites" style={{textDecoration:'none'}}><h2>Favourites</h2></Link>
            </div>
        )
    }
}
