import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import createLink from '../../utils/createLinks';
class LeagueContactPage extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object
  };
  render () {
    const {league} = this.props;

    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });
    return (
      <div className='sub-container'>
        <div className="portlet-title">
          <div className="page-title">Contact Us</div>
        </div>
        <div style={{padding: '10px'}}>
          <h2>Contact Us</h2>
          Lorem ipsum dolor sit amet, ornare velit ut at mauris, eget in facilisis. Consectetuer morbi mattis, diam adipiscing integer nulla. Suspendisse elit purus ut orci, scelerisque litora wisi neque viverra, suspendisse lobortis nonummy rutrum, lectus mauris, duis nulla. Adipiscing erat, odio eligendi pede fringilla, libero tempus nullam, ipsum aptent imperdiet, egestas pede. Ligula accumsan ipsum. Nulla inceptos.
          Accumsan porttitor non odio tristique suspendisse, ante lorem vulputate nulla in nunc, non curabitur cum wisi, leo donec volutpat lectus maecenas viverra sodales, wisi maecenas ipsum. Eu turpis, mauris vulputate augue convallis lobortis, justo semper. Et eros ante arcu libero erat. Netus commodo mollis, tristique ultrices pede platea luctus felis. Urna nunc, vivamus nulla ac sed, sed massa feugiat ligula donec lacus ligula, eu elit pellentesque ac orci feugiat, velit nulla vitae. Amet at odio lorem et, pariatur vel sapien purus tincidunt, faucibus ultrices egestas vitae, nec et quam curabitur et pellentesque, nam nibh massa sed vestibulum nisl vitae. Vehicula pellentesque vel velit metus, etiam pede et mauris sapien at, elit at. Nec et et neque, ut diam erat ac fusce taciti. In sed pretium maecenas cursus, nam etiam neque porttitor, semper tincidunt elit sed placerat.
          {childrenWithProps}
        </div>
      </div>
    );
  }
}

export default LeagueContactPage;
