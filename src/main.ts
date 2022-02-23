import axios, { AxiosResponse } from "axios";
import { Token, TokenStats } from "./datatypes";

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
  // Use the user input to control the number of cryptocurrencies to fetch
  const fetchLimit = (limitInput as HTMLInputElement)?.value ?? 20;
  axios
    .request({
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: { 
        vs_currency: "usd", 
        order: "market_cap_desc", 
        per_page: fetchLimit, 
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

        // Create a table data cell to show name of crypto
        const nameCell = document.createElement("td");
        nameCell.innerText = `${t.name}`;
        aRow.appendChild(nameCell);

        // Create a table data cell to show symbol for crypto
        const symbolCell = document.createElement("td");
        symbolCell.innerText = `${t.symbol.toUpperCase()}`;
        aRow.appendChild(symbolCell);

        // Create a table data cell to show current price of crypto
        const priceCell = document.createElement("td");
        priceCell.innerText = `$${t.current_price}`;
        aRow.appendChild(priceCell);

        // Create a table data cell to show the market cap of crypto
        const marketCapCell = document.createElement("td");
        marketCapCell.innerText = `$${t.market_cap}`;
        aRow.appendChild(marketCapCell);

        // Create a table data cell to show the rank by market cap of crypto
        const rankCell = document.createElement("td");
        rankCell.innerText = `${t.market_cap_rank}`;
        aRow.appendChild(rankCell);
      }
    });
}


const tokenInput: Element | null = document.getElementById("input2");
const fetchBtn2 = document.getElementById("btn2");
const myTable2 = document.getElementById("coin");

// Define a click listener on the button
fetchBtn2?.addEventListener("click", () => {
  removeOldData2();
  fetchNewData2();
});


function removeOldData2() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI2");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    myTable2?.removeChild(rows[k]);
  }
}

function fetchNewData2() {
  // Use the user input to fetch desired crypto
  const fetchCoin = (tokenInput as HTMLInputElement)?.value ?? "bitcoin";
  axios
    .request({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${fetchCoin.toLowerCase()}`,
    })
    .then((r: AxiosResponse) => r.data)
    .then((myData: TokenStats) => {
      const aRow = document.createElement("tr");
      // Use a unique class name so it is easy to remove rows later
      aRow.setAttribute("class", "fromAPI2");
      myTable2?.appendChild(aRow);

      // Create table data cell to show image of coin/token logo
      const imgCell = document.createElement("td")
      aRow.appendChild(imgCell);
      const image = document.createElement("img");
      image.setAttribute("src", myData.image.small);
      imgCell.appendChild(image);

      // Create a table data cell to show name of crypto
      const nameCell = document.createElement("td");
      nameCell.innerText = `${myData.name}`;
      aRow.appendChild(nameCell);

      // Create a table data cell to show symbol of crypto
      const symbolCell = document.createElement("td");
      symbolCell.innerText = `${myData.symbol.toUpperCase()}`;
      aRow.appendChild(symbolCell);

      // Create a table data cell to show the current price of crypto
      const priceCell = document.createElement("td");
      priceCell.innerText = `$${myData.market_data.current_price.usd}`;
      aRow.appendChild(priceCell);

      // Create a table data cell to show the percent change of price in 24 hrs
      const percentCell = document.createElement("td");
      if(myData.market_data.price_change_percentage_24h >= 0){
        percentCell.setAttribute("class", "positive")
      }
      else{
        percentCell.setAttribute("class", "negative")
      }
      percentCell.innerText = `${(myData.market_data.price_change_percentage_24h).toFixed(2)}%`;
      aRow.appendChild(percentCell);

      // Create a table data cell to show the all time high
      const athCell = document.createElement("td");
      athCell.innerText = `$${myData.market_data.ath.usd}`;
      aRow.appendChild(athCell);

      // Create a table data cell to show the market cap
      const marketCapCell = document.createElement("td");
      marketCapCell.innerText = `$${myData.market_data.market_cap.usd}`;
      aRow.appendChild(marketCapCell);
    });
}

fetchNewData();
fetchNewData2();