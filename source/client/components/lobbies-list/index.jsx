import React, { useState, useEffect } from 'react';
import style from './styles.sass';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchLobbies } from 'Actions';

import sort from '../../img/icons/sort.svg';
import sortAsc from '../../img/icons/sortAsc.svg';
import sortDesc from '../../img/icons/sortDesc.svg';
import locked from '../../img/icons/locked.svg';
import unlocked from '../../img/icons/unlocked.svg';

const thead = [
	{ tag: 'id', title: '№', width: '5%' },
	{ tag: 'name', title: 'название', width: '35%' },
	{ tag: 'members', title: 'участники', width: '20%' },
	{ tag: 'private', title: 'частная', width: '20%' },
	{ tag: '', title: '', width: '20%' }
];

function Lobbies(props) {
	const [ sortType, setSortType ] = useState('id');
	const [ sortDir, setSortDir ] = useState(true); // true - ascending, false - descending

	useEffect(() => {
		props.fetchLobbies();
	}, []);

	const sortLobbiesList = (newSortType) => {
		(newSortType === sortType) ?
			setSortDir(!sortDir) :
			(setSortType(newSortType), setSortDir(true));
	}

	return (
		<table className={ style.lobbiesListList } width='100%' cellSpacing='0' border='1' rules='rows'>
			<thead>
				<tr>
					{
						thead
							.map((v, k) => {
								return (
									<th key={ k } onClick={ () => sortLobbiesList(v.tag) } width={ v.width }>
										<span
											className={ style.lobbiesListSortIcon }
											style={{
												backgroundImage: `url(${ v.tag && (v.tag === sortType ? (sortDir ? sortAsc : sortDesc) : sort) })`
											}}
										/>
										<span>{ v.title }</span>
									</th>
								);
							})
					}
				</tr>
			</thead>
			<tbody>
				{
					props.lobbies.list
						.sort((a, b) => {
							a = a[sortType];
							b = b[sortType];

							return sortDir ?
								((a < b) ? -1 : ((a > b) ? 1 : 0)) :
								((a < b) ? 1 : ((a > b) ? -1 : 0));
						})
						.map((v, k) => {
							return (
								<tr key={ k }>
									<td>{ v.id + 1 }</td>
									<td>{ v.name }</td>
									<td>{ v.members }</td>
									<td>
										<span
											className={ style.lobbiesListLockIcon }
											style={{
												backgroundImage: `url(${ v.private ? locked : unlocked })`
											}}
										/>
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

Lobbies.propTypes = {
	lobbies: PropTypes.object.isRequired,
	fetchLobbies: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ lobbies: state.lobbies });
const mapDispatchToProps = (dispatch) => ({
	fetchLobbies: () => dispatch(fetchLobbies())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lobbies);