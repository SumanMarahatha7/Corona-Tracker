import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function WeekGraph ({country}){
	const [weekChoice, setWeekChoice] = useState('confirmed');
	const [weekData, setWeekData] = useState({});

	const todayDate = new Date().toISOString().slice(0,10);

	useEffect(() => {
		getThisWeekCases("confirmed");
	}, []);

	const handleWeekChoice = (e) =>{
		setWeekChoice(e.target.value);
		getThisWeekCases(e.target.value);
	}

	const getThisWeekCases = (weekValue) => {
		var d = new Date();
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var temp = d.getDay();
		var displayDays = [];

		for(var i=0;i<7;i++){
			temp = temp+1;
			if(temp>=7){
				temp = 0;
			}
			displayDays.push(days[temp]);
		}

		d.setDate(d.getDate() - 7);
		var weekBefore = d.toISOString().slice(0,10);
		var weekCaseList = [];
		
		axios.get(`https://api.covid19api.com/country/${country}/status/${weekValue}/live?from=${weekBefore}T00:00:00Z&to=${todayDate}T00:00:00Z`)
			.then((response) => {
				// handle success
				response.data.forEach((dat)=>{
					weekCaseList.push(dat.Cases);
				})
			})
			.then(()=>{
				setWeekData({
					labels: displayDays,
					datasets: [{
						label: 'Total number of cases up to the day',
						data: weekCaseList,
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
	};

	return(
		<div>
			<h3 className="text-secondary">
				Total <select name="status" id="status" onChange={handleWeekChoice} value={weekChoice} className="text-secondary country-select">
					<option value="confirmed">Confirmed</option>
					<option value="deaths">Deaths</option>
					<option value="recovered">Recovered</option>
				</select> cases this Week :
			</h3>
			<Line data={weekData}
			 options= {{
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}}
			 height={200}/>	
		</div>
	)

};

export default WeekGraph;