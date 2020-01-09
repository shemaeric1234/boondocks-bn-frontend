import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => state;
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
	return {};
};

const RequestHeader = () => <div>Request Header</div>;

export default connect(mapStateToProps, mapDispatchToProps)(RequestHeader);
