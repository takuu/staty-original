import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './styles.css';

@connect(state => ({
}), {})
export default class AboutPage extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>About us</h1>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1 eric">.col-md-1</div>
            <div className="col-md-12" style={{marginTop: '40px'}}></div>
            <h2>Mofufus</h2>
            <h3>Mofufus</h3>
            <div className="col-md-12">
              <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-danger">Left</button>
                <button type="button" className="btn btn-default">Middle</button>
                <button type="button" className="btn btn-default">Right</button>
              </div>
            </div>
            <div className="col-md-12">
              <button type="button" className="btn btn-default">Left</button>
             </div>
            <div className="col-md-12">
              <img src="http://www.small-hydro.com/images/home_btn_small.jpg" alt="google"></img>

            </div>
            <div className="col-md-2">
              <a href="https://www.google.com">gooooooogle</a>
            </div>
            <div className="col-md-10">.col-md-10</div>
            <div className="col-md-2"></div>
            <div className="col-md-8">ASDF This is my first text that I am putting in the about page for the website. asdklf;lkas df;alksdjf asdf;lkjasd falskdfj askdfjlkasd;flkj a alksdjf;lkajsd falksjdf ;laksj dfadsflkj  </div>
            <div className="col-md-2">.col-md-2</div>
            <div className="col-md-8">ASDF This is my first text that I am putting in the about page for the website</div>
            <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
