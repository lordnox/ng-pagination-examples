'use strict';

/* Controllers */

var names_male    = ["Andrew Beckel","Mauricio Esterly","Gale Tarry","Winfred Dressel","Clement Monroe","Raymon Symons","Michale Deblois","Irvin Sturgis","Chi Meltzer","Bobby Martucci","Trey Schuessler","Toney Hysell","Tom Croley","David Pia","Lavern Lederman","Carter Lapp","Leopoldo Debelak","Spencer Whiteman","Everette Truax","Daryl Clouse","Jules Strothers","Shannon Siqueiros","Donn Nale","Gerard Stake","Kurt Plascencia","Byron Mignone","Sherman Horner","Scott Musick","Aubrey Doster","Dominique Goncalves","Jess Darr","Ben Bruemmer","Anthony Parks","Hugo Statton","Herman Carson","Adolph Silvas","Reggie Kunzman","Alfonso Dix","Howard Olmo","Earnest Sedlock","Phil Araya","Mervin Oshiro","Kerry Dugger","Wilber Rasberry","Samuel Walthall","Malcolm Mcmillan","Danial Franson","Cliff Lemarr","Sal Schewe","Daniel Sligh"]
  , names_female  = ["Arie Pates","Ellena Crossett","Annmarie Jalbert","Leilani Outman","Mara Rudder","Madelyn Mauldin","Sandie Hiers","Iris Daigneault","Paulette Royals","Luvenia Oathout","Shery Easley","Carman Plum","Ida Macey","Pamella Hardie","Luba Benedetto","Leila Oshiro","Kristy Strickler","Leana Greenan","Cordie Ashworth","Bethany Connell","Viviana Schenkel","Tammy Garn","Elida Dieguez","Kiesha Pridgeon","Marge Mcmillion","Jeri Barrs","Ligia Sjogren","Madeline Withers","Philomena Toone","Josefina Birch","Grazyna Smyth","Karey Otte","Alejandra Beauchamp","Nita Schoepp","Alona Gallegos","Dierdre Gerhart","Bee Ozment","Reda Donahoe","Margarette Zinck","Debbie Alverez","Euna Orme","Cristie Lisby","Breana Gorrell","Erlene Mcgibbon","Cleta Kitchin","Anabel Dade","Jacqulyn Suda","Loree Blunt","Earlean Saeed","Felecia Bridgett"]
  , names         = names_male.concat(names_female)
  , randListItem = function randListItem(list) {
    return list[Math.floor((list.length - 1) * Math.random())];
  };

function MyCtrl1(scope) {
  scope.list = [];
  scope.names = names;
  scope.pageSize = 50;
  scope.page = 0;
  scope.lastPage = -1;

  for(var i = 0; i < 500; i++) {
    var name = randListItem(names)
      , male = names_male.indexOf(name) !== -1;
    scope.list.push({
      name: name
    , male: male
    , index: i
    });
  }

  scope.paginationPrev = function() {
    console.log('select previous page');
  };
  scope.paginationPage = function(index) {
    console.log('select ' + index + ' page');
  };
  scope.paginationNext = function() {
    console.log('select next page');
  };

}
MyCtrl1.$inject = ['$scope'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
