'use strict';

var lib = {
  extend: function extend(options, defaults) {
    if(typeof defaults !== 'object') {
      return options;
    }
    for(var key in defaults) {
      options[key] = options[key] || defaults[key];

    }
    return options;
  },
  range: function range(size) {
    var result = [];

    for(var i = 0; i < size; i++) {
      result[i] = i;
    }

    return result;
  },
  scopeSetter: function(scope, attr, defaults) {
    var set = function(key, value) {
      //console.log('setting ' + key + ' to ' + value);
      scope[key] = value;
    };
    return {
      boolean: function(key, enable, disable) {
        if(attr[disable] !== undefined) {
          return set(key, false);
        }
        if(attr[enable] !== undefined) {
          return set(key, true);
        }
        set(key, defaults[key]);
      }
    };
  }
};

/* Directives */
(function(angular, window, undefined) {

  var myApp = angular.module('myApp.directives', []);

  myApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  myApp.filter('pagination', function() {
    return function(input, page, size) {
      return input.slice(page * size, (page + 1) * size);
    };
  });

  myApp.directive('pagination', ['$compile', function($compile) {
    var defaults = {
      padding: {
        left: 2,
        right: 2,
        center: 2
      },
      onFirstPage: true,
      onLastPage: true,
      showPreviousPage: true,
      showFirstPage: true,
      showLastPage: true,
      showNextPage: true,
      pageSize: 10,
      currentPage: 0
    }, directiveDefinitionObject = {
      restrict: 'EA',
      scope: {
        size: '='
      , page: '='
      , lastPage: '='
      },
      replace: true,
      templateUrl: 'partials/pagination.html',
      compile: function(element, attr, linker) {
        return function(scope, iterStartElement, attr) {
          var setter = lib.scopeSetter(scope, attr, defaults),
            expression = attr.pagination || attr.paginationResource || attr.resource,
            calcLastPage = function() {
              // calculate the last page
              scope.maxPages = Math.ceil(scope.listLength / scope.pageSize) - 1;
              console.log(scope);
              //scope.lastPage = scope.maxPages;
            },
            isVisible = function(index) {
              // decide if we show the first page
              if(index === 0) {
                return !scope.showFirstPage;
              }
              // decide if we show the last page
              if(index === scope.maxPages) {
                return !scope.showLastPage;
              }
              // if we are in the left padding...
              if(index <= scope.padding.left ||
              // if we are in the right padding...
              index >= scope.maxPages - scope.padding.right ||
              // if we are in between the center paddings...
              Math.abs(index - scope.currentPage) <= scope.padding.center) {
                return true;
              }
              return false;
            },

            update = function() {
              // generate an array for each possible page
              scope.pages = lib.range(scope.maxPages + 1);
              // calculate the visible Pages
              scope.visiblePages = scope.pages.map(function(index) {
                if(!isVisible(index)) {
                  if(index !== scope.maxPages && index > 1 && isVisible(index - 1)) {
                    if(isVisible(index + 1)) {
                      return index;
                    } else {
                      return '...';
                    }
                  }
                  return false;
                }
                return index;
              }).filter(function(page) {
                return page !== false;
              }).map(function(element, index) {
                if(isNaN(element)) {
                  return {
                    index: null,
                    text: String.fromCharCode(0x2026),
                    clickable: false
                  };
                }
                return {
                  index: element,
                  text: element + 1,
                  clickable: true
                };
              });
              scope.page = scope.currentPage;
            };

          scope.setPage = function(index) {
            if(scope.currentPage === index) {
              return;
            }
            scope.currentPage = Math.max(0, Math.min(scope.maxPages, index)) || 0;
            console.log('set page to ' + index + ' -> ' + scope.currentPage);
            update();
            scope.onFirstPage = scope.currentPage === 0;
            scope.onLastPage = scope.currentPage === scope.maxPages;
          };
          scope.$parent.$watch(expression, function(list) {
            scope.listLength = list.length || list || 0;
            calcLastPage();
            update();
          });
          scope.$watch('showFirstPage', update);
          scope.$watch('showLastPage', update);
          scope.$watch('page', function() {
            console.log('detected page change');
            scope.setPage(scope.page);
          });
          scope.$watch('size', function() {
            scope.pageSize = scope.size;
            update();
          });

          scope.size = scope.pageSize = scope.size || scope.pageSize || defaults.pageSize;
          scope.page = scope.currentPage = scope.page || scope.currentPage || defaults.currentPage;

          // calculate the listLength once
          scope.listLength = scope.$eval(expression);
          // set default values for padding
          scope.padding = defaults.padding;
          // parse user defined input, padding is kind of special
          scope.padding.left = parseInt(attr.paddingLeft, 10) || scope.padding.left;
          scope.padding.right = parseInt(attr.paddingRight, 10) || scope.padding.right;
          scope.padding.center = parseInt(attr.paddingCenter, 10) || scope.padding.center;
          setter.boolean('showPreviousPage', 'showPreviousPage', 'disablePreviousPage');
          setter.boolean('showFirstPage', 'showFirstPage', 'disableFirstPage');
          setter.boolean('showLastPage', 'showLastPage', 'disableLastPage');
          setter.boolean('showNextPage', 'showNextPage', 'disableNextPage');
          scope.setPage(parseInt(attr.currentPage || attr.startPage, 10) || defaults.currentPage);
        };
      }
    };
    return directiveDefinitionObject;
  }]);

})(angular, window, undefined);
