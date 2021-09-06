import Papa from 'papaparse';

const DEFAULT_OPTIONS = {
    showHeader: true,
    parserOptions: {}
};

/**
 * Parses the supplied CSV strings and renders it in a table
 * @param {string} csvString the CSV string that holds the table data
 * @param {Element} rootElement optional, the root DOM element to witch the content is appended
 * @param {object} options optional, an object that contains the table and parser options
 */
export function visualize(
    csvString,
    rootElement = document.body,
    options = {}
) {
    const config = Object.assign({}, DEFAULT_OPTIONS, options);

    writeStyle(rootElement);
    // Check for data
    if (!csvString || csvString.trim() === '') {
        writeDiv('There is no data to display.', 'table-header');
        return;
    }
    // Parse CSV
    const parseResult = Papa.parse(csvString, options.parserOptions);
    // Report errors if any
    if (parseResult.errors.length > 0) {
        console.error('CSV parsing errors: ', parseResult.errors);
        writeDiv(
            'There were some errors while parsing the CSV data. See console for more details.',
            'error'
        );
    }
    // Write table
    writeTable(parseResult.data, rootElement, config);
}

function writeTable(data, rootElement, config) {
    if (config.showHeader) {
        writeDiv(`Showing ${data.length - 1} rows`, 'table-header');
    }
    const table = document.createElement('TABLE');
    // Table head
    const thead = document.createElement('THEAD');
    const theadRow = document.createElement('TR');
    data[0].forEach((header) => {
        const th = document.createElement('TH');
        th.textContent = header;
        theadRow.appendChild(th);
    });
    thead.appendChild(theadRow);
    table.appendChild(thead);
    // Table body
    const tbody = document.createElement('TBODY');
    for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const tr = document.createElement('TR');
        data[rowIndex].forEach((cell) => {
            const td = document.createElement('TD');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    rootElement.appendChild(table);
}

function writeStyle(rootElement) {
    // Don't add style twice
    if (document.getElementById('csv-table')) {
        return;
    }
    // Create style element and add it to the page
    const style = document.createElement('STYLE');
    style.id = 'csv-table';
    style.textContent = `* { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"; }
table { border-collapse: collapse; }
th, td { padding: .75rem; border-top: 1px solid #dee2e6; }
th { border-bottom: 2px solid #dee2e6; font-weight:bold; }
tbody tr:nth-of-type(odd) {
  background-color: rgba(0,0,0,.05);
}
.table-header { margin: 1rem 0; font-weight:bold; }
.error { color:#FF0000; }`;
    rootElement.appendChild(style);
}

function writeDiv(textContent, className) {
    const div = document.createElement('DIV');
    if (className) {
        div.className = className;
    }
    div.textContent = textContent;
    document.body.appendChild(div);
}
