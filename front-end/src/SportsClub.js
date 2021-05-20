import React, {useState, useEffect} from 'react'

import {FaEdit, FaTrash} from 'react-icons/fa'
import mca from './mca.png'

import './sportsClub.scss'

const prefix = process.env.REACT_APP_API

const SportsClub = () => {
	const [players, setPlayers] = useState([])
	const [id, setId] = useState(-1)
	const [name, setName] = useState('') 
	const [age, setAge] = useState('') 
	const [address, setAddress] = useState('') 
	const [kitNumber, setKitNumber] = useState('') 
	const [alert, setAlert] = useState('')
	const [isEditing, setIsEditing] = useState(false); 

	const getPlayers = async () => {
		const url = prefix + 'get'
		fetch(url, {method: 'GET'})
		.then(response => response.json())
		.then(data => {
			if(data.success)
				setPlayers(data.data)
		})
	}

	const validateInput = () => {
		setAlert('')
		if(!name || !age || !address || !kitNumber) {
			setAlert('Fill all the details')
			return false
		}
		if(age < 18 || age > 45) {
			setAlert('Player should be 18 to 45 years old')
			return false
		}
		if(kitNumber < 1 || kitNumber > 99) {
			setAlert('Kit number should be between 1 and 99')
			return false
		}
		if(players) {
			for(let i=0; i<players.length; ++i) {
				if(players[i].kitNumber === Number(kitNumber)) {
					setAlert(`Kit number ${kitNumber} is already assigned`)
					return false
				}
			}
		}
		return true
	}

	const flushInputs = () => {
		setId(-1)
		setName('')
		setAddress('')
		setAge('')
		setKitNumber('')
		setIsEditing(false)
	}

	const addPlayer = async (event) => {
		event.preventDefault()
		if(!validateInput())
			return
		const url = prefix + 'create/'
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, age, address, kitNumber})
		})
		.then(response => response.json())
		.then(data => {
			if(data.success) {
				if(players)
					setPlayers([...players, data.data])
				else
					setPlayers([data.data])
				flushInputs()
			}
		})
	}

	const initEdit = async (player) => {
		setIsEditing(true)
		setId(player.id)
		setName(player.name)
		setAge(player.age)
		setAddress(player.address)
		setKitNumber(player.kitNumber)
	}


	const editPlayer = async (event) => {
		event.preventDefault()
		if(!validateInput())
			return
		const url = prefix + `update/${id}`
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, age, address, kitNumber}),
		})
		.then(response => response.json())
		.then(data => {
			if(data.success) {
				const newPlayers = players.map(player => {
					if(player.id === id)
						return data.data
					return player
				})
				setPlayers(newPlayers)
				flushInputs()
			}
		})
	}

	const deletePlayer = async (playerId) => {
		setAlert('')
		const url = prefix + `delete/${playerId}`
		fetch(url, {method: 'DELETE'})
		.then(response => response.json())
		.then(data => {
			if(data.success) {
				const newPlayers = players.filter(player => player.id !== playerId)
				setPlayers(newPlayers)
			}
		})
	}

	useEffect(() => {
		getPlayers()
	}, [])

	return (
		<section className='container'>
			<header>
				<div>
					<img src={mca} alt='Mumbai Cricket Club'/>
					<p>
						<strong>Mumbai Cricket Club</strong>
						Sports Club Management System
					</p>
				</div>				
			</header>
			<div className='content'>
				<form className='player-form'>
					<h3>Add a new player</h3>
					<input type='text' placeholder='Name' value={name} onChange={(event) => setName(event.target.value)}/>
					<input type='number' placeholder='Age' value={age} onChange={(event) => setAge(event.target.value)}/>
					<input type='number' placeholder='Kit Number' value={kitNumber} onChange={(event) => setKitNumber(event.target.value)}/>
					<textarea placeholder='Address' value={address} onChange={(event) => setAddress(event.target.value)}/>
					<p>{alert}</p>
					<button type='submit' onClick={isEditing ? editPlayer : addPlayer}>{isEditing ? `Edit Player` : `Add Player`}</button>
				</form>
				<h3 className='players-header'>Players</h3>
				<div className='player-list'>
					{players && 
						players.map(player => {
							return (
								<div key={player.id} className='player'>
									<p className='kit-number'>{player.kitNumber}</p>
									<div className='details'>
										<h3>{player.name}</h3>
										<p>Address : {player.address}</p>
										<p>Age : {player.age}</p>
									</div>
									<div className='edit-delete'>
										<button style={{color:'#6495ED'}} onClick={() => initEdit(player)}><FaEdit/></button>
										<button style={{color:'#DC143C'}} onClick={() => deletePlayer(player.id)}><FaTrash/></button>
									</div>
								</div>	
							)
						})}
				</div>
			</div>
			<footer>
				<p>All Rights Reserved &copy; 2021</p>
			</footer>
		</section>	
	)
}

export default SportsClub