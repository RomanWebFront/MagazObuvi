import React, { Component } from 'react';
import TopSalers from "../components/TopSalers.js"
import Catalog from "../components/Catalog.js"

class HomePage extends React.Component {
  render() {
    return (
      <>
        < TopSalers />
        < Catalog showSearch = {false} />
      </>
    );
  }
}

export default HomePage;