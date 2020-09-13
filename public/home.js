

function homeClick() {

	document.getElementById("clickDonate").href = "https://mail.google.com/mail/u/0/#inbox";
  alert('executed');


    // get all text
    var allText = document.body.innerText;
    console.log(allText);
    // send info to api, get a url back.
    const api_url = 'CLOUD_FUNCTION_URL';
    fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(allText),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // convert json to JS object
      .then(data => {
        return data.json()
      })
      .then(res => {
        document.getElementById("clickDonate").href = res.url;
      })
      .catch(error => console.error('Error:', error));

}

document.getElementById('clickAnalyze').addEventListener('click', homeClick);
