import { Table } from 'antd';
import React from 'react'

const TopLosses = () => {
    const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: 'Games',
    dataIndex: 'Games',
    key: 'Games',
  },
  {
    title: 'Bet',
    dataIndex: 'Bet',
    key: 'Bet',
  },
  {
    title: 'Win',
    dataIndex: 'Win',
    key: 'Win',
  },
  {
    title: 'Result',
    dataIndex: 'Result',
    key: 'Result',
  },
  {
    title: ' Played',
    dataIndex: ' Played',
    key: ' Played',
  },
];

const data = [
  { key: 1, Name: '	Applam', Games:'Baccarat', Bet: '1.00'	, Win: "2.00",Result: "Win", ' Played': "7 hours ago" },
  { key: 2, Name: 'Applam', Games: "Dice 3D", Bet: '1.00', Win: "2.02", Result: "17 (bet < 33)", ' Played': "6 hours ago" },
  { key: 3, Name: 'Applam', Games: "Dice 3D", Bet: '1.00', Win: "2.02", Result: "18 (bet < 33)", ' Played': "6 hours ago" },
  { key: 4, Name: 'Applam', Games: "Dice", Bet: '1.00', Win: "0.00", Result: "7950 (<5000)", ' Played': "5 hours ago" },
  { key: 5, Name: 'Applam', Games: "Dice", Bet: '1.00', Win: "1.98", Result: "3381 (<5000)", ' Played': "4 hours ago" },
  { key: 6, Name: 'Applam', Games: "Dice", Bet: '1.00', Win: "1.98", Result: "3612 (<5000)", ' Played': "4 hours ago" },
  { key: 7, Name: 'Applam', Games: "Lucky Wheel", Bet: '1.00', Win: "0.00", Result: "Nothing", ' Played': "3 hours ago" },
  { key: 8, Name: 'Applam', Games: "Lucky Wheel", Bet: '1.00', Win: "0.00", Result: "Nothing", ' Played': "3 hours ago" },
  { key: 9, Name: 'Applam', Games: "Crypto Slots", Bet: '10.00', Win: "3.00", Result: "1 line", ' Played': "2 hours ago" },
  { key: 10, Name: 'Applam', Games: "Crypto Slots", Bet: '10.00', Win: "0.00", Result: "Nothing", ' Played': "1 hour ago" },
];
  return (
    <div className='leaderboard_body'>
      <div className="leaderboard_wrapper">
        <div className="leaderboard_header">
              <h4>Top Losses </h4>
        </div>
        <div className="leaderboard_table">
           <Table 
            columns={columns} 
            dataSource={data} 
            pagination={{ pageSize: window.innerWidth < 400 ? 10 : 7}} 
            scroll={{ x: true }} 
          />
        </div>
      </div>
    </div>
  )
}

export default TopLosses