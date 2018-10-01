/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const updateInstances = (data) => {
  const projection = d3.geoAlbersUsa().scale(1280).translate([960/2, 600/2]);

  const map = d3.select("svg");
  const circles = map.selectAll(".circle-instances").remove().exit();
  circles.data(data)
    .enter().append("circle")
    .attr("class", "circle-instances")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .attr("fill", datum => {
      if (datum.sources) return "#f70000";
      else return "#ccc";
    })
    .attr("stroke", "black")
    .attr("cx", datum => projection([datum.longitude, datum.latitude])[0])
    .attr("cy", datum => projection([datum.longitude, datum.latitude])[1])
    .attr("r", 0.5)
    .transition().duration(750)
    .attr("r", datum => Math.sqrt(datum.total_victims));
};

const handleMouseOver = (datum, i) => {
  if (datum.sources) {
    const currentCircle = d3.event.target;
    const svg = d3.select("svg");
    const dialogue = svg.append("polygon")
    .attr("id", `c${i}`)
    .attr("points", "0,0 0,160 300,160 300,0 50,0 37.5,-15 25,0")
    .attr("transform", `translate(
      ${currentCircle.attributes.cx.nodeValue - 37.5},
      ${parseFloat(currentCircle.attributes.cy.nodeValue) + 30}
    )`)
    .attr("fill", "#D8D8D8")
    .attr("opacity", 0)
    .transition()
    .duration(500)
    .attr("opacity", 0.75);

    const container = svg.append("foreignObject")
    .attr("width", 300)
    .attr("height", 160)
    .attr("x", currentCircle.attributes.cx.nodeValue - 37.5)
    .attr("y", parseFloat(currentCircle.attributes.cy.nodeValue) + 30);

    container.append("xhtml:div")
      .append("p")
      .html(`${datum.summary}`);
  }
};

const handleMouseOut = (datum, i) => {
  if (datum.sources) {
    d3.select(`#c${i}`).remove();
    d3.select("foreignObject").remove()
;  }
};

/* harmony default export */ __webpack_exports__["a"] = (updateInstances);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_fetchData__ = __webpack_require__(6);



document.addEventListener('DOMContentLoaded', () => {
  Object(__WEBPACK_IMPORTED_MODULE_1__util_fetchData__["a" /* fetchGunSales */])().then(gunSales => {
    Object(__WEBPACK_IMPORTED_MODULE_1__util_fetchData__["b" /* fetchInstance */])().then(instances => {
      Object(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])(gunSales, instances);
    });
  });

  document.getElementsByClassName('modal-screen')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
  });

  document.getElementsByClassName('close-modal')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
  });

  document.getElementsByClassName('open-modal')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal')[0].classList.add('is-open');
  });
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__update_chart__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__update_instances__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listener_installer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_fetchData__ = __webpack_require__(6);






