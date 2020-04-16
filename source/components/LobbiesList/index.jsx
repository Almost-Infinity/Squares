import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchLobbies } from 'Actions';
import { object, func } from 'prop-types';
import ErrorMessage from 'Components/ErrorMessage';
import Icon from 'Components/Icon';

import styles from './styles.sass';

const SORT_WAY_ASCENDING = 'sort-asc';
const SORT_WAY_DESCENDING = 'sort-desc';

const headers = [
	{ key: 'id', title: '#', width: '5%' },
	{ key: 'name', title: 'Название', width: '35%' },
	{ key: 'members', title: 'Участники', width: '20%' },
	{ key: 'isPrivate', title: 'Частная', width: '20%' },
	{ key: '', title: '', width: '20%' }
];

function LobbiesList(props) {
	const [ sortKey, setSortKey ] = useState('id');
	const [ sortWay, setSortWay ] = useState(SORT_WAY_ASCENDING);

	useEffect(() => {
		props.fetchLobbies();
	}, []);

	const onSort = (newSortKey) => {
		if (newSortKey === sortKey) {
			setSortWay(
				sortWay === SORT_WAY_ASCENDING ?
					SORT_WAY_DESCENDING :
					SORT_WAY_ASCENDING
			);
		}
		else {
			setSortKey(newSortKey);
			setSortWay(SORT_WAY_ASCENDING);
		}
	};

	const sorter = ({ [sortKey]: a }, { [sortKey]: b }) => {
		return sortWay === SORT_WAY_ASCENDING ?
			((a < b) ? -1 : ((a > b) ? 1 : 0)) :
			((a < b) ? 1 : ((a > b) ? -1 : 0));
	};


	// Rendering
	if (props.lobbies.isFetching) {
		return <Icon type='spinner' width='50' height='50' className={styles.loadingSpinner}/>;
	}

	if (props.lobbies.fetchingError) {
		return <ErrorMessage
			errorTitle='Ошибка получения списка лобби!'
			errorText={props.lobbies.fetchingError.message}
			reloadBtn={true}
		/>
	}

	return (
		<table className={styles.lobbiesListList} width='100%' cellSpacing='0' border='1' rules='rows'>
			<thead>
				<tr>
					{
						headers
							.map((v, k) => {
								return (
									<th key={k} onClick={() => onSort(v.key)} width={v.width}>
										{
											v.key && <Icon
												type={v.key === sortKey ? sortWay : 'sort'}
												className={styles.lobbiesListSortIcon}
											/>
										}
										<span>{v.title}</span>
									</th>
								);
							})
					}
				</tr>
			</thead>
			<tbody>
				{
					props.lobbies.list
						.sort(sorter)
						.map((v, k) => {
							return (
								<tr key={k}>
									<td>{v.id + 1}</td>
									<td>{v.name}</td>
									<td>{v.members}</td>
									<td>
										<Icon
											width='25'
											height='25'
											type={v.isPrivate ? 'locked' : 'unlocked'}
											style={{fill: v.isPrivate ? '#d87777' : '#77d887'}}
										/>
									</td>
									<td>
										<button className={styles.lobbiesListBtn}>Присоедениться</button>
									</td>
								</tr>
							);
						})
					}
			</tbody>
		</table>
	);
}

LobbiesList.propTypes = {
  lobbies: object.isRequired,
	fetchLobbies: func.isRequired
};

const mapStateToProps = (state) => ({ lobbies: state.lobbies });

export default connect(
	mapStateToProps,
	{ fetchLobbies }
)(LobbiesList);