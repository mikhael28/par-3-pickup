/* eslint-disable indent */
import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';

function ProfileModal(props) {
	function handleName(event) {
		props.setName(event.target.value);
	}

	function handleBio(event) {
		props.setBio(event.target.value);
	}

	function handlePhone(event) {
		props.setPhone(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		try {
			localStorage.setItem('phone', props.phone);
			localStorage.setItem('name', props.name);
			localStorage.setItem('bio', props.bio);
			props.closeModal();
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<React.Fragment>
			<h1 style={{ textAlign: 'center' }}>Edit Your Profile</h1>
			<DialogContent style={{ textAlign: 'center' }}>
				<form onSubmit={handleSubmit}>
					<div>
						<h2>Name</h2>
						<input value={props.name} onChange={handleName} placeholder="6508687480" />
					</div>
					<div>
						<h2>Bio</h2>
						<input value={props.bio} onChange={handleBio} placeholder="6508687480" />
					</div>
					<div>
						<h2>Phone Number</h2>
						<input value={props.phone} onChange={handlePhone} placeholder="6508687480" />
					</div>
					<br />
					<button>Edit</button>
				</form>
			</DialogContent>
		</React.Fragment>
	);
}

export default ProfileModal;
