let game = document.getElementById("game");
let star = document.getElementById("star");
let coin = document.getElementById("coin");
let ticket = document.getElementById("ticket");

let time = 1195;
let timer;

let balance = {
  game: 0,
  star: 0,
  coin: 0,
  ticket: 0,
  setBalance(factor) {
    this.game = this.game + 5 * factor;
    this.star = this.star + 5 * factor;
    this.coin =  this.coin + 5 * factor;
    this.ticket = this.ticket + 1 * factor;
  },
  printBalance(el, key) {
    el.innerHTML = balance[key];
  },
};

function countdown(status = "on") {
  document.getElementById("time_e").innerHTML = convectTime(time); // добавляет в элемент текщее время таймера
  addBonus(time);
  time++; // уменьшает время таймера
  if (status == "on") {
    if (time < 0) {
      notification.play(); // прогирывает звук при заверешениии таймера
      clearTimeout(timer); // останваливает таймер
    } else {
      timer = setTimeout(countdown, 1000);
    }
  } else {
    //сброс предыдущего таймера если он запущен
    clearTimeout(timer);
    document.getElementById("time_e").innerHTML = " - ";
    time = 0;
  }
}

function convectTime(value) {
  if (value > 60) {
    let min = Math.trunc(value / 60);
    let zero = value - 60 * min < 10 ? 0 : "";
    return min + ":" + "" + zero + "" + (value - 60 * min);
  } else {
    return value;
  }
}

function addBonus(time) {
  let bonus = time / 600;
  if (Number.isInteger(bonus)) {
    balance.setBalance(normalTime(time));
    balance.printBalance(game, "game");
    balance.printBalance(star, "star");
    balance.printBalance(coin, "coin");
    balance.printBalance(ticket, "ticket");
  }
}

function normalTime(time) {
  let normal_time = document.getElementById("min_el").value;
  normal_time = normal_time * 60; // 20 min in sec
  if (normal_time <= time) {
    switch (time - normal_time) {
      case 0:
        return 1;
      case 600:
        return 2;
      default:
        return 3;
    }
  } else {
    return 0;
  }
}
