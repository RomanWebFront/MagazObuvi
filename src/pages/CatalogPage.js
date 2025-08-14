import React from 'react';
import Catalog from "../components/Catalog.js"

class CatalogPage extends React.Component {
  render() {
    return (
      <div>
        < Catalog showSearch = {true} />
      </div>
    );
  }
}

export default CatalogPage;