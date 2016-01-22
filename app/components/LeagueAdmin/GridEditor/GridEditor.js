import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';
import classNames from 'classnames';
import _ from 'lodash';
import './styles.css';
var ReactDataGrid = require('react-data-grid/addons');
export default class DivisionList extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    saveCallback: PropTypes.func,
    columns: PropTypes.array
  };
  static defaultProps = {
    list: [],
    columns: []
  };

  render() {
    const {list, saveCallback, columns} = this.props;
    let _rows = _.cloneDeep(list);

    var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}]
    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>

    //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function(i) {
      return _rows[i];
    };

    var handleRowUpdated = function(item) {
      _rows[item.rowIdx][item.cellKey] = item.updated[item.cellKey];
    };

    var handleGridSort = function(sortColumn, sortDirection) {

      var comparer = function(a, b) {
        if(sortDirection === 'ASC'){
          return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        }else if(sortDirection === 'DESC'){
          return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        }
      };
      var rows = sortDirection === 'NONE' ? list.slice(0) : _rows.sort(comparer);
      _rows = rows;
    };

    var save = function(e) {
      const difference = _.differenceWith(_rows, list, _.isEqual);
      _.map(difference, (item) => {
        saveCallback(item);
      });
    };

    return (
      <div>
        <button onClick={save} style={{float:'right'}}>Save</button>
        <ReactDataGrid
          enableCellSelect={true}
          onGridSort={handleGridSort}
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={_rows.length}
          minHeight={500}
          onRowUpdated={handleRowUpdated}/>
      </div>
    );
  }
}