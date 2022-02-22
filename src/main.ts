import axios, { AxiosResponse } from "axios";
import { Token, RankByMarketCap } from "./datatypes";

const limitInput: Element | null = document.getElementById("input1");
const fetchBtn = document.getElementById("btn1");
const myTable = document.getElementById("mars");

// Define a click listener on the button
fetchBtn?.addEventListener("click", () => {
  removeOldData();
  fetchNewData();
});

function removeOldData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    myTable?.removeChild(rows[k]);
  }
}

function fetchNewData() {
  // Use the user input to control the number of random users to fetch
  const fetchLimit = (limitInput as HTMLInputElement)?.value ?? 20;
  axios
    .request({
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: { 
        vs_currency: "usd", 
        order: "market_cap_desc", 
        per_page: 25, 
        page: 1, 
        sparkline: false },
    })
    .then((r: AxiosResponse) => r.data)
    .then((myData: Array<Token>) => {
      for (let k = 0; k < myData.length; k++) {
        const t: Token = myData[k];
        const aRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("class", "fromAPI");
        myTable?.appendChild(aRow);

        // Create a table data cell to show first name and last name
        const nameCell = document.createElement("td");
        nameCell.innerText = `${t.name}`;
        aRow.appendChild(nameCell);

        // Create a table data cell to show first name and last name
        const symbolCell = document.createElement("td");
        symbolCell.innerText = `${t.symbol.toUpperCase()}`;
        aRow.appendChild(symbolCell);

        // Create a table data cell to show date of birth
        const priceCell = document.createElement("td");
        priceCell.innerText = `$${t.current_price}`;
        aRow.appendChild(priceCell);

        // Create a table data cell to show the picture
        const marketCapCell = document.createElement("td");
        marketCapCell.innerText = `$${t.market_cap}`;
        aRow.appendChild(marketCapCell);

        const rankCell = document.createElement("td");
        rankCell.innerText = `${t.market_cap_rank}`;
        aRow.appendChild(rankCell);
      }
    });
}

fetchNewData();