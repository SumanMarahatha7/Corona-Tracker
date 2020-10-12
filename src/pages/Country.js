import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Country (){
	const [countries, setCountries] = useState([]);
	const [searchItem, setSearchItem] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {

		axios.get('https://api.covid19api.com/summary')
			.then((response) => {
				// handle success
				response.data.Countries.forEach( item =>{
					setCountries(prevCountries => [...prevCountries, item]);
				})
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(()=>{
				setLoading(false);
			})

	}, []);

	const handleSearchItem = (e) =>{
		setSearchItem(e.target.value);
	}

	const handleSearch = (e) => {
		e.preventDefault();
		var tempList = countries.filter(dat => {
			if (dat.Slug.includes(searchItem.toLowerCase())){
				return dat;
			}
		});
		setSearchList(tempList);
	}

	return(
		<div className="container">
			<h1 className="display-4" style={{color: "indigo"}}>List of all of Countries:</h1>
			
			<div className="card search-card">
				<div className="card-body">
					<h3 className="text-white">Search for specific country :</h3>
					<form className="row mx-1 mt-2">
						<input type="text" className="col-sm-9 col-md-10 search-input" onChange={handleSearchItem} value={searchItem}/>
						<button className="btn btn-info col-sm-3 col-md-2" onClick={handleSearch}>Search</button>
					</form>
					<ul className="text-white px-5">
						{searchList.map((dat, index)=><li key={index} className="search-country-link" onClick={() => history.push(`/country/${dat.Slug}`)}>{dat.Country}</li>)}
					</ul>
				</div>
			</div>
			
			<div className="row mt-1 countries-link-title text-secondary py-4">
				<div className="col-1 text-secondary">S.N.</div>
				<div className="col-5 text-secondary">Country Name</div>
				<div className="col-2 text-secondary text-center">Total Confirmed</div>
				<div className="col-2 text-danger text-center">Total Deaths</div>
				<div className="col-2 text-success text-center">Total Recovered</div>
			</div>
			
			{loading?
				<div className="d-flex justify-content-center mt-4">
					<div className="display-4 text-muted">Loading . . . </div>
				</div>:
				<div>
					{countries.map((dat,index)=><div className="row py-2 countries-link text-secondary" onClick={() => history.push(`/country/${dat.Slug}`)} key={dat.Slug}>
						<div className="col-1">{index+1}.</div>
						<div className="col-5">{dat.Country}</div>
						<div className="col-2">{dat.TotalConfirmed}</div>
						<div className="col-2">{dat.TotalDeaths}</div>
						<div className="col-2">{dat.TotalRecovered}</div>
					</div>)}
				</div>
			}
		</div>
	)

};

export default Country;