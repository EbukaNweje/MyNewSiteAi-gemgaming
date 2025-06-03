import React from 'react'
import "../styles/leaderboard.css"
import { Table, Tag } from 'antd';

const LeaderBoard = () => {
  const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    rank: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    rank: 'Name',
  },
  {
    title: 'Games Played',
    dataIndex: 'GamesPlayed',
    rank: 'GamesPlayed',
  },
  {
    title: 'Total Bet',
    dataIndex: 'TotalBet',
    rank: 'TotalBet',
  },
  {
    title: 'Max Win',
    dataIndex: 'MaxWin',
    rank: 'MaxWin',
  },
  {
    title: 'Total net win',
    dataIndex: 'totalnetWin',
    rank: 'totalnetWin',
  },
  {
    title: 'Max Win',
    dataIndex: 'MaxWin',
    rank: 'MaxWin',
  },
];

const data = [
  { rank: 1, Name: '	Brent osburn', GamesPlayed:' 10,723', TotalBet: '20,938,543.00'	, MaxWin: "263,500.00",totalnetWin: "-364,139.06" },
  { rank: 2, Name: 'nan2', GamesPlayed: "9,329", TotalBet: '12,309,908.00', MaxWin: "57,000.00", totalnetWin: "-351,518.22" },
  { rank: 3, Name: 'Zack partridge', GamesPlayed: "3,676", TotalBet: '4,843,227.00', MaxWin: "51,900.00", totalnetWin: "348,701.00" },
  { rank: 4, Name: 'Juzkabluzka', GamesPlayed: "7,121", TotalBet: '4,208,854.00', MaxWin: "25,700.00", totalnetWin: "26,351.96" },
  { rank: 5, Name: 'insyder', GamesPlayed: "2,955", TotalBet: '3,384,501.00', MaxWin: "54,200.00", totalnetWin: "-21,017.33" },
  { rank: 6, Name: 'Ooo', GamesPlayed: "1,052", TotalBet: '1,870,500.00', MaxWin: "55,800.00", totalnetWin: "-140,945.00" },
  { rank: 7, Name: 'Adolf the Rich', GamesPlayed: "5,620", TotalBet: '2,219,418.00', MaxWin: "51,800.00", totalnetWin: "-553,859.35" },
  { rank: 8, Name: 'Marlene Anastasia', GamesPlayed: "2,766", TotalBet: '1,128,597.00', MaxWin: "26,000.00", totalnetWin: "337,912.05	" },
  { rank: 9, Name: 'Arturo Arredondo', GamesPlayed: "1,521", TotalBet: '1,546,750.00', MaxWin: "21,900.00", totalnetWin: "-93,685.00" },
  { rank: 10  , Name: 'alex2', GamesPlayed: '1,939', TotalBet: '1,518,300.00', MaxWin: "51,800.00", totalnetWin: "-248,715.00" },
];
  return (
    <div className='leaderboard_body'>
      <div className="leaderboard_wrapper">
        <div className="leaderboard_header">
              <h4>Leaderboard</h4>
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

export default LeaderBoard