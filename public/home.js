function homeClick() {


  chrome.tabs.executeScript(null, {
    code: "document.body.innerText"
  }, receiveText);

}

function receiveText(resultsArray) {
  alert(resultsArray[0]);
  let content = resultsArray[0];
  //"wildfire, black, women"

  // send info to api, get a url back.
  const api_url = 'https://us-central1-smooth-brains-mask-evaluation.cloudfunctions.net/donationLink';
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify({text:content}),
    headers:{
      'Content-Type': 'application/json'
    } })
    .then(data => {
      alert(data[0]);
      return data.json();
    })
    .then(res => {
        alert(res[0]);
      chrome.tabs.update({
        url: res[0]
      });
    })
    .catch(error => console.error('Error:', error));




  // update
  // chrome.tabs.update({
  //   url: "https://mail.google.com/mail/u/0/#inbox"
  // });
}

document.getElementById('clickAnalyze').addEventListener('click', homeClick);
