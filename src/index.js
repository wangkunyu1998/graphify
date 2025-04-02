import Rect from '@/components/Rect';
import Circle from '@/components/Circle';
import Line from '@/components/Line';
import Sector from '@/components/Sector';
import Group from '@/components/Group';
import LineChart from '@/components/LineChart'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import animation from '@/utils/animation'
import Stage from '@/stage.js';
if(import.meta.env.DEV){
  const root = document.getElementById('app')
  const stage = new Stage(root,700,300);
  // const options = {
  //   margin: 60,
  //   lineColor:'red',
  //   pointRadius:5,
  //     data:  [
  //       { label: '食品', value: 4200 },
  //       { label: '住房', value: 3100 },
  //       { label: '交通', value: 2400 },
  //       { label: '娱乐', value: 1500 },
  //       { label: '其他', value: 800 }
  //     ]
  // }
  // const chart = new LineChart(
  //   stage,
  //   options,
  // );
  // const options= {
  //     radius:100,
  //     innerRadius: 70,
  //     colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  //     data:  [
  //       { label: '食品', value: 4200 },
  //       { label: '住房', value: 3100 },
  //       { label: '交通', value: 2400 },
  //       { label: '娱乐', value: 1500 },
  //       { label: '其他', value: 800 }
  //     ]
  // }
  //  new PieChart(stage,options )
  const data = [
    { label: '1月', value: 65 },
    { label: '2月', value: 80 },
    { label: '3月', value: 45 },
    { label: '4月', value: 95 },
    { label: '5月', value: 70 }
  ]
  const barChart = new BarChart(
    stage,
    {
      barColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
      margin: 60,
      animationDuration: 1500,
      data,
      // barWidth:10
    }
  )
  // stage.appendChild(chart)
}

export  {
  Rect,
  Circle,
  Line,
  Sector,
  animation,
  Group,
  Stage,
  LineChart,
  PieChart,
  BarChart
}
