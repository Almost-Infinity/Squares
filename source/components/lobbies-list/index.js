import React from 'react';
import style from './styles.sass';

const lobbies = [{
	name: 'Lobby #1',
	members: 4,
	private: true
}, {
	name: 'Lobby #2',
	members: 3,
	private: false
}, {
	name: 'Lobby #3',
	members: 1,
	private: false
}, {
	name: 'Lobby #4',
	members: 2,
	private: true
}, {
	name: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Loremm',
	members: 5,
	private: false
}];

export default function Lobbies() {
	return (
		<table className={ style.lobbiesListList } width='100%' cellSpacing='0' border='1' rules='rows'>
			<thead>
				<tr>
					<th width='40%'>имя</th>
					<th width='20%'>участники</th>
					<th width='20%'>приватная</th>
					<th width='20%'></th>
				</tr>
			</thead>
			<tbody>
				{
					lobbies.map((v, k) => {
						return (
							<tr key={ k }>
								<td>{ v.name }</td>
								<td>{ v.members }</td>
								<td>{ String(v.private) }</td>
								<td><button className={ style.lobbiesListBtn }>Присоедениться</button></td>
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);
}