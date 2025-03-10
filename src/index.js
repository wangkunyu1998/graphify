import Rect from '@/components/Rect';
import Circle from '@/components/Circle';
import Line from '@/components/Line';
import Sector from '@/components/Sector';
import animation from '@/utils/animation'
import Stage from '@/stage.js';

const stage = new Stage();
const line = new Line(stage)
stage.appendChild(line)
export  {
  Rect,
  Circle,
  Line,
  Sector,
  animation,
  Stage
}
