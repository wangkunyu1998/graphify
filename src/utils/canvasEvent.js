class CanvasEvent  {
  constructor(canvas,stage,type){
    this.canvas = canvas;
    const canvasInfo = canvas.getBoundingClientRect();
    this.hitQueue = [];//被点击的队列
    canvas.addEventListener(type,(e) => {
      const x = e.clientX - canvasInfo.left
      const y = e.clientY - canvasInfo.top;
      const candidates = stage.quadTree.query(x, y);
      const res= candidates.filter(node => node.contains(x, y)).sort((a,b) => b.index - a.index);
      this.hitQueue = res[0] ? [res[0]] : []
      this.bindEvent(x,y,type)
    })
  }
  
  bindEvent(x,y,type){
    let propagtion = true
    const event ={
      target:null,
      stopPropagation:() => {
        propagtion = false
      }
    }
    this.hitQueue.forEach((node) => {
      if(!propagtion) return;
      event.target = node;
      if(node.listener[type]){
        node.listener[type].forEach((cb) => {
          cb({...event,x,y})
        })
      }
    })
  }
}
export default CanvasEvent