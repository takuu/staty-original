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
              <a href="https://www.google.com">gOOgle</a>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-8">awefj;lajwelkfj a;lkjaw;lekfj aw;kefj ;lawjeflkj a;lwkejf a;lwkjef lkajwef alk;jef la;kje fal;kjf alkjf alkjf a;lwkejf al;kwje flkajwe lfkja wl;ekjf ;alkjfa;l</div>
            <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
