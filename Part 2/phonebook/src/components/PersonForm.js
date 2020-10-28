import React from 'react'

const PersonForm=({newName,newNumber,onChangeName,onChangeNumber,onClick})=>{
    return(
      <div>
        <form>
            <div>
              <Inputs text="Name" value={newName} onChange={onChangeName} />
              <Inputs text="Number" value={newNumber} onChange={onChangeNumber} />
            </div>
            <div>
              <button type="submit" onClick={onClick}>add</button>
            </div>
          </form>
      </div>
    )
  }
  
  const Inputs = ({text,value,onChange})=> {
    return(
      <div> 
        {text}: <input value={value} onChange={onChange}/>
      </div>
    )
  }

  export default PersonForm