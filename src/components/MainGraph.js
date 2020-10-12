import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function MainGraph ({country}){
	const [mainChoice, setMainChoice] = useState('confirmed');
	const [mainDate, setMainDate] = useState('');
	const [mainData, setMainData] = useState({});

	const todayDate = new Date().toISOString().slice(0,10);

	useEffect(() => {
		var d = new Date();
		d.setDate(d.getDate() - 31);
		var beforeDate = d.toISOString().slice(0,10);
		setMainDate(beforeDate);
		getMainCases("confirmed", beforeDate);

	}, []);

	const handleMainChoice = (e) =>{
		setMainChoice(e.target.value);
		getMainCases(e.target.value, mainDate);
	}

	const handleMainDate = (e) =>{
		if(e.target.value>=todayDate){
			alert("The day is greater than or equal to today.")
		}else{
			setMainDate(e.target.value);
			getMainCases(mainChoice, e.target.value);
		}
	}

	const getMainCases = (mainValue, beforeDate) => {
		var mainCaseList = [];
		var mainList = [];
		var yesterdayCases = "";
		var diff = 0;

		axios.get(`https://api.covid19api.com/country/${country}/status/${mainValue}/live?from=${beforeDate}T00:00:00Z&to=${todayDate}T00:00:00Z`)
			.then((response) => {
				// handle success
				response.data.forEach((dat)=>{
					if(yesterdayCases === ''){
						yesterdayCases = dat.Cases;
					}
					else{
						if((dat.Cases-yesterdayCases)<=0)
							diff = 0;
						else if((dat.Cases-yesterdayCases)>1000000)
							diff = 1000000;
						else
							diff = dat.Cases-yesterdayCases;
						mainCaseList.push(diff);
						mainList.push(dat.Date.slice(0,10));
						yesterdayCases = dat.Cases;
					}
				})
			})
			.then(()=>{
				setMainData({
					labels: mainList,
					datasets: [{
						label: 'No. of Cases Per Day',
						data: mainCaseList,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				});
			});
	}

	return(
		<div>
			<h3 className="mt-5 text-secondary">
				<select name="status" id="status" onChange={handleMainChoice} value={mainChoice} className="text-secondary country-select">
					<option value="confirmed">Confirmed</option>
					<option value="deaths">Deaths</option>
					<option value="recovered">Recovered</option>
				</select> cases per day from <input type="date" onChange={handleMainDate} value={mainDate} className="text-secondary main-select"/> {mainDate} to {todayDate} :
			</h3>
			<Line data={mainData}
			 options= {{
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}}/>
		</div>
	)

};

export default MainGraph;