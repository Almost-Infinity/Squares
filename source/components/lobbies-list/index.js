import React from 'react';
import style from './styles.sass';

const lobbies = [{
	id: 1,
	name: 'Lobby #1',
	members: 4,
	private: true
}, {
	id: 2,
	name: 'Top lobby 4ever',
	members: 3,
	private: false
}, {
	id: 3,
	name: 'Fun!',
	members: 1,
	private: false
}, {
	id: 4,
	name: 'Oh my',
	members: 2,
	private: true
}, {
	id: 5,
	name: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Loremm',
	members: 5,
	private: false
}];

const iconLocked = <svg className={ style.lobbiesListLockIcon } xmlns='http://www.w3.org/2000/svg' viewBox='0 0 49 49' fill='#da8686'><path d='M39,48h-30c-1.656,0,-3,-1.341,-3,-3v-21c0,-1.656,1.344,-3,3,-3v-6c0,-8.286,6.717,-15,15,-15c8.286,0,15,6.714,15,15v6c1.659,0,3,1.344,3,3v21c0,1.659,-1.341,3,-3,3zm-6,-33c0,-4.971,-4.032,-9,-9,-9c-4.971,0,-9,4.029,-9,9v6h18zm3,12h-24v15h24z' /></svg>;
const iconUnlocked = <svg className={ style.lobbiesListLockIcon } xmlns='http://www.w3.org/2000/svg' viewBox='0 0 49 49' fill='#86da87'><path d='m38.621193,20.621193h-24v-6c0,-4.9710002,4.029,-9.0000002,9,-9.0000002c3.915,0,7.206,2.514,8.448,6.0000002h6.249c-1.389,-6.8460002,-7.44,-12.00000021,-14.697,-12.00000021c-8.283,0,-15.0000002,6.71400001,-15.0000002,15.00000021v6c-1.656,0,-3,1.344,-3,3v21c0,1.659,1.344,3,3,3h30c1.659,0,3,-1.341,3,-3v-21c0,-1.656,-1.341,-3,-3,-3zm-3,6v15h-24v-15z' /></svg>;

const iconSort = <svg className={ style.lobbiesListSortIcon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>;
const iconSortASC = <svg className={ style.lobbiesListSortIcon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>;
const iconSortDESC = <svg className={ style.lobbiesListSortIcon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>;

const thead = [
	{ tag: 'id', title: '№', width: '5%' },
	{ tag: 'name', title: 'название', width: '35%' },
	{ tag: 'members', title: 'участники', width: '20%' },
	{ tag: 'private', title: 'частная', width: '20%' },
	{ tag: '', title: '', width: '20%' }
];

export default class Lobbies extends React.Component {
	constructor() {
		super();

		this.state = {
			sortType: 'id',
			sortASC: true 
		};
	}

	sortLobbiesList = (newSortType) => {
		if (newSortType === this.state.sortType) {
			this.setState({
				sortASC: !this.state.sortASC
			});
		} else {
			this.setState({
				sortType: newSortType,
				sortASC: true
			});
		}
	}

	getSortDirectionIcon = (tag) => {
		const { sortType, sortASC } = this.state;
		return tag === sortType ? (sortASC ? iconSortASC : iconSortDESC) : iconSort;
	} 

	render() {
		const { sortType, sortASC } = this.state;

		return (
			<table className={ style.lobbiesListList } width='100%' cellSpacing='0' border='1' rules='rows'>
				<thead>
					<tr>
						{
							thead
								.map((v, k) => {
									return (
										<th key={ k } onClick={ () => this.sortLobbiesList(v.tag) } width={ v.width }>
											{ v.tag && this.getSortDirectionIcon(v.tag) }
											{ v.title }
										</th>
									);
								})
						}
					</tr>
				</thead>
				<tbody>
					{
						lobbies
							.sort((a, b) => {
								a = a[sortType];
								b = b[sortType];

								return sortASC ?
									((a < b) ? -1 : ((a > b) ? 1 : 0)) :
									((a < b) ? 1 : ((a > b) ? -1 : 0));
							})
							.map((v, k) => {
								return (
									<tr key={ k }>
										<td>{ v.id }</td>
										<td>{ v.name }</td>
										<td>{ v.members }</td>
										<td>{ v.private ? iconLocked : iconUnlocked }</td>
										<td><button className={ style.lobbiesListBtn }>Присоедениться</button></td>
									</tr>
								);
							})
					}
				</tbody>
			</table>
		);
	}
}