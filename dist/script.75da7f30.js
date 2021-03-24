// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcDistanceToBirthday = calcDistanceToBirthday;

function calcDistanceToBirthday(personToCalculate) {
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  var year = calculate_age(new Date(personToCalculate.birthday)) + 1; // console.log(year);

  var newDate = new Date(personToCalculate.birthday);
  var month = newDate.toLocaleString('default', {
    month: 'long'
  });
  var dayBirthday = newDate.getDate(); // calculate birday day in between

  var birthday = new Date(personToCalculate.birthday);
  var today = new Date(); //Set current year or the next year if you already had birthday this year

  birthday.setFullYear(today.getFullYear());

  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  } //Calculate difference between days


  var daysToBirthday = Math.floor(Number(birthday - today) / (1000 * 60 * 60 * 24) + 1);
  console.log(daysToBirthday, "TO BIRTHDAY", birthday);
  var leftDays = "";

  if (daysToBirthday === 365) {
    leftDays = 0;
  } else {
    leftDays = daysToBirthday;
  }

  personToCalculate.birthdayDay = dayBirthday;
  personToCalculate.birthdayMonth = month;
  personToCalculate.futureAge = year;
  personToCalculate.distanceToBirthday = leftDays;
  console.log(personToCalculate);
  return personToCalculate;
}
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Set the function for the  promise.
function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} // Grab the element from html


var tbody = document.querySelector('ul');
var Addbutton = document.querySelector(".addButton");
console.log(Addbutton);
var searchNameFilter = document.querySelector('.searchName');
var filterMonthFilter = document.querySelector('.filterMonth'); //fuction that handle every function we need

