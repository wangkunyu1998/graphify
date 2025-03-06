class QuadTree{
  constructor(boundary,depth = 0,ctx){
    // boundary {x,y,width,height}
    this.boundary = boundary
    this.nodes = [];//在当前节点下的图形
    this.divided = false// 是否已经划分
    this.maxCapacity = 10
    this.children = [];//划分的象限
    this.depth = depth;
    this.ctx = ctx
  }
  insertNode(node){
    // 节点不在当前区域内
    if(!this.intersects(node.getBox())){
      return false
    }
    node.depth = this.depth
    // node.level = level
    // 未分裂 且 不超过最大分裂节点，或分裂层级超过最大层级限制则直接加入节点数组，则直接插入
    if(!this.divided && this.nodes.length < this.maxCapacity ){
      this.nodes.push(node);
      return true
    }
   
    // 超过最大节点数，分裂
   if(!this.divided) {
      this.quadrant();
    }
    // return true
    // 分裂后储存当前节点到象限
    const res =   this.children.map((quadrantItem) => quadrantItem.insertNode(node))
    // const res =   this.children.some((quadrantItem) => quadrantItem.insertNode(node))
    return res.some((bol) => bol)

  }
  //相交
  intersects(node){ 
    return !(
      node.x > this.boundary.x + this.boundary.width ||
      node.x + node.width < this.boundary.x ||
      node.y > this.boundary.y + this.boundary.height ||
      node.y + node.height < this.boundary.y
  );
  }
      //划分象限
  quadrant(){
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    //第一象限
    const firstQuadrant = {x:x + w, y:y, width:w, height:h}
    const secondQuadrant = {x:x + w, y:y + h, width:w, height:h}
    const thirdQuadrant = {x:x, y:y + h, width:w, height:h}
    const fourthQuadrant = {x:x , y:y, width:w, height:h};
    const ctx = this.ctx;
    ctx.beginPath();

    ctx.moveTo( x ,y + h);

    ctx.lineTo(x + w * 2, y + h );
    ctx.moveTo( x + w, y);
  
    ctx.lineTo( x + w  , y  + 2 * h);
    ctx.strokeStyle = 'red';

    ctx.closePath();
    ctx.stroke();
    this.children = [
      // 用四叉树实例化每个象限，去判断传入图形是否与当先象限相交
      new QuadTree(firstQuadrant,this.depth + 1,this.ctx), new QuadTree(secondQuadrant,this.depth + 1,this.ctx),new QuadTree(thirdQuadrant,this.depth + 1,this.ctx), new QuadTree(fourthQuadrant,this.depth + 1,this.ctx)
    ]
    this.divided = true;
    // 遍历插入的节点，遍历分配到每个象限,使用some，如果在前面的象限插入成功后，后面的象限则不再添加
    this.nodes.forEach((node) => {
      this.children.forEach((quadrantItem,index) => {
        quadrantItem.insertNode(node)
      })
    })
    this.nodes = []
  }
  // 查询可能包含点的节点
query(x, y, found = []) {
  // 排除不在当前区域的情况
  if (!this.containsPoint(x, y)) return found;
  // 添加当前节点的所有图形
  found.push(...this.nodes);
  // 递归查询子节点
  if (this.divided) {
    // console.log('分裂查询次数')
    this.children[0].query(x, y, found);
    this.children[1].query(x, y, found);
    this.children[2].query(x, y, found);
    this.children[3].query(x, y, found);
  }
  return found;
}
  containsPoint(x, y) {
  return (
    x >= this.boundary.x &&
    x <= this.boundary.x + this.boundary.width &&
    y >= this.boundary.y &&
    y <= this.boundary.y + this.boundary.height
  );
}
}
export default QuadTree