import React from 'react'

const Persons=({name,number,deletePerson,btn})=>{
    return(
    <div>
        {name}&nbsp;{number}
        {btn ? <button onClick={deletePerson}>delete</button> : <span></span>}
    </div> 
    )
  }

export default Persons