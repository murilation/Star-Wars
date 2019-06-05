import React, {Component} from 'react';
import axios from 'axios';
import Loading from '../../components/loading/loading';
import Cards from '../../components/cards/cards';
import Lightbox from '../../components/lightbox/lightbox';
import Pagination from '../../components/pagination/pagination';
import * as Utils from '../../utilities/utilities';

const URLPersonagens = 'https://swapi.co/api/people/';

export default class AppLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personagens: [],
      images: [],
      starships: [],
      lightbox: false,
      activePersona: '',
      currentPage: 1,
      personasPerPage: 20,
      loaded: false
    }
    this.loadPersonagens = this.loadPersonagens.bind(this);
    this.loadStarships = this.loadStarships.bind(this);
    this.loadInformation = this.loadInformation.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.getImage = this.getImage.bind(this);

    this.loadPersonagens();
  }

  loadPersonagens() {
    new Promise((resolve, reject) => {
      Utils.getPersonas(URLPersonagens, [], resolve, reject)
    })
    .then(resp => {
      this.setState({personagens: resp}, () => {
        this.loadImages();
      });
      this.setState({loaded: true});
    });
  }

  getImage(name) {
    let image = this.state.images.filter(v => v.name === name)[0];
    if (image) {
      return image.src;
    }
  }

  loadImages() {
    var ls = localStorage.getItem('imagesStarWars');

    if (ls) {
      this.setState({images: JSON.parse(ls)});
    } else {
      this.state.personagens.map((personagem, index) => {
        axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyA06brfbigdr4X6DHIXJstvfHfAWGuSDTk&cx=012736886285779599120:fy1nflo0e9k&q=' + personagem.name)
          .then(resp => {
            let item = {name: personagem.name, src: resp.data.items[0].pagemap.cse_image[0].src};
            let list = this.state.images;
            list.push(item);
            this.setState({images: list}, () => {
              if (this.state.personagens.length === list.length) {
                localStorage.setItem('imagesStarWars', JSON.stringify(list));
              }
            });
          });
      });
    }
  }

  loadStarships(starships) {
    this.setState({starships: []});
    starships.map((starship, index) => {
      axios.get(starship).then(resp => {
        this.setState({starships: this.state.starships.concat(resp.data)});
      });
    });
  }

  loadInformation(personagem) {
    this.loadStarships(personagem.starships);
    this.setState({lightbox: true});
    this.setState({activePersona: personagem});
  }

  closeLightbox() {
    this.setState({lightbox: false});
    this.setState({activePersona: null});
  }

  pageChange(e) {
    this.setState({currentPage: Number(e.target.id)});
  }

  render() {
    const {personagens, currentPage, personasPerPage, lightbox, activePersona, starships, images} = this.state;

    const indexLastPersona = currentPage * personasPerPage;
    const indexFirstPersona = indexLastPersona - personasPerPage;
    const currentPersonas = personagens.slice(indexFirstPersona, indexLastPersona);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(personagens.length / personasPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <Cards personagens={currentPersonas} load={this.loadInformation} getImage={this.getImage} />
        {!this.state.loaded &&
          <Loading />
        }
        {lightbox &&
          <Lightbox personagem={activePersona} starships={starships} close={this.closeLightbox} getImage={this.getImage} />
        }
        <Pagination pages={pageNumbers} current={currentPage} pageChange={this.pageChange} />
      </div>
    )
  }
}
