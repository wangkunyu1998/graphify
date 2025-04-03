class PieChart{
  constructor(stage,options){
    this.ctx = stage.getCtx();;
    this.stage = stage;
    this.canvas = this.ctx.canvas;
    this.options = {
      radius: 150,
      innerRadius: 0, // 默认实心饼图（0表示无空白）
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
      hoverOffset: 15,
      labelFont: '14px Arial',
      ...options
    };
   
    this.data = options.data;
    // 初始化计算
    this.center = { x: this.canvas.width / 2 / stage.dpr, y: this.canvas.height / 2 / stage.dpr }
    this.total = this.data.reduce((sum, item) => sum + item.value, 0)
    this.hoverIndex = -1
    this.render()
  }
  // 绘制数据区块
  render() {
    this.clear()
    this.drawSegments()
    this.drawLabels()
    if(this.hoverIndex !== -1) this.drawTooltip();
    this.stage.appendChild(this)
  }

  drawSegments() {
    let startAngle = -Math.PI / 2
    const { radius, innerRadius, colors, hoverOffset } = this.options

    this.data.forEach((item, i) => {
      const endAngle = startAngle + (item.value / this.total) * Math.PI * 2
      const isHovered = i === this.hoverIndex
      const offset = isHovered ? hoverOffset : 0
      const midAngle = (startAngle + endAngle) / 2

      this.ctx.save()
      this.ctx.translate(
        Math.cos(midAngle) * offset,
        Math.sin(midAngle) * offset
      )

      // 绘制主形状
      this.ctx.beginPath()
      this.ctx.moveTo(this.center.x, this.center.y)
      this.ctx.arc(
        this.center.x,
        this.center.y,
        radius,
        startAngle,
        endAngle
      )
      
      if(innerRadius > 0) {
        // 环形模式：反向绘制内圆
        this.ctx.arc(
          this.center.x,
          this.center.y,
          innerRadius,
          endAngle,
          startAngle,
          true
        )
      }
      
      this.ctx.closePath()
      this.ctx.fillStyle = colors[i % colors.length]
      this.ctx.fill()
      this.ctx.restore()
      startAngle = endAngle
    })
  }

  drawLabels() {
    const { radius, innerRadius, labelFont } = this.options
    const labelRadius = innerRadius > 0 ? radius + 35 : radius * 0.6
    
    this.ctx.fillStyle = '#333'
    this.ctx.font = labelFont
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'

    let startAngle = -Math.PI / 2
    this.data.forEach(item => {
      const sliceAngle = (item.value / this.total) * Math.PI * 2
      const midAngle = startAngle + sliceAngle / 2
      
      const x = this.center.x + Math.cos(midAngle) * labelRadius
      const y = this.center.y + Math.sin(midAngle) * labelRadius
      
      this.ctx.fillText(
        `${item.label} (${((item.value / this.total)*100).toFixed(1)}%)`,
        x,
        y
      )
      startAngle += sliceAngle
    })
  }

  drawTooltip() {
    const item = this.data[this.hoverIndex]
    const { innerRadius } = this.options
    const tooltipY = innerRadius > 0 ? 
      this.center.y + innerRadius/2 : 
      this.center.y

    this.ctx.fillStyle = '#333'
    this.ctx.font = this.options.labelFont
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      `${item.label}: ${item.value}`,
      this.center.x,
      tooltipY
    )
  }

  handleHover(e) {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left - this.center.x
    const y = e.clientY - rect.top - this.center.y
    const distance = Math.sqrt(x*x + y*y)
    const angle = Math.atan2(y, x)
    
    // 根据模式调整有效区域
    const { radius, innerRadius } = this.options
    const isValid = innerRadius > 0 ? 
      (distance <= radius && distance >= innerRadius) :
      (distance <= radius)

    this.hoverIndex = isValid ? this.getHoverIndex(angle) : -1
    this.draw()
  }

  getHoverIndex(angle) {
    let current = 0
    let start = -Math.PI / 2
    for(let i=0; i<this.data.length; i++){
      const end = start + (this.data[i].value / this.total) * Math.PI * 2
      const normalizedAngle = (angle + Math.PI*2.5) % (Math.PI*2)
      if(normalizedAngle >= start && normalizedAngle < end) return i
      start = end
    }
    return -1
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
export default PieChart