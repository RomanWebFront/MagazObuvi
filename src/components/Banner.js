import React from 'react';

class Banner extends React.Component {
  render() {
    return(
      <main class="container">
      <div class="row">
        <div class="col">
          <div class="banner">
            <img src="/img/banner.jpg" class="img-fluid" alt="К весне готовы!"/> 
            <h2 class="banner-header">К весне готовы!</h2>
          </div>
          {this.props.children}
        </div>
      </div>
    </main>
    );
  }
}

export default Banner;