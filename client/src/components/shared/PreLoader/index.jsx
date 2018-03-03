import React from 'react';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/ball-scale-multiple.scss';
import MiniPreLoader from './MiniPreLoader';
import './PreLoader.scss';

const PreLoader = () => (<Loader type="ball-scale-multiple" />);

export { MiniPreLoader };
export default PreLoader;
