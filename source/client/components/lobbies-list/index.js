import React from 'react';
import style from './styles.sass';

import Icon from '../icons';

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
		return <Icon name={ tag === sortType ? (sortASC ? 'sortAsc' : 'sortDesc') : 'sort' } className={ style.lobbiesListSortIcon } />
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
										<td>
											{
												v.private ?
													<Icon name='locked' className={ style.lobbiesListLockIcon } fill='#da8686' /> :
													<Icon name='unlocked' className={ style.lobbiesListLockIcon } fill='#86da87' />
											}
										</td>
										<td>
											<button className={ style.lobbiesListBtn }>Присоедениться</button>
										</td>
									</tr>
								);
							})
					}
				</tbody>
			</table>
		);
	}
}