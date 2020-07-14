
function search() {
  var inputElement = document.querySelector('input');

  var githubUser = inputElement.value;
  inputElement.value = '';

  var apiLink = `https://api.github.com/users/${githubUser}/repos`;

  var reposList = document.querySelector('ul');
  
  if(reposList !== null){
    document.body.removeChild(reposList);
  }

  axios.get(apiLink)
    .then(function(response){
      //console.log(response);
      var uListElement = document.createElement('ul');

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
      console.log(error);

      alert('Github User or repositories not found');
    });

}