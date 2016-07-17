import React from 'react';
if (process.env.BROWSER) require('./styles.css');

const StatsHeader = () => {
  return (
    <div>
      <div className='table-row table-header'>
        <div className='text' style={{width: '150px'}}></div>
        <div className='num'>G</div>
        <div className='num'>FGM</div>
        <div className='num'>FGA</div>
        <div className='num'>FG%</div>
        <div className='num'>3PM</div>
        <div className='num'>3PA</div>
        <div className='num'>3PT%</div>
        <div className='num'>FTM</div>
        <div className='num'>FTA</div>
        <div className='num'>FT%</div>
        <div className='num'>REB</div>
        <div className='num'>AST</div>
        <div className='num'>ST</div>
        <div className='num'>BS</div>
        <div className='num'>PF</div>
        <div className='num'>PTS</div>
      </div>
    </div>
  );
};
export default StatsHeader;
