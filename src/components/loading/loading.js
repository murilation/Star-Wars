import React from 'react';
import gif from '../../images/loader.gif';

export default props => (
  <div className="loading">
    <div className="loading__center">
      <img src={gif} alt="Loading" className="loading__image" />
      <p className="loading__title">Loading</p>
    </div>
  </div>
)
