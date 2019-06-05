import React from 'react';

export default({personagens, load, getImage}) => {

  const renderPersonas = () => {
    return personagens.map((personagem, index) => (
      <div className="card__item" key={index} onClick={() => load(personagem)}>
        <figure className="card__image" style={{backgroundImage: `url(${getImage(personagem.name)})`}}></figure>
        <div className="card__info">
          <p className="card__name">{personagem.name}</p>
        </div>
      </div>
    ));
  }

  return (
    <div className="ui-center">
      <div className="personagens">
        {renderPersonas()}
      </div>
    </div>
  )
}
