import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PromotionList from 'components/Promotion/List/List';
import './Search.css'


const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = {};
    if (search) {
      params.title_like = search;
    }
    axios.get('http://localhost:5005/promotions?_embed=comments&_order=desc&_sort=id' , {params})
    .then((response) => {
      setPromotions(response.data);
    });
  }, [search]);

  return (
      <div className="promotion-search">
        <header className="promotion-search__header">
          <h1>Promoção do Amigão</h1>
          <Link to="/create">Nova Promoção</Link>
        </header>
        <input
          type="search"
          className="promotion-search__input"
          placeholder="Buscar"
          value={search}
          onChange={( event) => setSearch(event.target.value)}
        />
        <PromotionList promotions={promotions} loading={!promotions.length}/>
      </div>
  )
};

export default PromotionSearch;
