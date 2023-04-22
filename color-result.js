// const colors = [
//   'rgb(180, 254, 56)', // 1 97E000
//   'rgb(70, 250, 120)', // 2 18E300
//   'rgb(0, 147, 71)', // 3 2D882A
//   'rgb(96, 131, 82)', // 4 486016
//   'rgb(125, 247, 220)', // 5 3BC6A6
//   'rgb(105, 224, 242)', // 6 6EB7D5
//   'rgb(13, 53, 179)', // 7 0777DD
//   'rgb(74, 210, 252)', // 8 003FB8
//   'rgb(34, 56, 102)', // 9 161F43
//   'rgb(254, 212, 148)', // 10 E6CC5F
//   'rgb(242, 253, 74)', // 11 F1F500
//   'rgb(255, 199, 36)', // 12 FFA200
//   'rgb(201, 180, 230)', // 13 AA8CCB
//   'rgb(142, 102, 215)', // 14 694AC1
//   'rgb(255, 130, 36)', // 15 FF5400
//   'rgb(252, 133, 161)', // 16 F75978
//   'rgb(88, 61, 164)', // 17 3B1091
//   'rgb(255, 97, 210)', // 18 C71BAF
//   'rgb(159, 42, 16)', // 19 883810
//   'rgb(120, 64, 52)', // 20 40250C
//   'rgb(255, 221, 213)', // 21 F0AC93
//   'rgb(255, 184, 220)', // 22 FFA4D1
//   'rgb(96, 96, 96)', // 23 565B6A
//   'rgb(123, 123, 123)', // 24 969BA9
//   'rgb(247, 89, 162)', // 25 FF1EA8
//   'rgb(250, 45, 41)', // 26 D20012
//   'rgb(233, 222, 205)', // 27 F4DAB6 229, 199, 157
//   'rgb(252, 252, 252)', // 28 E5E9E5
//   'rgb(219, 133, 87)', // 29 B07832
//   'rgb(35, 35, 35)', // 30 1B1C1F
//   'rgb(255, 231, 79)', // 31 FFE21B
//   'rgb(26, 138, 235)', // 32 151993
// ]
// 250, 142, 47
// const afterColor = [
//   "rgb(151, 224, 0)",
//   "rgb(24, 227, 0)",
//   "rgb(45, 136, 42)",
//   "rgb(72, 96, 22)",
//   "rgb(59, 198, 166)",
//   "rgb(105, 224, 242)",
//   "rgb(7, 119, 221)",
//   "rgb(0, 63, 184)",
//   "rgb(21, 25, 147)",
//   "rgb(22, 31, 67)",
//   'rgb(254, 212, 148)',
//   "rgb(240, 172, 147)",
//   "rgb(255, 164, 209)",
//   "rgb(230, 204, 95)",
//   "rgb(241, 245, 0)",
//   "rgb(255, 162, 0)",
//   'rgb(201, 180, 230)',
//   "rgb(105, 74, 193)",
//   "rgb(255, 84, 0)",
//   "rgb(247, 89, 120)",
//   "rgb(59, 16, 145)",
//   "rgb(199, 27, 175)",
//   "rgb(136, 56, 16)",
//   "rgb(64, 37, 12)",
  
//   "rgb(86, 91, 106)",
//   "rgb(150, 155, 169)",
//   "rgb(255, 30, 168)",
//   "rgb(210, 0, 18)",
  
//   "rgb(229, 233, 229)",
//   "rgb(176, 120, 50)",
//   "rgb(27, 28, 31)",
//   "rgb(255, 226, 27)",
  
// ]

const revsionColor = [
  'rgb(180, 254, 56)', // 1 97E000
  'rgb(70, 250, 120)', // 2 18E300
  'rgb(0, 147, 71)', // 3 2D882A
  'rgb(96, 131, 82)', // 4 486016
  'rgb(125, 247, 220)', // 5 3BC6A6
  'rgb(105, 224, 242)', // 6 6EB7D5
  'rgb(62, 150, 177)', // 8 003FB8
  'rgb(13, 53, 179)', // 7 0777DD
  'rgb(34, 56, 102)', // 9 161F43
  'rgb(254, 212, 148)', // 10 E6CC5F
  'rgb(242, 253, 74)', // 11 F1F500
  'rgb(250, 142, 47)', // 12 FFA200
  'rgb(201, 180, 230)', // 13 AA8CCB
  'rgb(142, 102, 215)', // 14 694AC1
  'rgb(250, 72, 12)', // 15 FF5400
  'rgb(252, 133, 161)', // 16 F75978
  'rgb(53, 23, 97)', // 17 3B1091
  'rgb(255, 97, 210)', // 18 C71BAF
  'rgb(117, 36, 18)', // 19 883810
  'rgb(56, 30, 24)', // 20 40250C
  'rgb(207, 154, 143)', // 21 F0AC93
  'rgb(255, 184, 220)', // 22 FFA4D1
  'rgb(96, 96, 96)', // 23 565B6A
  'rgb(158, 158, 158)', // 24 969BA9
  'rgb(252, 48, 142)', // 25 FF1EA8
  'rgb(250, 45, 41)', // 26 D20012
  'rgb(233, 222, 205)', // 27 F4DAB6
  'rgb(252, 252, 252)', // 28 E5E9E5
  'rgb(120, 80, 59)', // 29 B07832
  'rgb(35, 35, 35)', // 30 1B1C1F
  'rgb(217, 171, 46)', // 31 FFE21B
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
      const fontColor = revsionColor[cell].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur) < 375 ? 'white' : 'black';
      return `<div class="col" style="width: 24px; height: 24px; text-align:center; background-color:${revsionColor[cell]}; color:${fontColor}; ${isBorder?'border-left: 2px solid white':''}">
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
    const fontColor = revsionColor[x].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur) < 375 ? 'white' : 'black';
    console.log(revsionColor[x].replaceAll('rgb(', "").replaceAll(')', "").split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur));
    htmlString += `<div style="display:flex;align-items:center;font-size: 24px">
      <div style="min-width: 24px; min-height: 24px; border:1px solid gray; text-align:center; background-color:${revsionColor[x]}; padding: 4px; color:${fontColor}">
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
  const response = await fetch('./color-map.json');
  const colors = await response.json();
  render(colors);
})();
