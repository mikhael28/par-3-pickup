/* eslint-disable indent */
import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import LinkedIn from 'linkedin-login-for-react';
import API from '@aws-amplify/api';

function ProfileModal(props) {
	async function callbackLinkedIn(error, code, redirectUri) {
		if (error) {
			// signin failed
			console.log('Error: ', error);
		} else {
			// Obtain authorization token from linkedin api
			// see https://developer.linkedin.com/docs/oauth2 for more info
			// set authenticated to true, store something in local storage?
			let linkedInfo = await fetchLinkedInInfo(code);
			let profileInfo = await fetchProfileData(linkedInfo.profile.id);
			if (profileInfo.fName === undefined) {
				let body = {
					PK: 'member',
					SK: linkedInfo.profile.id,
					LSI1: 'seattle',
					fName: linkedInfo.profile.localizedFirstName,
					lName: linkedInfo.profile.localizedLastName,
					profilePicture:
						linkedInfo.picture.profilePicture['displayImage~'].elements[0].identifiers[0].identifier,
					access_token: linkedInfo.token.access_token,
					// array of records, to track best hole score, etc.
					records: [],
					achievements: [],
					phone: '',
					bio: '',
					xp: 0
				};
				try {
					let newUser = await API.post('matches', '/sp3', { body });
					console.log('New User: ', newUser);
					props.setGolfer(body);
					localStorage.setItem('golfer', JSON.stringify(body));
				} catch (e) {
					console.log('User creation error: ', e);
				}

				localStorage.setItem('authenticated', 'true');
				localStorage.setItem('id', linkedInfo.profile.id);
				props.setAuthenticated(true);
				props.closeModal();
			} else {
				props.setGolfer(profileInfo);
				localStorage.setItem('golfer', JSON.stringify(profileInfo));
				localStorage.setItem('authenticated', 'true');
				props.setAuthenticated(true);
				props.closeModal();
			}
		}
	}

	async function fetchProfileData(id) {
		try {
			// PK of 'profile', SK of ID?
			let response = await API.get('matches', `/sp3/object/member/${id}`);

			return response;
		} catch (e) {
			console.log('Error fetching profile: ', e);
		}
	}

	console.log(process.env.NODE_ENV);

	async function fetchLinkedInInfo(authorizationCode) {
		// we are sending a post to our LinkedIn OAuth API to get the access token, and then on the server side to get profile info and send it back here, in the form of a returned 'data' object.
		let link;
		process.env.NODE_ENV === 'development'
			? (link = 'http://localhost:3000/')
			: (link = 'https://www.seattlepar3.com/');
		try {
			let data = await API.post('util', `/auth`, {
				body: {
					authorization: authorizationCode,
					uri: link
				}
			});
			console.log('Profile Data: ', data);
			return data;
		} catch (e) {
			console.log('OAuth LI Error: ', e);
		}
	}

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
		<div style={{ padding: 20 }}>
			{props.authenticated === false ? (
				<div>
					<div className="flex-between">
						<h1>Login / Register</h1>
						{/* <button onClick={props.closeModal}>Close</button> */}
					</div>
					<h2>Benefits</h2>
					<ol style={{ listStyleType: 'upper-roman', padding: 10, margin: 8 }}>
						<li className="list-style">Track your golfing achievements to grow your GS (Golfer Score)</li>
						<li className="list-style">
							Invite connections on LinkedIn to play golf & develop those relationships
						</li>
						<li className="list-style">Set skins on a game, for a friendly wager with friends.</li>
						<li className="list-style">Join a community of beginner & experienced players alike.</li>
					</ol>
					<div id="linkedin-connect">
						<LinkedIn
							clientId="86ydeex4svad2m"
							callback={callbackLinkedIn}
							className="social-button"
							scope={[ 'r_liteprofile', 'r_emailaddress' ]}
							text="Login With LinkedIn"
						/>
					</div>
				</div>
			) : (
				<div>
					<div className="flex-between">
						<h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
						{/* <button onClick={props.closeModal}>Close</button> */}
					</div>
					<DialogContent style={{ textAlign: 'center' }}>
						<img src={props.golfer.picture} height="100" width="100" />
						<p>
							{props.golfer.fName} {props.golfer.lName}
						</p>
						<form onSubmit={handleSubmit}>
							{/* <div>
								<h2>Name</h2>
								<input value={props.name} onChange={handleName} placeholder="6508687480" />
							</div> */}
							<div>
								<h2>Bio</h2>
								<input value={props.bio} onChange={handleBio} placeholder="I am a cool golfer" />
							</div>
							<div>
								<h2>Phone Number</h2>
								<input value={props.phone} onChange={handlePhone} placeholder="6508687480" />
							</div>
							<br />
							<button>Edit</button>
						</form>
					</DialogContent>
				</div>
			)}
		</div>
	);
}

export default ProfileModal;
