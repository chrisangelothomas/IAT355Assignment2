// js/vis-a3.js

// --- utils
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => Number.isFinite(n) ? n.toLocaleString() : n;

// coerce numerics
const coerce = (d) => {
  d.Year = +d.Year || null;
  d.NA_Sales = +d.NA_Sales || 0;
  d.EU_Sales = +d.EU_Sales || 0;
  d.JP_Sales = +d.JP_Sales || 0;
  d.Other_Sales = +d.Other_Sales || 0;
  d.Global_Sales = +d.Global_Sales || 0;
  return d;
};

async function loadWide() {
  const rows = await d3.csv("dataset/videogames_wide.csv", coerce);
  return rows.filter(r => r.Name && r.Platform && r.Genre);
}

function summary(rows) {
  const n = rows.length;
  const uniq = (arr) => Array.from(new Set(arr));
  const nums = rows.map(r => r.Global_Sales).filter(Number.isFinite);
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const mean = sum(nums) / nums.length;
  const s = nums.slice().sort((a,b)=>a-b);
  const med = s.length % 2 ? s[(s.length-1)/2] : (s[s.length/2-1]+s[s.length/2])/2;
  const range = Math.max(...nums) - Math.min(...nums);
  const stdev = Math.sqrt(sum(nums.map(x => (x-mean)**2)) / nums.length);

  const years = rows.map(r=>r.Year).filter(v=>v!=null);
  const yMin = Math.min(...years), yMax = Math.max(...years);

  $("#summary").innerHTML = `
    Titles: ${fmt(n)}<br>
    Platforms: ${fmt(uniq(rows.map(r=>r.Platform)).length)}
    | Genres: ${fmt(uniq(rows.map(r=>r.Genre)).length)}
    | Publishers: ${fmt(uniq(rows.map(r=>r.Publisher)).length)}<br>
    Year range: ${fmt(yMin)}–${fmt(yMax)}<br>
    Global_Sales (M): mean=${mean.toFixed(2)}, median=${med.toFixed(2)}, range=${range.toFixed(2)}, stdev=${stdev.toFixed(2)}
  `;
}

async function renderVis1(rows) {
  // Compute Top 12 platforms by total global sales (for readability)
  const totals = d3.rollups(
    rows,
    v => d3.sum(v, d => d.Global_Sales),
    d => d.Platform
  )
  .map(([Platform, Total]) => ({ Platform, Total }))
  .sort((a, b) => d3.descending(a.Total, b.Total));

  const topPlatforms = totals.slice(0, 12).map(d => d.Platform);
  const data = rows.filter(r => topPlatforms.includes(r.Platform));

  // Plain Vega-Lite spec (avoids vega-lite-api chaining issues)
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Heatmap of total global sales by Genre × Platform (Top 12 platforms).",
    data: { values: data },
    mark: "rect",
    encoding: {
      x: { field: "Genre", type: "nominal", sort: "ascending", title: "Genre" },
      y: { field: "Platform", type: "nominal", sort: topPlatforms, title: "Platform" },
      color: {
        aggregate: "sum",
        field: "Global_Sales",
        type: "quantitative",
        title: "Σ Global Sales (M)",
        scale: { scheme: "blues" }
      },
      tooltip: [
        { field: "Genre", type: "nominal", title: "Genre" },
        { field: "Platform", type: "nominal", title: "Platform" },
        { aggregate: "sum", field: "Global_Sales", type: "quantitative", title: "Σ Global (M)", format: ",.2f" }
      ]
    },
    width: "container",
    height: 520,
    config: {
      axis: { labelFontSize: 12, titleFontSize: 12 },
      legend: { labelFontSize: 12, titleFontSize: 12 }
    }
  };

  await vegaEmbed("#vis1", spec, { actions: false });

  document.querySelector("#cap1").textContent =
    "Heatmap of total global sales by Genre × Platform (Top 12 platforms). Darker cells = higher sales.";
}

async function renderVis2(rows) {
  // Filter valid years
  const withYear = rows.filter(r => Number.isFinite(r.Year));

  // Top 8 platforms by total global sales (readability)
  const totals = d3.rollups(
    withYear,
    v => d3.sum(v, d => d.Global_Sales),
    d => d.Platform
  )
  .map(([Platform, Total]) => ({ Platform, Total }))
  .sort((a, b) => d3.descending(a.Total, b.Total));
  const topPlatforms = new Set(totals.slice(0, 8).map(d => d.Platform));
  const data = withYear.filter(r => topPlatforms.has(r.Platform));

  // Collect genre options for dropdown (sorted)
  const genres = Array.from(new Set(data.map(d => d.Genre))).sort();
  const genreOptions = [null, ...genres]; // null = "All"

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Sales Over Time by Platform with Genre filter (Top 8 platforms).",
    data: { values: data },
    params: [
      {
        name: "GenreSel",
        value: null,
        bind: { input: "select", options: genreOptions, name: "Genre: " }
      }
    ],
    transform: [
      { filter: "!GenreSel || datum.Genre === GenreSel" },
      { aggregate: [{ op: "sum", field: "Global_Sales", as: "Total" }], groupby: ["Year", "Platform"] }
    ],
    mark: { type: "line", interpolate: "monotone" },
    encoding: {
      x: { field: "Year", type: "quantitative", title: "Year" },
      y: { field: "Total", type: "quantitative", title: "Σ Global Sales (M)" },
      color: { field: "Platform", type: "nominal", title: "Platform" },
      tooltip: [
        { field: "Year", type: "quantitative", title: "Year" },
        { field: "Platform", type: "nominal" },
        { field: "Total", type: "quantitative", title: "Σ Global (M)", format: ",.2f" }
      ]
    },
    width: "container",
    height: 420,
    config: {
      axis: { labelFontSize: 12, titleFontSize: 12 },
      legend: { labelFontSize: 12, titleFontSize: 12 }
    }
  };

  await vegaEmbed("#vis2", spec, { actions: false });

  document.querySelector("#cap2").textContent =
    "Lines show total global sales by year and platform. Use the Genre dropdown to focus trends; limited to Top 8 platforms for readability.";
}

