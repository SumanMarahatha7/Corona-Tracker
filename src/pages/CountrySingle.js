import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import WeekGraph from '../components/WeekGraph';
import MonthGraph from '../components/MonthGraph';
import MainGraph from '../components/MainGraph';
import CountryDetails from '../components/CountryDetails';
import '../App.css';

function CountrySingle (){
	const [country, setCountry] = useState({});
	const { id } = useParams();

	useEffect(() => {
		axios.get("https://api.covid19api.com/summary")
			.then((response) => {
				// handle success
				response.data.Countries.forEach( item =>{
					if(item.Slug === id){
						console.log(item);
						setCountry(item);
					}
				})
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})

	}, []);
	
	return(
		<div className="container">
			<div style={{color: "indigo"}}>
				<h1 className="d-inline-block display-4">{country.Country}</h1>
				<small> Covid Details</small>
			</div>

			<div className="row">

				<div className="col-sm-12 col-lg-6 mt-4">
					<h3 className="text-secondary">Total Cases :</h3>
					
					<div className="card main-card-color">
						<div className="card-body">
							<div className="d-flex justify-content-around">
								<div className="text-center">
									<div>Confirmed</div>
									<div className="main-card-number"><CurrencyFormat value={country.TotalConfirmed} displayType={'text'} thousandSeparator={true} /></div>
								</div>
								<div className="text-center">
									<div className="text-danger">Deaths</div>
									<div className="main-card-number"><CurrencyFormat value={country.TotalDeaths} displayType={'text'} thousandSeparator={true} /></div>
								</div>
								<div className="text-center">
									<div className="text-success">Recovered</div>
									<div className="main-card-number"><CurrencyFormat value={country.TotalRecovered} displayType={'text'} thousandSeparator={true} /></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-sm-12 col-lg-6 mt-4">
					<h3 className="text-secondary">New Cases :</h3>

					<div className="card main-card-color">
						<div className="card-body">
							<div className="d-flex justify-content-around">
								<div className="text-center">
									<div>Confirmed</div>
									<div className="main-card-number"><CurrencyFormat value={country.NewConfirmed} displayType={'text'} thousandSeparator={true} /></div>
								</div>
								<div className="text-center">
									<div className="text-danger">Deaths</div>
									<div className="main-card-number"><CurrencyFormat value={country.NewDeaths} displayType={'text'} thousandSeparator={true} /></div>
								</div>
								<div className="text-center">
									<div className="text-success">Recovered</div>
									<div className="main-card-number"><CurrencyFormat value={country.NewRecovered} displayType={'text'} thousandSeparator={true} /></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>

			<div className="row">
				<div className=" col-sm-12 col-lg-6 mt-5">
					<WeekGraph country={id}/>
				</div>

				<div className="col-sm-12 col-lg-6 mt-5">
					<MonthGraph country={id}/>
				</div>
			</div>

			<MainGraph country={id}/>

			<h3 className="text-secondary mt-4">About {country.Country} :</h3>
			<CountryDetails code={id}/>
		</div>
	);
}

export default CountrySingle;