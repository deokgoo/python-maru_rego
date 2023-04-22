const colorStrArr = [
  'rgb(180, 254, 56)',
  'rgb(70, 250, 120)',
  'rgb(0, 147, 71)',
  'rgb(96, 131, 82)',
  'rgb(125, 247, 220)',
  'rgb(105, 224, 242)',
  'rgb(13, 53, 179)',
  'rgb(74, 210, 252)',
  'rgb(34, 56, 102)',
  'rgb(254, 212, 148)',
  'rgb(242, 253, 74)',
  'rgb(255, 199, 36)',
  'rgb(201, 180, 230)',
  'rgb(142, 102, 215)',
  'rgb(255, 130, 36)',
  'rgb(252, 133, 161)',
  'rgb(88, 61, 164)',
  'rgb(255, 97, 210)',
  'rgb(159, 42, 16)',
  'rgb(120, 64, 52)',
  'rgb(255, 221, 213)',
  'rgb(255, 184, 220)',
  'rgb(96, 96, 96)',
  'rgb(123, 123, 123)',
  'rgb(247, 89, 162)',
  'rgb(250, 45, 41)',
  'rgb(233, 222, 205)',
  'rgb(252, 252, 252)',
  'rgb(219, 133, 87)',
  'rgb(35, 35, 35)',
  'rgb(255, 231, 79)',
  'rgb(26, 138, 235)',
]

function render(colors) {
  const $el = document.querySelector('#app');

  let htmlString = '<div class="controller" style="display:flex;flex-direction:column;">';

  colors.map((row, y) => {
    const isBorder = y % 10 === 0;
    htmlString += `<div class="row" style="display:flex;width: 100%;${isBorder?'border-top: 2px solid white':''}">`
    htmlString += row.map((cell, x) => {
      const isBorder = x % 10 === 0;
      const fontColor = colorStrArr[cell].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur) < 375 ? 'white' : 'black';
      return `<div class="col" style="width: 24px; height: 24px; text-align:center; background-color:${colorStrArr[cell]}; color:${fontColor}; ${isBorder?'border-left: 2px solid white':''}">
        ${cell}
      </div>`;
    }).join('');
    htmlString += '</div>'
  });

  htmlString += '</div>';

  const counts = {}
  colors.forEach(subArray => {
    subArray.forEach(number => {
      if (counts[number]) {
        counts[number]++;
      } else {
        counts[number] = 1;
      }
    });
  });

  htmlString += `<br/><br/>`;
  htmlString += `<div style="display:flex;flext-direction:column;width:100%;">`;
  Object.keys(counts).forEach((x, idx) => {
    const fontColor = colorStrArr[x].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur) < 375 ? 'white' : 'black';
    console.log(colorStrArr[x].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur));
    htmlString += `<div style="display:flex;align-items:center;font-size: 24px">
      <div style="min-width: 24px; min-height: 24px; border:1px solid gray; text-align:center; background-color:${colorStrArr[x]}; padding: 4px; color:${fontColor}">
        ${x}
      </div>
      <div style="margin-left: 4px; font-size: 56px;">${counts[x]}</div>
    </div>`
    if(idx + 1 < Object.keys(counts).length) {
      htmlString += `<div style="margin-right: 25px"></div>`;
    }
  })
    
  htmlString += `</div>`;

  $el.innerHTML = htmlString;
}

(async () => {
  const response = await fetch('./color-map-50.json');
  const colors = await response.json();
  render(colors);
})();
