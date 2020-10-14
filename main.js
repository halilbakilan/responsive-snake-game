function starter() {
  var sS = 55,
    sC = "#009f7b";
  var canvas = document.querySelector("canvas"),
    c = canvas.getContext("2d"),
    width = window.innerWidth - (window.innerWidth % sS),
    height = window.innerHeight - (window.innerHeight % sS);
  canvas.width = width;
  canvas.height = height;
  window.addEventListener("resize", function () {
    width = window.innerWidth - (window.innerWidth % sS);
    height = window.innerHeight - (window.innerHeight % sS);
    canvas.width = width;
    canvas.height = height;
    clearInterval(timeout);
  });
  var Y = ((width / sS - ((width / sS) % 2)) * sS) / 2 - 5 * sS;
  var startY = Y + 5 * sS;
  var startX = ((height / sS - ((height / sS) % 2)) * sS) / 2;
  canvas.style.backgroundColor = "#012c43";
  var snake = [
    [Y, startX],
    [Y + 1 * sS, startX],
    [Y + 2 * sS, startX],
    [Y + 3 * sS, startX],
    [Y + 4 * sS, startX],
    [Y + 5 * sS, startX],
  ];
  var food = [[Y, startX]];
  var cf = 1;
  snake.forEach(function (xy) {
    c.fillStyle = sC;
    c.fillRect(xy[0] + 1, xy[1] + 1, sS - 2, sS - 2);
  });
  var timeout;

  function start() {
    timeout = setInterval(function () {
      if (cf == 1) {
        cf = 0;
        var i = 0;
        var food2 = 1;
        for (i = 0; i < snake.length; i++) {
          if (snake[i][0] == food[0][0] && snake[i][1] == food[0][1]) {
            food2 = 0;
          }
          if (food2 == 0) {
            i = 0;
            food2 = 1;
            food = [
              [
                Math.floor(Math.random() * (width / sS)) * sS,
                Math.floor(Math.random() * (height / sS)) * sS,
              ],
            ];
          }
          var ii = i;
          ii++;
          if (ii == snake.length) {
            if (food2 == 1) {
              c.fillStyle = "white";
              c.fillRect(food[0][0] + 1, food[0][1] + 1, sS - 2, sS - 2);
            }
          }
        }
      }
      var eating = 0;
      snake.forEach(function (xy) {
        if (xy[0] == food[0][0] && xy[1] == food[0][1]) {
          eating = 1;
          cf = 1;
        }
      });
      if (eating == 0) {
        c.clearRect(snake[0][0], snake[0][1], sS, sS);
        snake.shift();
      }
      if (key == 37) {
        if (direction == 3) {
          if (startY == width - sS) {
            startY = -sS;
          }
          startY += sS;
          direction = 3;
        } else {
          if (startY == 0) {
            startY = width;
          }
          startY -= sS;
          direction = 1;
        }
      }
      if (key == 38) {
        if (direction == 4) {
          if (startX == height - sS) {
            startX = -sS;
          }
          startX += sS;
          direction = 4;
        } else {
          if (startX == 0) {
            startX = height;
          }
          startX -= sS;
          direction = 2;
        }
      }
      if (key == 39) {
        if (direction == 1) {
          if (startY == 0) {
            startY = width;
          }
          startY -= sS;
          direction = 1;
        } else {
          if (startY == width - sS) {
            startY = -sS;
          }
          startY += sS;
          direction = 3;
        }
      }
      if (key == 40) {
        if (direction == 2) {
          if (startX == 0) {
            startX = height;
          }
          startX -= sS;
          direction = 2;
        } else {
          if (startX == height - sS) {
            startX = -sS;
          }
          startX += sS;
          direction = 4;
        }
      }
      snake.forEach(function (xy) {
        if (xy[0] == startY && xy[1] == startX) {
          clearInterval(timeout);
        }
      });
      snake.push([startY, startX]);
      c.fillStyle = sC;
      c.fillRect(startY + 1, startX + 1, sS - 2, sS - 2);
    }, 80);
  }
  var key = 0,
    keystart = 0,
    direction = 0,
    newcode = 0;
  window.addEventListener("keydown", function (e) {
    if (newcode == 0) {
      key = e.keyCode;
    }
    if (key == 38 || key == 39 || key == 40) {
      keystart += 1;
      if (keystart == 1) {
        if (key == 38) direction = 2;
        if (key == 39) direction = 3;
        if (key == 40) direction = 4;
        start();
        newcode++;
        setTimeout(function () {
          newcode = 0;
        }, 80);
      }
    }
  });
}
starter();
