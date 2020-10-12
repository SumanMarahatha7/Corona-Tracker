import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CountryDetails({code}){
	const [country,setCountry]=useState({});
	const [languages,setLanguages]=useState([]);
	const [currencies,setCurrencies]=useState([]);
	const [latitude,setLatitude]=useState(0);
	const [longitude,setLongitude]=useState(0);

	useEffect(() => {
		axios.get(`https://restcountries.eu/rest/v2/name/${code}`)
			.then((response) => {
				// handle success
				console.log(response.data);
				var count = response.data[0];
				setCountry(count);
				setLanguages(count.languages);
				setCurrencies(count.currencies);
				setLatitude(count.latlng[0]);
				setLongitude(count.latlng[1]);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			//API Key
			//AIzaSyDIyEQofvGQweLSmsFC0rWPsqStVMzCLKU
	}, []);

	return(
		<div className="row">
			<div className="col-sm-7 mb-5">
				<div className="row text-secondary">
					<div className="col-4 country-detail-col">Region:</div>
					<div className="col-8 country-detail-col">{country.region}</div>
					<div className="col-4 country-detail-col">Sub-Region:</div>
					<div className="col-8 country-detail-col">{country.subregion}</div>
					<div className="col-4 country-detail-col">Capital:</div>
					<div className="col-8 country-detail-col">{country.capital}</div>
					<div className="col-4 country-detail-col">Language:</div>
					<div className="col-8 country-detail-col">{languages.map((dat,index)=><span key={index}>{dat.name} </span>)}</div>
					<div className="col-4 country-detail-col">Currency:</div>
					<div className="col-8 country-detail-col">{currencies.map((dat,index)=><span key={index}>{dat.name} </span>)}</div>
					<div className="col-4 country-detail-col">Flag:</div>
					<div className="col-8 country-detail-col"><img src={country.flag} alt="" style={{height: "30px"}}/></div>
				</div>
			</div>
			<div className="col-sm-5">
				<h1>Map Goes Here: {latitude} {longitude}</h1>
			</div>
		</div>
	)

};

export default CountryDetails;