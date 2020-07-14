var loadingSetIntervalId; //Global id of the loading's set interval.

//The loading "animation" has three stages: start, running, end/finish.
//Every stage has its own function.

function runnerLoading () {
  var liElement = document.querySelector('ul#loading li');
  var loadingStage = liElement.getAttribute('id');

  if (loadingStage == 0) {
    liElement.innerHTML = 'Loading.';
    liElement.setAttribute('id', '1');
  } else if (loadingStage == 1) {
    liElement.innerHTML = 'Loading..';
    liElement.setAttribute('id', '2');
  } else if (loadingStage == 2) {
    liElement.innerHTML = 'Loading...';
    liElement.setAttribute('id', '3');
  } else {
    liElement.innerHTML = 'Loading';
    liElement.setAttribute('id', '0');
  }

}


function starterLoading () {
  var uListElement = document.createElement('ul');
  var liElement = document.createElement('li');

  liElement.innerHTML = 'Loading';
  liElement.setAttribute('id', '0');

  uListElement.setAttribute('id', 'loading');
  uListElement.appendChild(liElement);


  document.body.appendChild(uListElement);

  loadingSetIntervalId = setInterval(runnerLoading, 1000);

}

function finisherLoading () {
  clearInterval(loadingSetIntervalId);

  var uListElement = document.querySelector('#loading');

  document.body.removeChild(uListElement);


}


function search() {
  starterLoading();
  var inputElement = document.querySelector('input');

  var githubUser = inputElement.value;
  inputElement.value = '';

  var apiLink = `https://api.github.com/users/${githubUser}/repos`;

  var reposList = document.querySelector('ul#repos');
  
  if(reposList !== null){
    document.body.removeChild(reposList);
  }

  axios.get(apiLink)
    .then(function(response){
      finisherLoading();
      
      //console.log(response);
      var uListElement = document.createElement('ul');
      uListElement.setAttribute('id', 'repos');

      var liElement;
      var linkElement;
      var textElement;

      //Repo = repository
      for (var repo of response.data) {
        //console.log(repo.name);
        //console.log(repo.html_url);
        //console.log(repo.description);

        liElement = document.createElement('li');

        linkElement = document.createElement('a');

        textElement = document.createTextNode(repo.name);

        linkElement.setAttribute('href', repo.html_url);
        linkElement.setAttribute('target', '_blank');

        //Se não houver descrição do repositório, uma title padrão é adicionada.
        if (repo.description === null || repo.description === ''){
          linkElement.setAttribute('title', 'No description');
        } else {

          linkElement.setAttribute('title', repo.description);
        }


        linkElement.appendChild(textElement);
        liElement.appendChild(linkElement);
        uListElement.appendChild(liElement);
      }

      document.body.appendChild(uListElement);

    })
    .catch(function(error){
      finisherLoading();
      console.log(error);

      alert('Github User or repositories not found');
    });

}