import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BasicSpeedDial from "../basicSpeedDial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';

function CalorieCounter() {
    const navigate = useNavigate();
			const handleNavigate = (url) => {
			navigate(url);
		};
		const [fireBurstVisible, setFireBurstVisible] = useState(false);
		// event handler for exit calorie counter
		const handleClickExit = () => {
			handleNavigate('/home');
		};
		// event handler for the fire burst
		const handleFireClick = () => {
			setFireBurstVisible(true);
			setTimeout(() => setFireBurstVisible(false), 1000); // remove burst after 1 sec
		}
		
		return (
			<div>
				<div className="calorie-counter-container">
					<h1>Calorie Counter</h1>
					<div className="icon-container" onClick={handleFireClick}>
						<FontAwesomeIcon 
							icon={faFireFlameCurved} 
							style={{ 
								fontSize: '250px', 
								color: '#ff6801'	
								//background-image: linear-gradient(319deg, #ffb347 0%, #ff6801 37%, #F6C324 100%);

							}} 
						/>
						{fireBurstVisible && (
							<div className="fireburst"></div>
						)}
					</div>
					<div className="exit-container">
						<Button
							variant='contained'
							style={{
								backgroundColor: '#C51D34'
							}}
							onClick={handleClickExit}> 
							Exit
						</Button>
					</div>
					<div className="speed-dial-container">
						<BasicSpeedDial />
					</div>
				</div>
			</div>
		)
};

export default CalorieCounter;