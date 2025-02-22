import React from 'react'
import loader from './Walk.gif'

function Loader() {
    return (
      <div className="text-center">
        <img src={loader} alt="loading..."></img>
      </div>
    )
}

export default Loader;

