import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './styles.sass';

class Modal extends Component {
	constructor(props) {
		super(props);

		this.resize = this.resize.bind(this);
		this.getModalOffset = this.getModalOffset.bind(this);
	}

	getModalOffset() { // To receive valid val need calling after mount
		return Math.max($(window).height() / 2 - $('.modal-wnd').outerHeight() / 1.3, 10);
	}

	resize() {
		$('.modal-wnd').css('margin-top', `${this.getModalOffset()}px`);
	}


	componentDidMount() {
		this.resize();
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
						<div className="modal-close" aria-label="Закрыть" onClick={ this.props.close_fn }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.017 91.017">
								<path d="M7.155 0a.791.791 0 0 0-.56.234L.232 6.594a.792.792 0 0 0 0 1.123l37.792 37.792L.233 83.3a.792.792 0 0 0 0 1.122l6.361 6.361c.311.311.812.311 1.123 0l37.791-37.791L83.3 90.784c.311.311.812.311 1.123 0l6.361-6.36a.792.792 0 0 0 0-1.123L52.992 45.509 90.784 7.717a.792.792 0 0 0 0-1.123L84.423.234a.792.792 0 0 0-1.123 0L45.508 38.025 7.717.234A.793.793 0 0 0 7.155 0z"/>
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