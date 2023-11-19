atm(20, 20);

function atm(qtFifty, qtTwenty) {
  let qt50 = qtFifty;
  let qt20 = qtTwenty;

  let cashToWithdraw;
  let totalCashAvailable;

  cashToWithdraw = askUserAction(qt50, qt20);

  while (cashToWithdraw != "exit") {
    totalCashAvailable = getAvailableCash(qt50, qt20);
    if (isWithdrawable(totalCashAvailable, cashToWithdraw)) {
      let quantityOfFiftyToWithdraw = 0;
      let quantityOfTwentyToWithdraw = 0;
      quantityOfFiftyToWithdraw = getQtOfFifty(
        cashToWithdraw,
        qt50,
        quantityOfTwentyToWithdraw
      );
      quantityOfTwentyToWithdraw = getQtOfTwenty(
        cashToWithdraw,
        qt20,
        quantityOfFiftyToWithdraw
      );

      alert(
        "Видано " +
          cashToWithdraw +
          " euro \n " +
          quantityOfFiftyToWithdraw +
          "x50 " +
          quantityOfTwentyToWithdraw +
          "x20 "
      );
      console.log("50 euro old qt: " + qt50 + " 20 euro old qt: " + qt20);
      qt50 = qt50 - quantityOfFiftyToWithdraw;
      qt20 = qt20 - quantityOfTwentyToWithdraw;
      console.log("50 euro new qt: " + qt50 + " 20 euro new qt: " + qt20);
    } else {
      alert("Введену сумму неможливо зняти, введіть іншу");
    }
    if (getAvailableCash(qt50, qt20) > 0) {
      cashToWithdraw = askUserAction(qt50, qt20);
    } else {
      alert("В банкоматі закінчились гроші, приходьте завтра");
      return;
    }
  }
}

function getAvailableCash(qtOfFifty, qtOfTwenty) {
  return qtOfFifty * 50 + qtOfTwenty * 20;
}

function askUserAction(qtOfFifty, qtOfTwenty) {
  let userAction = 0;
  do {
    userAction = prompt(
      "Введіть кількість готівки (від 20 і більше) або exit для виходу (доступні тільки банкноти 50 і 20 євро) \n Залишок в банкоматі: " +
        getAvailableCash(qtOfFifty, qtOfTwenty)
    );
  } while (userAction != "exit" && checkUserAction(userAction) < 20);
  return userAction;
}

function checkUserAction(action) {
  if (!isNaN(Number(action))) {
    action = Math.floor(Number(action));
    console.log("action: " + action);
    return action;
  }
  return 1;
}

function isWithdrawable(atmCash, cash) {
  let restToCash = cash % 50;

  if (
    (cash % 20 === 0 || cash % 50 === 0 || restToCash % 20 === 0) &&
    cash <= atmCash
  ) {
    return true;
  }
  return false;
}

function getQtOfFifty(cash, qtOfFiftyAvailable, qtOfTwenty = 0) {
  let rest = cash - qtOfTwenty * 20;
  let qtOfFifty = Math.floor(rest / 50);
  if (qtOfFifty > qtOfFiftyAvailable) {
    return qtOfFiftyAvailable;
  }
  return qtOfFifty;
}

function getQtOfTwenty(cash, qtOfTwentyAvailable, qtOfFifty = 0) {
  let rest = cash - qtOfFifty * 50;
  let qtOfTwenty = Math.floor(rest / 20);
  if (qtOfTwenty > qtOfTwentyAvailable) {
    return qtOfTwentyAvailable;
  }
  return qtOfTwenty;
}