async function renderVis3(rows) {
  // Keep only platforms with highest total global sales (Top 10)
  const totals = d3.rollups(
    rows,
    v => d3.sum(v, d => d.Global_Sales),
    d => d.Platform
  )
  .map(([Platform, Total]) => ({ Platform, Total }))
  .sort((a, b) => d3.descending(a.Total, b.Total));

  const topPlatforms = totals.slice(0, 10).map(d => d.Platform);
  const data = rows.filter(r => topPlatforms.includes(r.Platform));

  // Order regions consistently
  const regionOrder = ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"];
  const regionLabels = {
    "NA_Sales": "NA",
    "EU_Sales": "EU",
    "JP_Sales": "JP",
    "Other_Sales": "Other"
  };

  // Plain Vega-Lite spec: fold wide → long, then stacked bars
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Regional Sales vs. Platform (Top 10 platforms).",
    data: { values: data },
    transform: [
      { fold: regionOrder, as: ["RegionKey", "Sales"] },
      {
        calculate: "datum.RegionKey === 'NA_Sales' ? 'NA' : datum.RegionKey === 'EU_Sales' ? 'EU' : datum.RegionKey === 'JP_Sales' ? 'JP' : 'Other'",
        as: "Region"
      },
      { aggregate: [{ op: "sum", field: "Sales", as: "Total" }], groupby: ["Platform", "Region"] }
    ],
    mark: "bar",
    encoding: {
      x: { field: "Platform", type: "nominal", sort: topPlatforms, title: "Platform" },
      y: { field: "Total", type: "quantitative", title: "Σ Sales (M)" },
      color: {
        field: "Region",
        type: "nominal",
        sort: ["NA", "EU", "JP", "Other"],
        title: "Region"
      },
      tooltip: [
        { field: "Platform", type: "nominal" },
        { field: "Region", type: "nominal" },
        { field: "Total", type: "quantitative", title: "Σ Sales (M)", format: ",.2f" }
      ]
    },
    width: "container",
    height: 420,
    config: {
      axis: { labelFontSize: 12, titleFontSize: 12 },
      legend: { labelFontSize: 12, titleFontSize: 12 }
    }
  };

  await vegaEmbed("#vis3", spec, { actions: false });

  document.querySelector("#cap3").textContent =
    "Stacked bars compare regional sales (NA, EU, JP, Other) across platforms. Limited to Top 10 platforms for readability; use legend to isolate regions.";
}

async function renderVis4(rows) {
  // Keep titles with numeric sales
  const data = rows.filter(r => Number.isFinite(r.Global_Sales));

  // Genre options for dropdown (sorted), null = "All"
  const genres = Array.from(new Set(data.map(d => d.Genre))).sort();
  const genreOptions = [null, ...genres];

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Distribution of per-title Global Sales with mean/median and genre filter.",
    data: { values: data },
    params: [
      {
        name: "GenreSel",
        value: null,
        bind: { input: "select", options: genreOptions, name: "Genre: " }
      }
    ],
    transform: [
      { filter: "!GenreSel || datum.Genre === GenreSel" }
    ],
    layer: [
      // Histogram: count of titles per Global_Sales bin
      {
        mark: "bar",
        encoding: {
          x: {
            bin: { maxbins: 40 },
            field: "Global_Sales",
            type: "quantitative",
            title: "Global Sales per Title (M units)"
          },
          y: { aggregate: "count", type: "quantitative", title: "Number of Titles" },
          tooltip: [
            { bin: true, field: "Global_Sales", type: "quantitative", title: "Sales Bin (M)" },
            { aggregate: "count", type: "quantitative", title: "Titles" }
          ]
        }
      },
      // Mean rule
      {
        mark: { type: "rule", size: 2 },
        encoding: {
          x: { aggregate: "mean", field: "Global_Sales", type: "quantitative" },
          color: { value: "#444" },
          tooltip: [
            { aggregate: "mean", field: "Global_Sales", type: "quantitative", title: "Mean (M)", format: ",.2f" }
          ]
        }
      },
      // Median rule
      {
        mark: { type: "rule", size: 2 },
        encoding: {
          x: { aggregate: "median", field: "Global_Sales", type: "quantitative" },
          color: { value: "#999" },
          tooltip: [
            { aggregate: "median", field: "Global_Sales", type: "quantitative", title: "Median (M)", format: ",.2f" }
          ]
        }
      }
    ],
    width: "container",
    height: 420,
    config: {
      axis: { labelFontSize: 12, titleFontSize: 12 },
      legend: { labelFontSize: 12, titleFontSize: 12 }
    }
  };

  await vegaEmbed("#vis4", spec, { actions: false });

  document.querySelector("#cap4").textContent =
    "Histogram shows a hit-driven market: most games sell modestly; mean > median due to a few blockbusters. Use the Genre dropdown to compare distributions.";
}

(async function main() {
  const rows = await loadWide();
  console.log('Rows loaded:', rows.length, rows[0]);
  summary(rows);
  await renderVis1(rows);   // <-- replaced smoke test
  await renderVis2(rows);
  await renderVis3(rows);
  await renderVis4(rows);

})();