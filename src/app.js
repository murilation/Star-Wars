import React from 'react';

export default props => (
  <div>
    <header className="main-header ui-center">
      <h1 className="main-header__title">Personagens de Star Wars</h1>
    </header>
    {props.children}
  </div>
);
