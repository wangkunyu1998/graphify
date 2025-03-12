import Rect from '@/components/Rect';
import Circle from '@/components/Circle';
import Line from '@/components/Line';
import Sector from '@/components/Sector';
import Group from '@/components/Group';
import animation from '@/utils/animation'
import Stage from '@/stage.js';
// const root = document.getElementById('app')
// if(root){
//   const stage = new Stage(root,500,500);
//   const rect = new Rect(stage);
//   const rect2 = new Rect(stage,{x:50,y:50,fillStyle:'green'});
//   const rect3 = new Rect(stage,{x:100,y:100,fillStyle:'pink'});
//   // const line = new Line(stage,{x1:0,y1:0,x2:100,y2:200,borderColor:'blue'});
//   const group = new Group(stage,{draggable:true})
//   group.appendChild(rect,rect2,rect3)
//   stage.appendChild(group)
// }

export  {
  Rect,
  Circle,
  Line,
  Sector,
  animation,
  Group,
  Stage,
}
