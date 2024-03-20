document.getElementById("loadButton").addEventListener("click", loadData);

function loadData() {
  const apiKey = "AIzaSyCSssID8r9CL1ImC5Ey14KaL8yE5N0nu2k";
  const sheetId = "430557343";
  const range = "A5:A33";
  
  axios
    .post("https://sheets.googleapis.com/v4/spreadsheets/" + sheetId + "/values/" + range + ":append?valueInputOption=RAW&access_token=" + apiKey)
    .then((response) => {
      document.getElementById("output").textContent = JSON.stringify(response.data.values, null, 2);
    })
    .catch((error) => {
      console.log(error);
    });
}