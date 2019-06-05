import React from 'react';

export default({personagem, starships, close, getImage}) => {
  const renderStarships = () => {
    return starships.map((starship, index) =>(
      <div className="lightbox__category-item" key={index}>
        <p><strong>Nome:</strong> {starship.name}</p>
        <p><strong>Modelo:</strong> {starship.model}</p>
        <p><strong>Fabricante:</strong> {starship.manufacturer}</p>
        <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
        <p><strong>Tripulação:</strong> {starship.crew}</p>
        <p><strong>Passageiros:</strong> {starship.passengers}</p>
      </div>
    ));
  }

  return (
    <div className="lightbox__mask">
      <div className="lightbox__content">
        <button className="lightbox__close" onClick={close}>x</button>
        <figure className="lightbox__image" style={{backgroundImage: `url(${getImage(personagem.name)})`}}></figure>

        <p className="lightbox__name">{personagem.name}</p>
        <div className="lightbox__persona-info">
          <p><strong>Ano de Nacimento:</strong> {personagem.birth_year}</p>
          <p><strong>Altura:</strong> {personagem.height}cm</p>
          <p><strong>Sexo:</strong> {personagem.gender}</p>
          <p><strong>Peso:</strong> {personagem.mass}kg</p>
          <p><strong>Cor de Pele:</strong> {personagem.skin_color}</p>
          <p><strong>Cor dos Olhos:</strong> {personagem.eye_color}</p>
        </div>
        {starships.length > 0 &&
          <div>
            <p className="lightbox__category">Naves</p>
            <div className="lightbox__scroll">
              {renderStarships()}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
