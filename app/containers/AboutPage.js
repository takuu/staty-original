import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './styles.css';

@connect(state => ({
}), {})
export default class AboutPage extends React.Component {


  render() {
    return (
      <div className="container">
        <div style={{marginTop: '50px'}} className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-8">
                <h1 className="k-header--medium k-color--marine">About Us</h1>
                <p className ="k-paragraph k-spacing-bottom--x-large">
                "Our mission is simple - make Internet access on every device better than ever before.  As we reinvent how we get connected, we'll ask ourselves two basic questions:
                    Is this simple? Is this honest?"
                </p>
                <div className="row w-employees k-spacing-bottom--base">
                    <div className="col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/eambrose-0ecf891456cbc27c5f73b4e317bc036ccea660a94ee03e83497649c405cf2500.jpg"
                             alt="Eambrose 0ecf891456cbc27c5f73b4e317bc036ccea660a94ee03e83497649c405cf2500"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">Erin Ambrose</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Head of Customer Experience</p>
                        </div>
                    </div>
                    <div className="col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/sborsje-fd449768cc8b8a57aec212cd3e307c402e46deb8ddec08ccab13c1d416f110e6.jpg"
                             alt="Sborsje fd449768cc8b8a57aec212cd3e307c402e46deb8ddec08ccab13c1d416f110e6"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">John Doe</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Chief Technology Officer</p>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/kmatsumoto-4b9cdefa5e221735a8fe6700f09ff0dbab70075e785f5b3ff631ecf64b3ebc88.jpg"
                             alt="Kmatsumoto 4b9cdefa5e221735a8fe6700f09ff0dbab70075e785f5b3ff631ecf64b3ebc88"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">Kate Matsumoto</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Graphic Designer</p>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/eambrose-0ecf891456cbc27c5f73b4e317bc036ccea660a94ee03e83497649c405cf2500.jpg"
                             alt="Eambrose 0ecf891456cbc27c5f73b4e317bc036ccea660a94ee03e83497649c405cf2500"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">Erin Ambrose</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Head of Customer Experience</p>
                        </div>
                    </div>
                    <div className="col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/sborsje-fd449768cc8b8a57aec212cd3e307c402e46deb8ddec08ccab13c1d416f110e6.jpg"
                             alt="Sborsje fd449768cc8b8a57aec212cd3e307c402e46deb8ddec08ccab13c1d416f110e6"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">John Doe</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Chief Technology Officer</p>
                        </div>
                    </div>
                    <div className="col-md-3 k-align--center">
                        <img className="w-employee" src="https://dy53q6sor7j4i.cloudfront.net/assets/kmatsumoto-4b9cdefa5e221735a8fe6700f09ff0dbab70075e785f5b3ff631ecf64b3ebc88.jpg"
                             alt="Kmatsumoto 4b9cdefa5e221735a8fe6700f09ff0dbab70075e785f5b3ff631ecf64b3ebc88"></img>
                        <div className="k-balloon w-employee-title">
                            <h3 className="k-header--x-small k-spacing-bottom--none">Kate Matsumoto</h3>
                            <p className="k-paragraph--small k-spacing-bottom--none">Graphic Designer</p>
                        </div>
                    </div>
                </div>
                <div className="k-section--large">
                    <h2 className="k-header k-color--night">Media Resources</h2>
                    <p className="k-paragraph">
                        These are official Karma graphical resources that you may include on your webpage or in printed material. For more info reach out at
                        <a className ="k-link" href="mailto:media@yourkarma.com"> media@yourkarma.com</a>
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="k-header--small">Logos</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="k-badge k-badge--clickable k-spacing-bottom--small w-media w-media-logo"
                                     style={{backgroundImage: "url(https://dy53q6sor7j4i.cloudfront.net/assets/press-kit/placeholder-karma-logo-1c945b5d4d61c1dc16d3e5d842f82ae8981aac135eb9df2d52a13828a1a902b0.jpg)"}}>
                                    <a className="k-badge-link" href="https://dy53q6sor7j4i.cloudfront.net/media/Karma-Identity-Assets-20150831.zip">
                                    <span className="k-badge-link-text">ZIP</span></a>
                                </div>
                                <p className="k-paragraph--small">EPS, PDF, PNG</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="k-header--small">Founder Headshots</h3>
                        <div className="row">
                            <div className="col-md-6">
                                 <div className="k-badge k-badge--clickable k-spacing-bottom--small w-media"
                                      style={{backgroundImage: "url(https://dy53q6sor7j4i.cloudfront.net/assets/sborsje-fd449768cc8b8a57aec212cd3e307c402e46deb8ddec08ccab13c1d416f110e6.jpg)"}}>
                                     <a className="k-badge-link" href="https://dy53q6sor7j4i.cloudfront.net/assets/press-kit/stefanborsje-cto-8a2edf1c602ae6fc32dc98f4115ac2dab169c2d852145a7d9d39d337c0549cb2.jpg">
                                         <span className="k-badge-link-text">JPG</span></a>
                                 </div>
                                 <h4 className="k-header--x-small">Stefan Borsje</h4>
                                 <p className="k-paragraph--small">CEO, Co-Founder</p>
                            </div>
                            <div className="col-md-6">
                                <div className="k-badge k-badge--clickable k-spacing-bottom--small w-media"
                                     style={{backgroundImage: "url(https://dy53q6sor7j4i.cloudfront.net/assets/press-kit/stevenvanwel-ceo-431552ce7185f68742d95e714d27813060c049c25ac8edb90d4415b7af501ce2.png)"}}>
                                    <a class="k-badge-link" href="https://dy53q6sor7j4i.cloudfront.net/assets/press-kit/stevenvanwel-ceo-431552ce7185f68742d95e714d27813060c049c25ac8edb90d4415b7af501ce2.png">
                                        <span class="k-badge-link-text">PNG</span></a>
                                </div>
                                <h4 className="k-header--x-small">Some Dude</h4>
                                <p className="k-paragraph--small">CTO, Co-Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="k-header--small">Karma Go Photos</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="k-badge k-badge--clickable k-spacing-bottom--small w-media w-media-logo"
                                     style={{backgroundImage: "url(https://dy53q6sor7j4i.cloudfront.net/assets/graphic-ecosystem-1e5b16362bc48c49e66aa2091e74864a0e15127aca8d02bd4e449481c678b96a.jpg)"}}>
                                    <a className="k-badge-link" href="https://dy53q6sor7j4i.cloudfront.net/media/Karma-Go-Photos-20151116.zip">
                                        <span className="k-badge-link-text">ZIP</span></a>
                                </div>
                                <p className="k-paragraph--small">JPG, TIF</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="k-header--small">Mobile Apps</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="k-badge k-badge--clickable k-spacing-bottom--small w-media w-media-logo"
                                     style={{backgroundImage: "url(https://dy53q6sor7j4i.cloudfront.net/assets/press-kit/app-ios-2e29bde7166d00c9bec0e1cd32315012737b14e6eb6953f73e5ea2318aaec861.png)"}}>
                                    <a className="k-badge-link" href="https://dy53q6sor7j4i.cloudfront.net/media/Karma-Go-Photos-20151116.zip">
                                        <span className="k-badge-link-text">ZIP</span></a>
                                </div>
                                <p className="k-paragraph--small">iPhone & Android App</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
