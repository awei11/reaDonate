

function content() {
	// chrome.tabs.executeScript(null, { file: "content.js" });

  /*global chrome*/
    chrome.tabs.executeScript(null, {
      code: "document.body.innerText"
    }, receiveText);

  function receiveText(resultsArray) {
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
        alert("Found the Perfect Match !");
        return data.json();
      })
      .then(res => {
          let urlcontent = res[0].split('//')[1];
          let arr = urlcontent.split('/');
          document.getElementById('title').innerText = arr[0].split('.')[1] +"."+ arr[0].split('.')[2];
          document.getElementById('organization').innerText = arr[arr.length-1];


          document.getElementById('clickAnalyze').addEventListener('click', function(){
            chrome.tabs.update({url: res[0] });
          });


      })
      .catch(error => console.error('Error:', error));



  }


function newPage(){

}




}
document.getElementById('clickLoad').addEventListener('click', content);
