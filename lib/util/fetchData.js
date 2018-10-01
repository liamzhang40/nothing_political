export const fetchMap = () => (
    d3.json("https://d3js.org/us-10m.v1.json")
);

export const fetchStates = () => (
    d3.tsv("https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/us-state-names.tsv")
);

export const fetchInstance = () => (
    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv")
);

export const fetchGunSales = () => (
    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv")
);

