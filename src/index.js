import Rect from '@/components/Rect';
import Circle from '@/components/Circle';
import Line from '@/components/Line';
import Sector from '@/components/Sector';
import Group from '@/components/Group';
import animation from '@/utils/animation'
import Stage from '@/stage.js';

if(import.meta.env.DEV){
  const root = document.getElementById('app')
  const stage = new Stage(root,700,300);
  const rect = new Rect(stage,{x:0,y:0,zIndex:2});
  const circle = new Circle(stage,{x:100,y:100,fillStyle:'green',zIndex:1});
  circle.addEventListener('click',() => {
    console.log('click')
    circle.setAttr({zIndex:circle.zIndex === 1 ? 3 : 1})
  } )
  rect.addEventListener('click',() =>console.log('rect'))
  stage.appendChild(rect,circle)
}


export  {
  Rect,
  Circle,
  Line,
  Sector,
  animation,
  Group,
  Stage,
}
