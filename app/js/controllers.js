'use strict';

/* Controllers */

var names_male    = ["Andrew Beckel","Mauricio Esterly","Gale Tarry","Winfred Dressel","Clement Monroe","Raymon Symons","Michale Deblois","Irvin Sturgis","Chi Meltzer","Bobby Martucci","Trey Schuessler","Toney Hysell","Tom Croley","David Pia","Lavern Lederman","Carter Lapp","Leopoldo Debelak","Spencer Whiteman","Everette Truax","Daryl Clouse","Jules Strothers","Shannon Siqueiros","Donn Nale","Gerard Stake","Kurt Plascencia","Byron Mignone","Sherman Horner","Scott Musick","Aubrey Doster","Dominique Goncalves","Jess Darr","Ben Bruemmer","Anthony Parks","Hugo Statton","Herman Carson","Adolph Silvas","Reggie Kunzman","Alfonso Dix","Howard Olmo","Earnest Sedlock","Phil Araya","Mervin Oshiro","Kerry Dugger","Wilber Rasberry","Samuel Walthall","Malcolm Mcmillan","Danial Franson","Cliff Lemarr","Sal Schewe","Daniel Sligh"]
  , names_female  = ["Arie Pates","Ellena Crossett","Annmarie Jalbert","Leilani Outman","Mara Rudder","Madelyn Mauldin","Sandie Hiers","Iris Daigneault","Paulette Royals","Luvenia Oathout","Shery Easley","Carman Plum","Ida Macey","Pamella Hardie","Luba Benedetto","Leila Oshiro","Kristy Strickler","Leana Greenan","Cordie Ashworth","Bethany Connell","Viviana Schenkel","Tammy Garn","Elida Dieguez","Kiesha Pridgeon","Marge Mcmillion","Jeri Barrs","Ligia Sjogren","Madeline Withers","Philomena Toone","Josefina Birch","Grazyna Smyth","Karey Otte","Alejandra Beauchamp","Nita Schoepp","Alona Gallegos","Dierdre Gerhart","Bee Ozment","Reda Donahoe","Margarette Zinck","Debbie Alverez","Euna Orme","Cristie Lisby","Breana Gorrell","Erlene Mcgibbon","Cleta Kitchin","Anabel Dade","Jacqulyn Suda","Loree Blunt","Earlean Saeed","Felecia Bridgett"]
  , names         = names_male.concat(names_female)
  , randListItem = function randListItem(list) {
    return list[Math.floor((list.length - 1) * Math.random())];
  };

function ExampleController_1(scope) {
  // seperate pagination from data
  scope.pagination = {
    page: 0,
    size: 15,
    last: -1
  };
  // here is the data
  scope.data = {
    list: []
  };
  // fill in the data
  for(var i = 0; i < 500; i++) {
    var name = randListItem(names)
      , male = names_male.indexOf(name) !== -1;
    scope.data.list.push({
      name: name
    , male: male
    , index: i
    });
  }
}
ExampleController_1.$inject = ['$scope'];


function ExampleController_2(scope) {
  scope.pagination = {
    page: 0
  };
  scope.data = [
    {text: 'Page 1'},
    {text: 'Page 2'},
    {text: 'Page 3'},
    {text: 'Page 4'}
  ];
}
ExampleController_2.$inject = ['$scope'];


function ExampleController_3(scope) {
  scope.pagination = {
    page: 0,
    length: 0,
    size: 4
  };
  scope.data = [
    {text: 'Image 1'},
    {text: 'Image 2'},
    {text: 'Image 3'},
    {text: 'Image 4'},
    {text: 'Image 5'},
    {text: 'Image 6'},
    {text: 'Image 7'},
    {text: 'Image 8'}
  ];
  scope.pagination.length = scope.data.length - scope.pagination.size + 1;
}

ExampleController_3.$inject = ['$scope'];
