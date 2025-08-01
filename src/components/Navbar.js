import React from 'react';
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchFormHidden, setSearchFormHidden] = useState(true);
  const [cartCount, setCartCount] = useState(5);
  const navigate = useNavigate();

  const toggleSearchClass = () => {
    let value = searchFormHidden;
    setSearchFormHidden(!value);
  }

  const handleSubmit = () => {
    navigate('/cart');
  };

  return (
      <header class="container">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
              <a class="navbar-brand" href="/">
                <img src="./img/header-logo.png" alt="Bosa Noga" />
              </a>
              <div class="collapse navbar-collapse" id="navbarMain">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <Link class="nav-link" to='/'>Главная</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to='/catalog'>Каталог</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/about">О магазине</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/contacts">Контакты</Link>
                  </li>
                </ul>
                <div>
                  <div class="header-controls-pics">
                    <div data-id="search-expander" onClick={() => toggleSearchClass()} class="header-controls-pic header-controls-search"></div>
                    <div class="header-controls-pic header-controls-cart" onClick={() => handleSubmit()}>
                      <div class="header-controls-cart-full">{cartCount}</div>
                      <div class="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <SearchForm hidden={searchFormHidden} />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
  );
};


// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchFormHidden: true,
//       cartCount: 5
//     };
//   }
//   toggleSearchClass() {
//     let value = this.state.searchFormHidden;
//     this.setState({ searchFormHidden: !value });
//   }

//    handleSubmit = () => {
//     history.push("/cart");
//   };

//   render() {
//     const { history } = this.props;

//     return (
//       <header class="container">
//         <div class="row">
//           <div class="col">
//             <nav class="navbar navbar-expand-sm navbar-light bg-light">
//               <a class="navbar-brand" href="/">
//                 <img src="./img/header-logo.png" alt="Bosa Noga" />
//               </a>
//               <div class="collapse navbar-collapse" id="navbarMain">
//                 <ul class="navbar-nav mr-auto">
//                   <li class="nav-item active">
//                     <Link class="nav-link" to='/'>Главная</Link>
//                   </li>
//                   <li class="nav-item">
//                     <Link class="nav-link" to='/catalog'>Каталог</Link>
//                   </li>
//                   <li class="nav-item">
//                     <Link class="nav-link" to="/about">О магазине</Link>
//                   </li>
//                   <li class="nav-item">
//                     <Link class="nav-link" to="/contacts">Контакты</Link>
//                   </li>
//                 </ul>
//                 <div>
//                   <div class="header-controls-pics">
//                     <div data-id="search-expander" onClick={() => this.toggleSearchClass()} class="header-controls-pic header-controls-search"></div>
//                     <div class="header-controls-pic header-controls-cart" onClick={() => history.push("/cart")}>
//                       <div class="header-controls-cart-full">{this.state.cartCount}</div>
//                       <div class="header-controls-cart-menu"></div>
//                     </div>
//                   </div>
//                   <SearchForm hidden={this.state.searchFormHidden} />
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </header>

//     );
//   }
// }

export default Navbar;