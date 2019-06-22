import { connect } from 'react-redux';
import Game from '../components/game';

const mapStateToProps = (state) => ({
  sqPool: state.squaresPool
});

export default connect(
  mapStateToProps
)(Game);