function getData() {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var response, data, people, displayData, destroyPopup, _destroyPopup, editBirthday, editBirthdayPopup, deleteBirthdayPopup, handleClick, AddPersonPopup, initLocalStorage, updateLocalStorage;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _destroyPopup = function _destroyPopup3() {
              _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(popup) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        popup.classList.remove('open'); // wait for 1 second, to let the animation do its work

                        _context3.next = 3;
                        return wait(1000);

                      case 3:
                        // remove it from the dom
                        popup.remove(); // remove it from the javascript memory

                        popup = null;

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _destroyPopup.apply(this, arguments);
            };

            destroyPopup = function _destroyPopup2(_x) {
              return _destroyPopup.apply(this, arguments);
            };

            displayData = function _displayData(people) {
              console.log(people);

              if (searchNameFilter.value !== '') {
                people = people.filter(function (person) {
                  var fullNameLowercase = person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
                  return fullNameLowercase.includes(searchNameFilter.value.toLowerCase());
                });
              }

              if (filterMonthFilter.value !== '') {
                people = people.filter(function (person) {
                  var birthday = new Date(person.birthday);
                  return birthday.getMonth() === Number(filterMonthFilter.value);
                });
              } //Sort people’s birthdays from the youngest to the oldest.


              if (!people) {
                return;
              }

              var newDataSort = people.slice().sort(function (a, b) {
                return a.distanceToBirthday - b.distanceToBirthday;
              }); //created html and  map the newDataSort.

              var html = newDataSort.map(function (person, index) {
                return "\n    <li data-id=\"".concat(person.id, "\" class=\"").concat(index % 2 ? 'even' : '', "\">\n        <img src=\"").concat(person.picture, "\" alt=\"").concat(person.firstName + ' ' + person.lastName, "\" class =\"person-image\"/>\n        <div class = \"aboutyear\">\n            <h3 class =\"name\">").concat(person.lastName, " ").concat(person.firstName, "</h3>\n            <p class=\"age\">Turns <b>").concat(person.futureAge, "</b>years on ").concat(person.birthdayMonth, " on ").concat(person.birthdayDay, " th </p>\n        </div>\n        <div class=\"edit-delete-day-wraper\">\n            <p class=\"day\">\n            ").concat(person.distanceToBirthday == 0 ? "\uD83C\uDF82\uD83C\uDF82\uD83C\uDF82" : "in ".concat(person.distanceToBirthday, " days"), "</p>\n            <div class= \"icon\">\n               <button class=\"edit\">\n                <img src=\"./svg/edit.svg\" alt=\"\">\n                </button>\n                <button class=\"delete\">\n                <img src=\"./svg/delete.svg\" alt=\"\">\n               </button>\n           </div>\n        </div>\n    </li>\n  ");
              }).join('');
              tbody.innerHTML = html;
              tbody.dispatchEvent(new CustomEvent('listUpdated'));
            };

            _context4.next = 5;
            return fetch('https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json');

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            data = _context4.sent;
            // empty array to store everything
            people = [];
            people = data;
            people = people.map(function (person) {
              return (0, _utils.calcDistanceToBirthday)(person);
            });
            console.log(people); // Function that handle the add data (birthday)

            searchNameFilter.addEventListener('input', function () {
              return displayData(people);
            });
            filterMonthFilter.addEventListener('change', function () {
              return displayData(people);
            });

            // Function that handle the edit form (editBirthday)
            editBirthday = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                var birthdayId, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        birthdayId = people.find(function (birthday) {
                          return birthday.id == id;
                        });
                        console.log(birthdayId);
                        _context.next = 4;
                        return editBirthdayPopup(birthdayId);

                      case 4:
                        result = _context.sent;
                        console.log("editbirthdat", result);

                        if (result) {
                          displayData(people);
                        }

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function editBirthday(_x2) {
                return _ref.apply(this, arguments);
              };
            }();

            editBirthdayPopup = function editBirthdayPopup(person) {
              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                  var birthdayDate, todayDate, popup, skipButton, skipX;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          birthdayDate = new Date(person.birthday).toISOString().slice(0, 10);
                          todayDate = new Date().toISOString().slice(0, 10);
                          popup = document.createElement('form');
                          popup.classList.add('popup');
                          popup.innerHTML = "<fieldset class=\"edit_person-wrapper\">\n              <h3 class=\"edit_person\">Edit ".concat(person.firstName, "</h3>\n              <label>Lastname</label>\n              <input type=\"text\" name=\"lastName\" value=\"").concat(person.lastName, "\"/>\n              <label>Firstname</label>\n              <input type=\"text\" name=\"firstName\" value=\"").concat(person.firstName, "\"/>\n              <label>Birthday</label>\n              <input type=\"date\" id=\"start\" name=\"bithdayDate\" value=\"").concat(birthdayDate, "\" max = \"").concat(todayDate, "\">\n              <div class= \"addChages-cancel-wrapper\">\n                  <button type=\"submit\">Save changes</button>\n                  <button type=\"button\" id=\"cancel-btn\">Cancel</button>\n              </div>\n              <button type=button id=\"cancel-x\">X</button>\n            </fieldset>");
                          document.body.appendChild(popup); // await wait(10);

                          popup.classList.add('open');
                          document.body.style.overflow = "hidden";
                          popup.addEventListener('submit', function (e) {
                            e.preventDefault();
                            person.lastName = e.target.lastName.value;
                            person.firstName = e.target.firstName.value;
                            person.birthday = e.target.bithdayDate.value;
                            var personWithCalculateDate = (0, _utils.calcDistanceToBirthday)(person);
                            resolve(personWithCalculateDate);
                            displayData(people);
                            destroyPopup(popup);
                          }, {
                            once: true
                          });
                          skipButton = document.querySelector('#cancel-btn');
                          skipButton.addEventListener('click', function () {
                            destroyPopup(popup); //  resolve(null);

                            document.body.style.overflow = "visible";
                          }, {
                            once: true
                          });
                          skipX = document.querySelector("#cancel-x");
                          console.log(skipX);
                          skipX.addEventListener('click', function () {
                            destroyPopup(popup); //  resolve(null);

                            document.body.style.overflow = "visible";
                          }, {
                            once: true
                          });

                        case 14:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }; // Function for the delete the about the people .


            deleteBirthdayPopup = function deleteBirthdayPopup(id) {
              console.log(id);
              var filterIdOfPeople = people.filter(function (person) {
                return person.id != id;
              });
              console.log(filterIdOfPeople);
              var selectedPerson = people.filter(function (person) {
                return person.id == id;
              })[0];
              console.log(selectedPerson);
              var deleteDiv = document.createElement('div');
              deleteDiv.classList.add('popup');
              deleteDiv.insertAdjacentHTML('afterbegin', "\n            <fieldset class =\"want_to_delete\">\n                <h3>Delete ".concat(selectedPerson.firstName, " ").concat(selectedPerson.lastName, "</h3>\n                <p>Are you sure you want to delete this person from the list?</p>\n                <div class=\"deleted_button\">\n                    <button type=\"submit\" class ='delete'>Delete</button>\n                    <button type = \"button\" class =\"cancel-delete\">Cancel</button>\n                </div>\n            </fieldset>\n    "));
              document.body.appendChild(deleteDiv);
              deleteDiv.classList.add("open");
              deleteDiv.addEventListener("click", function (e) {
                e.preventDefault();
                var deleteButon = e.target.closest("button.delete");

                if (deleteButon) {
                  people = filterIdOfPeople;
                  displayData(people);
                  destroyPopup(deleteDiv);
                  tbody.dispatchEvent(new CustomEvent('updateList'));
                }

                var cancelButton = e.target.closest("button.cancel-delete");

                if (cancelButton) {
                  deleteDiv.classList.remove("open");
                }
              });
            }; // fuction to check the target 


            handleClick = function handleClick(e) {
              if (e.target.closest('button.edit')) {
                var editButton = e.target.closest('li');
                var idToEdit = editButton.dataset.id;
                console.log(idToEdit);
                editBirthday(idToEdit);
              }

              if (e.target.closest('button.delete')) {
                var deleteButton = e.target.closest('li');
                var idToDelete = deleteButton.dataset.id;
                deleteBirthdayPopup(idToDelete);
              }
            };

            tbody.addEventListener('click', handleClick);

            AddPersonPopup = function AddPersonPopup() {
              var popup = document.createElement('form');
              var todayDate = new Date().toISOString().slice(0, 10);
              popup.classList.add('popup');
              popup.innerHTML = "\n            <div class=\"add-form\"> \n                <label for=\"firstname\">First Name</label>\n                <input type=\"text\" name=\"firstname\" id=\"firstname\">\n                <label for=\"lastname\">Last name</label>\n                <input type=\"text\" name=\"lastname\" id=\"lastname\">\n                <label for=\"birthday\">Birthday</label>\n                <input type=\"date\" id=\"birthday\" name=\"birthday\" max = \"".concat(todayDate, "\">\n                <label for=\"image\">Image</label>\n                <input type=\"url\" name=\"image\">\n                <div class=\"add-cancel-wrapper\">\n                    <button type=\"submit\">Add</button>\n                    <button type = \"button\" id =\"cancel-btn\"> Cancel</button>\n                </div>\n            </div>\n        \n            ");
              document.body.appendChild(popup); // await wait(10);

              popup.classList.add('open');
              popup.addEventListener("submit", function (e) {
                e.preventDefault();
                var formEl = e.currentTarget;
                var newBirthday = {
                  lastName: formEl.lastname.value,
                  firstName: formEl.firstname.value,
                  birthday: formEl.birthday.value,
                  picture: formEl.image.value,
                  id: Date.now()
                };
                (0, _utils.calcDistanceToBirthday)(newBirthday);
                people.push(newBirthday);
                console.log(people);
                displayData(people);
                destroyPopup(popup);
                popup.reset();
                tbody.dispatchEvent(new CustomEvent('listUpdated'));
              });
              var skipButton = document.querySelector('#cancel-btn');
              skipButton.addEventListener('click', function () {
                destroyPopup(popup);
              }, {
                once: true
              });
            };

            Addbutton.addEventListener("click", AddPersonPopup); // Stored the data inside of the local storage. 

            initLocalStorage = function initLocalStorage() {
              var birthdayList = JSON.parse(localStorage.getItem('people'));

              if (birthdayList) {
                people = birthdayList;
              }

              tbody.dispatchEvent(new CustomEvent('listUpdated'));
            }; // update the local storage 


            updateLocalStorage = function updateLocalStorage() {
              localStorage.setItem('people', JSON.stringify(people));
            };

            tbody.addEventListener('listUpdated', updateLocalStorage);
            initLocalStorage();
            displayData(people);

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getData.apply(this, arguments);
}

getData();
},{"./utils.js":"utils.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61755" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map