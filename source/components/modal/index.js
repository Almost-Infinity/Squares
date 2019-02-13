import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './styles.sass';

class Modal extends Component {
	constructor(props) {
		super(props);

		this.resize = this.resize.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.getModalOffset = this.getModalOffset.bind(this);
	}

	getModalOffset() { // To receive valid val need calling after mount
		return Math.max($(window).height() / 2 - $('.modal-wnd').outerHeight() / 1.3, 10);
	}

	closeModal() {
		$('.modal-wnd').css('margin-top', '0px');
		$('.modal-bg').removeClass('shown');
		setTimeout(this.props.close_fn, 200);
	}

	resize() {
		$('.modal-wnd').css('margin-top', `${this.getModalOffset()}px`);
	}


	componentDidMount() {
		this.resize();

		$('.modal-bg').addClass('shown');
		$('.modal-wnd').css('margin-top', `${this.getModalOffset()}px`);

		$(window).bind('resize', this.resize);
	}

	componentWillUnmount() {
		$(window).unbind('resize', this.resize);
	}

	componentDidUpdate() {
		this.resize();
	}

	render() {
		return (
			<div className="modal-bg">
				<div className="modal-wnd">
					<div className="modal-title-wrap">
						<div className="modal-title">{ this.props.title }</div>
						<div className="modal-close" aria-label="Закрыть" onClick={ this.closeModal }>
							<svg role="img" version="1.1" viewBox="0 0 92.265 135.47" xmlns="http://www.w3.org/2000/svg">
								<g transform="translate(-18.124 -139.93)">
									<path d="m24.234 161.53c-0.23462 0-0.46916 0.0898-0.64894 0.2695l-5.1921 5.1921c-0.35955 0.35955-0.35955 0.93832 0 1.2979l39.373 39.373-39.373 39.373c-0.35955 0.35955-0.35955 0.93832 0 1.2979l5.1921 5.1921c0.35955 0.35954 0.93832 0.35954 1.2979 0l39.373-39.373 39.373 39.373c0.35955 0.35954 0.93833 0.35954 1.2979 0l5.1921-5.1921c0.35956-0.35954 0.35956-0.93831 0-1.2979l-39.373-39.373 39.373-39.373c0.35956-0.35955 0.35956-0.93832 0-1.2979l-5.1921-5.1921c-0.35954-0.35955-0.93832-0.35955-1.2979 0l-39.373 39.373-39.373-39.373c-0.17978-0.17978-0.41432-0.2695-0.64894-0.2695z" />
								</g>
							</svg>
						</div>
					</div>
					<div className="modal-content">{ this.props.content }</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.element.isRequired,
	close_fn: PropTypes.func.isRequired
};

export default Modal;