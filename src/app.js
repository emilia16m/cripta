
import Descr from './components/descr'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
import ReactDropdown from 'react-dropdown';

function App() {

// Initializing all the state variables
const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("inr");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState(0);

// Calling the api whenever the dependency changes
useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);

// Calling the convert function whenever
// a user switches the currency
useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])
	
// Function to convert the currency
function convert() {
	var rate = info[to];
	setOutput(input * rate);
}

// Function to switch between two currency
function flip() {
	var temp = from;
	setFrom(to);
	setTo(temp);
}

return (
	<div className="App">
	<Descr />
    
  <div className='exchange'>
      <div className='container'>
        <div className='ex_wrapp'>
          <div className='left'>
            <input placeholder='0' type="text" onChange={(e) => setInput(e.target.value)}/> 
            <ReactDropdown className='drop' options={options} 
                onChange={(e) => { setFrom(e.value) }}
            value={from} placeholder="From" />
          </div>


          <div className="switch">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { flip()}}>
            <g clip-path="url(#clip0_3_98)">
            <path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE"/>
            <path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE"/>
            </g>
            <defs>
            <clipPath id="clip0_3_98">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>

		      </div>

          <div className="right">
          <div className="result">
            <p>{output.toFixed(2) }</p>
          </div>
            <ReactDropdown className='drop' options={options}
                onChange={(e) => {setTo(e.value)}}
            value={to} placeholder="To" />
		      </div>


        </div>
      </div>
  </div> 



  <div className="form">
    <div className="container">
      <div className='form_wrapp'>
        <div className='input_wrapp'>
          <label>Your Ethereum address</label>
          <input></input>
        </div>

        <button>Exchange</button>
      </div>
    </div>
  </div> 
	</div>


);
}

export default App;

