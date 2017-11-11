const Nightmare = require('nightmare'),
vo = require('vo'),
nightmare = Nightmare({
  show: true
});

let run = function*() {

  let result = yield nightmare
    .goto('https://in.hotels.com/')
    .type('input[aria-label="Search"]', 'Taj Holiday Village Resort & Spa, Candolim, India')
    //.type('input[aria-label="Search"]', 'The Desiign Hotel, Si Maha Phot, Thailand')
    .click('button[type=submit]')
    .wait(2000)
    .evaluate(function() {
      var element = document.querySelector('body');
      return {
        text: element.innerText,
        href: element.href
      };
    });

  yield nightmare.end();

  return result;
};

//use `vo` to execute the generator function
vo(run)(function(err, result) {
  let arry = JSON.stringify(result.text).split("\\n");
  let index = arry.indexOf("Book Now");
  let price = arry[index - 1];
  // in case of multiple prices
  let indexOf = price.lastIndexOf("Rs");
  if(indexOf > 0) {
    price = price.substr(indexOf);
  }
  console.log('The price is', price);
});