const initMap = (gunSales, instances) => {
  Object(__WEBPACK_IMPORTED_MODULE_3__util_fetchData__["c" /* fetchMap */])().then(us => {
    Object(__WEBPACK_IMPORTED_MODULE_3__util_fetchData__["d" /* fetchStates */])().then(stateNames => {
      
      const usData = topojson.feature(us, us.objects.states).features;
      const svg = d3.select("svg");
      const path = d3.geoPath(null);
      const nameHash = {};
      stateNames.forEach(name => {
        nameHash[name.id] = name.name;
      });

      svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(usData)
        .enter().append("path")
        .attr("d", path)
        .attr("id", datum => datum.id);

      svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b )));

      svg.append("g")
        .attr("class", "state-names")
        .selectAll("text")
        .data(usData)
        .enter().append("text")
        .text(datum => {
          if (datum.id[0] === "0") {
            return nameHash[datum.id[1]];
          } else {
            return nameHash[datum.id];
          }
        })
        .attr("x", datum => path.centroid(datum)[0])
        .attr("y", datum => path.centroid(datum)[1])
        .attr("text-anchor", "middle")
        .attr("fill", "#6f9ba5")
        .on("click", handleClick);

      mountInstances(instances);
      });
  });

  const handleClick = datum => {
    const state = d3.event.target.textContent;
    const selectedYear = document.getElementById("year-options").value;
    if (!selectedYear) {
      window.alert("Please select a year!");
      return;
    } else if (selectedYear === 'old') {
      window.alert("No background check records before 2014!");
      return;
    }
  
    const filteredGunSales = gunSales.filter(sale => {
      return sale.month.slice(0,4) === selectedYear && sale.state === state;
    });
  
    const filteredInstances = instances.filter(instance => {
      return instance.date.slice(instance.date.length - 2) === selectedYear.slice(2) && instance.location === state;
    });
  
    Object(__WEBPACK_IMPORTED_MODULE_0__update_chart__["a" /* default */])(filteredGunSales, filteredInstances);
  };

  const mountInstances = instances => {
    Object(__WEBPACK_IMPORTED_MODULE_1__update_instances__["a" /* default */])(instances);
    Object(__WEBPACK_IMPORTED_MODULE_2__listener_installer__["a" /* default */])(instances);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (initMap);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const updateChart = (gunsales, instances) => {
  const x = d3.scaleBand().rangeRound([0, 400]),
        y = d3.scaleLinear().rangeRound([400, 0]),
        barWidth = 400 / 2 / gunsales.length,
        chartTitle = `${gunsales[0].month.slice(0,4)} ${gunsales[0].state} Firearm Background Checks`;
        instances = parseInstances(instances);

  gunsales.reverse();

  x.domain(gunsales.map(datum => datum.month.slice(datum.month.length - 2)));
  y.domain([0, d3.max(gunsales, (datum) => parseInt(datum.totals))]);

  const svg = d3.select("svg");
  svg.selectAll(".chart").remove();
  const chart = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(900, 280)");

  chart.append("text")
    .attr("class", "chart-title")
    .attr("x", 40)
    .attr("y", -20)
    .attr("fill", "#ccc")
    .attr("font-size", "15px")
    .text(chartTitle);


  chart.append("g")
    .attr("class", "axis-x")
    .attr("transform", "translate(0, 400)")
    .call(d3.axisBottom(x))
    .append("text")
    .text("month")
    .attr("transform", "translate(200, 40)")
    .attr("font-size", "12px");

  chart.append("g")
    .attr("class", "axis-y")
    .call(d3.axisLeft(y))
    .append("text")
    .text("background check")
    .attr("transform", "rotate(-90)")
    .attr("x", -160)
    .attr("y", -60)
    .attr("font-size", "12px");

  chart.selectAll(".bar")
    .data(gunsales)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", datum => x(datum.month.slice(datum.month.length - 2)) + barWidth / 2)
    .attr("y", datum => y(parseInt(datum.totals)))
    .transition()
    .duration(500)
    .attr("height", datum => 400 - y(parseInt(datum.totals)))
    .attr("width", barWidth);

  chart.selectAll(".dot")
    .data(instances)
    .enter().append("circle")
    .attr("cx", datum => x(Object.keys(datum)[0]) + barWidth)
    .attr("cy", datum => 400 - parseInt(Object.values(datum)[0]) * 50)
    .attr("fill", "#fff")
    .attr("r", 0.5)
    .transition()
    .duration(750)
    .attr("r", Math.sqrt(barWidth));
};

const parseInstances = instances => {
  const res = {};
  instances.forEach(instance => {
    let month = instance.date.split('/')[0];
    if (month.length === 1) month = "0" + month;
    if (res[month]) res[month] += 1;
    else res[month] = 1;
  });
  return Object.keys(res).map(key => {return {[key]: res[key]};});
};

/* harmony default export */ __webpack_exports__["a"] = (updateChart);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__update_instances__ = __webpack_require__(0);


const listenerInstaller = (instances) => {
  const selectorValues = {
    "year-options": "",
    "gender-options": "",
    "venue-options": "",
    "race-options": ""
  };

  document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll("select").forEach(select => {
      select.selectedIndex = 0;
    });
    for (let option in selectorValues) {
      if (selectorValues.hasOwnProperty(option)) {
        selectorValues[option] = "";
      }
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__update_instances__["a" /* default */])(instances);
  });

  document.querySelectorAll('select').forEach(selector => {
    selector.addEventListener('change', e => {
      selectorValues[selector.className] = e.currentTarget.value;
      const filteredInstances = filterInstances(instances);
      Object(__WEBPACK_IMPORTED_MODULE_0__update_instances__["a" /* default */])(filteredInstances);
    });
  });
  
  const filterInstances = (instances) => {
    console.log(selectorValues)
    const res = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
  
      return (!selectorValues["year-options"] || date === selectorValues["year-options"] || (parseInt(date) < 14 && selectorValues["year-options"] === "d")) &&
        (!selectorValues["venue-options"] || instance.venue === selectorValues["venue-options"]) &&
        (!selectorValues["gender-options"] || instance.gender === selectorValues["gender-options"]) &&
        (!selectorValues["race-options"] || instance.race.toUpperCase() === selectorValues["race-options"].toUpperCase());
    });
  
    return res;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (listenerInstaller);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const fetchMap = () => (
    d3.json("https://d3js.org/us-10m.v1.json")
);
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchMap;


const fetchStates = () => (
    d3.tsv("https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/us-state-names.tsv")
);
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchStates;


const fetchInstance = () => (
    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv")
);
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchInstance;


const fetchGunSales = () => (
    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv")
);
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchGunSales;




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map