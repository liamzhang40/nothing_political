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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__update_instances__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listener_installer__ = __webpack_require__(5);




document.addEventListener('DOMContentLoaded', () => {
  let instances;
  const DOMElements = {};
  Object(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])();

  DOMElements.yearOptions = document.getElementById('year-options');
  DOMElements.genderOptions = document.getElementById('gender-options');
  DOMElements.venueOptions = document.getElementById('venue-options');
  DOMElements.raceOptions = document.getElementById('race-options');
  DOMElements.reset = document.getElementById('reset');

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
    instances = data;
    setTimeout(() => Object(__WEBPACK_IMPORTED_MODULE_1__update_instances__["a" /* default */])(data), 1000);
    Object(__WEBPACK_IMPORTED_MODULE_2__listener_installer__["a" /* default */])(instances, DOMElements);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_style__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__update_chart__ = __webpack_require__(4);



let gunSales;
let instances;

const initMap = () => {
  const svg = d3.select("svg");
  const path = d3.geoPath(null);

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv").then(data => {
    gunSales = data;
  });

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
    instances = data;
  });

  const mapPromise = d3.json("https://d3js.org/us-10m.v1.json").then(us => {
    const usData = topojson.feature(us, us.objects.states).features;
    d3.tsv("https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/us-state-names.tsv")
    .then(stateNames => {
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
      });
  });

};

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

  const selectedGunSales = gunSales.filter(sale => {
    return sale.month.slice(0,4) === selectedYear && sale.state === state;
  });

  const selectedInstances = instances.filter(instance => {
    return instance.date.slice(instance.date.length - 2) === selectedYear.slice(2) && instance.location === state;
  });

  Object(__WEBPACK_IMPORTED_MODULE_1__update_chart__["a" /* default */])(selectedGunSales, selectedInstances);
};


/* harmony default export */ __webpack_exports__["a"] = (initMap);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];

/* unused harmony default export */ var _unused_webpack_default_export = (mapStyle);


/***/ }),
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



const listenerInstaller = (instances, DOMElements) => {
  let selectorValues = {
    yearOptions: "",
    genderOptions: "",
    venueOptions: "",
    raceOptions: ""
  };

  for (let key in DOMElements) {
    if (DOMElements.hasOwnProperty(key)) {
      if (key === "reset") {
        DOMElements.reset.addEventListener('click', () => {
          document.querySelectorAll("select").forEach(select => {
            select.selectedIndex = 0;
          });
          selectorValues.yearOptions = "";
          selectorValues.genderOptions = "";
          selectorValues.venueOptions = "";
          selectorValues.raceOptions = "";
          Object(__WEBPACK_IMPORTED_MODULE_0__update_instances__["a" /* default */])(instances);
        });
      } else {
        DOMElements[key].addEventListener('change', e => {
          if (key === "yearOptions") selectorValues[key] = e.currentTarget.value.slice(2);
          else selectorValues[key] = e.currentTarget.value;
          console.log(selectorValues)
          const filteredInstances = filterInstances(instances);
          Object(__WEBPACK_IMPORTED_MODULE_0__update_instances__["a" /* default */])(filteredInstances);
        });
      }
    }
  }

  // DOMElements.year_options.addEventListener('change', e => {
  //   year = e.currentTarget.value.slice(2);
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.venue_options.addEventListener('change', e => {
  //   venue = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.gender_options.addEventListener('change', e => {
  //   gender = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.race_options.addEventListener('change', e => {
  //   race = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  const filterInstances = (instances) => {
    const res = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
  
      return (!selectorValues.yearOptions || date === selectorValues.yearOptions || (parseInt(date) < 14 && selectorValues.yearOptions === "d")) &&
        (!selectorValues.venueOptions || instance.venue === selectorValues.venueOptions) &&
        (!selectorValues.genderOptions || instance.gender === selectorValues.genderOptions) &&
        (!selectorValues.raceOptions || instance.race.toUpperCase() === selectorValues.raceOptions.toUpperCase());
    });
  
    return res;
  };
};


/* harmony default export */ __webpack_exports__["a"] = (listenerInstaller);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map