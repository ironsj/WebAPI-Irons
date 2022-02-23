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
  // Use the user input to control the number of random users to fetch
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
  // Use the user input to control the number of random users to fetch
  const fetchCoin = (tokenInput as HTMLInputElement)?.value ?? "bitcoin";
  axios
    .request({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${fetchCoin}`,
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
      image.setAttribute("src", myData.image.thumb);
      imgCell.appendChild(image);

      // Create a table data cell to show first name and last name
      const nameCell = document.createElement("td");
      nameCell.innerText = `${myData.name}`;
      aRow.appendChild(nameCell);

      // Create a table data cell to show first name and last name
      const symbolCell = document.createElement("td");
      symbolCell.innerText = `${myData.symbol.toUpperCase()}`;
      aRow.appendChild(symbolCell);

      const priceCell = document.createElement("td");
      priceCell.innerText = `$${myData.market_data.current_price.usd}`;
      aRow.appendChild(priceCell);

      const percentCell = document.createElement("td");
      percentCell.innerText = `${(myData.market_data.price_change_percentage_24h_in_currency.usd * 100).toFixed(2)}%`;
      aRow.appendChild(percentCell);

      const athCell = document.createElement("td");
      athCell.innerText = `$${myData.market_data.ath.usd}`;
      aRow.appendChild(athCell);

      const marketCapCell = document.createElement("td");
      marketCapCell.innerText = `$${myData.market_data.market_cap.usd}`;
      aRow.appendChild(marketCapCell);
    });
}

fetchNewData();
fetchNewData2();