const colorStrArr = [
  'rgb(180, 254, 56)', // 1 97E000
  'rgb(70, 250, 120)', // 2 18E300
  'rgb(0, 147, 71)', // 3 2D882A
  'rgb(96, 131, 82)', // 4 486016
  'rgb(125, 247, 220)', // 5 3BC6A6
  'rgb(105, 224, 242)', // 6 6EB7D5
  'rgb(74, 210, 252)', // 8 003FB8
  'rgb(13, 53, 179)', // 7 0777DD
  'rgb(34, 56, 102)', // 9 161F43
  'rgb(254, 212, 148)', // 10 E6CC5F
  'rgb(242, 253, 74)', // 11 F1F500
  'rgb(250, 142, 47)', // 12 FFA200
  'rgb(201, 180, 230)', // 13 AA8CCB
  'rgb(142, 102, 215)', // 14 694AC1
  'rgb(250, 101, 12)', // 15 FF5400
  'rgb(252, 133, 161)', // 16 F75978
  'rgb(53, 23, 97)', // 17 3B1091
  'rgb(255, 97, 210)', // 18 C71BAF
  'rgb(159, 42, 16)', // 19 883810
  'rgb(120, 64, 52)', // 20 40250C
  'rgb(255, 221, 213)', // 21 F0AC93
  'rgb(255, 184, 220)', // 22 FFA4D1
  'rgb(96, 96, 96)', // 23 565B6A
  'rgb(158, 158, 158)', // 24 969BA9
  'rgb(252, 48, 142)', // 25 FF1EA8
  'rgb(250, 45, 41)', // 26 D20012
  'rgb(231, 210, 181)', // 27 F4DAB6 E5C79D
  'rgb(252, 252, 252)', // 28 E5E9E5
  'rgb(219, 133, 87)', // 29 B07832
  'rgb(35, 35, 35)', // 30 1B1C1F
  'rgb(255, 199, 36)', // 31 FFE21B
  'rgb(5, 10, 105)', // 32 151993
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
        ${cell + 1}
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
        ${x + 1}
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
