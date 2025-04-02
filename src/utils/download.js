export default function (canvas, {title,imgType}) {
  let save_url = canvas.toDataURL(`image/${imgType}`);
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.href = save_url;
  a.download = title;
  a.click();
}