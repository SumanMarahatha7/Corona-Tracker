import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function MonthGraph ({country}){
	const [monthChoice, setMonthChoice] = useState('confirmed');
	const [monthData, setMonthData] = useState({});

	const todayDate = new Date().toISOString().slice(0,10);

	useEffect(() => {
		getThisMonthCases("confirmed");
	}, []);

	const handleMonthChoice = (e) =>{
		setMonthChoice(e.target.value);
		getThisMonthCases(e.target.value);
	}

	const getThisMonthCases = (monthValue) => {
		var d = new Date();
		d.setDate(d.getDate() - 30);
		var monthBefore = d.toISOString().slice(0,10);
		var monthCaseList = [];
		var monthList = [];

		axios.get(`https://api.covid19api.com/country/${country}/status/${monthValue}/live?from=${monthBefore}T00:00:00Z&to=${todayDate}T00:00:00Z`)
			.then((response) => {
				// handle success
				response.data.forEach((dat)=>{
					monthList.push(dat.Date.slice(0,10));
					monthCaseList.push(dat.Cases);
				})
			})
			.then(()=>{
				setMonthData({
					labels: monthList,
					datasets: [{
						label: 'Total number of cases up to the day',
						data: monthCaseList,
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
			<h3 className="text-secondary">
				Total <select name="status" id="status" onChange={handleMonthChoice} value={monthChoice} className="text-secondary country-select">
					<option value="confirmed">Confirmed</option>
					<option value="deaths">Deaths</option>
					<option value="recovered">Recovered</option>
				</select> cases this Month :
			</h3>
			<Line data={monthData}
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

export default MonthGraph;