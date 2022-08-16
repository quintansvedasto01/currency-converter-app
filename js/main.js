$(document).ready(function () {

  const dropListEl = document.querySelectorAll('.currency select');
  const fromCurrency = document.querySelector('.from-currency select');
  const toCurrency = document.querySelector('.to-currency select');

  for (let i = 0; i < dropListEl.length; i++) {
    for (let currency_code in country_list) {
      let selected;
      if (i == 0) {
        selected = currency_code == "USD" ? "selected" : "";
      } else if (i == 1) {
        selected = currency_code == "PHP" ? "selected" : "";
      }
      //Populate the Option Tag with currency and countrty.
      let optionTagEl =
        `<option value="${currency_code}" ${selected}>
          ${currency_code}
         </option>`;
      dropListEl[i].insertAdjacentHTML("beforeend", optionTagEl);
    }
    $(dropListEl[i]).change(function (e) {
      e.preventDefault();
      //Calling loadFlag Func and passing target element as an argument to load the flag image.
      loadFlag(e.target);
    });
  }

  function loadFlag(element) {
    for (let code in country_list) {
      //if currency code is equal to option value
      if (code == element.value) {
        let imgTag = element.parentElement.querySelector("img");
        console.log(imgTag);
        imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
      }
    }
  }

  window.addEventListener("load", () => {
    getExchangeRate();
  });

  $('.swap i').click(function (e) {
    e.preventDefault();
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
  });

  $('.convert').click(function (e) {
    e.preventDefault();
    getExchangeRate();
  });

  function getExchangeRate() {
    const amount = document.querySelector('#amount');
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
      amount.val = "1";
      amountVal = 1;
    }
    $('.exchange-rate').text('Calculating...');

    //Fetching API
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totExchangeRate);
        $('.exchange-rate').text(`${amountVal} ${fromCurrency.value} = ${totExchangeRate} ${toCurrency.value}`);
      });
  }

});

