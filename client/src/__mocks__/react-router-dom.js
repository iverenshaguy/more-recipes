/* eslint-disable */
import React from 'react';

const rrd = require('react-router-dom');
// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;

export default rrd;
