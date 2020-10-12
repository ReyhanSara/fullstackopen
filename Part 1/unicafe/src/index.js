import React,{useState} from 'react'
import ReactDOM from 'react-dom'

const Titles = ({text}) => (<h3>{text}</h3>)

const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good,neutral,bad,allClicks}) => {
  if(allClicks===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <Statistic text="good" stat={good} />
        <Statistic text="neutral" stat={neutral} />
        <Statistic text="bad" stat={bad} />
        <Statistic text="All" stat={allClicks} />
        <Statistic text="Average" stat={(good*1 + neutral*0 + bad*-1)/allClicks} />
        <Statistic text="Positive" stat={(good/allClicks)*100} />
      </tbody>
    </table>
  )
}

const Statistic = ({text, stat}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr> 
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks,setTotal]= useState(0)

  const handleGoodClick = () => {
    setTotal(allClicks + 1);
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setTotal(allClicks + 1);
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setTotal(allClicks + 1);
    setBad(bad + 1)
  }
  return (
    <div>
      <Titles text="Give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
  
      <Titles text="Statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
