import React from 'react';

export default({pages, current, pageChange}) => {
  const renderItens = () => {
    return pages.map(number => (
      <button key={number} id={number} onClick={pageChange} className={number === current ? 'pagination__button pagination__button--active' : 'pagination__button'}>{number}</button>
    ));
  }
  return (
    <div className="pagination">
      {renderItens()}
    </div>
  )
}
