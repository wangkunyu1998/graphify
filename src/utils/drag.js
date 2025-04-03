class Drag{
 drag(){
  this.addEventListener('mousedown', (e) => {
    if (e.target) {
      this.draging = true;
      this.stage.draging = true
      this.dragNodeMoveX = e.x - this.x;
      this.dragNodeMoveY = e.y - this.y;
    }
  });
  const onMouseup = (e) => {
    this.stage.draging = false;
    this.draging = false;
  }
  const onMousemove = (e) => {
    if(this.draging){
      this?.setAttr({ x: (e.offsetX )/this.stage.dpr- this.dragNodeMoveX , y: (e.offsetY )/this.stage.dpr - this.dragNodeMoveY});
    }
  }
  this.stage.container.addEventListener('mousemove', onMousemove)
  this.stage.container.addEventListener('mouseup', onMouseup)
  }
}
export default Drag