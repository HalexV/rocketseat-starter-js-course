/*
var minhaPromise = function() {
  return new Promise(function(resolve, reject) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/diego3g');
    xhr.send(null);


    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Erro na requisição');
        }
      }
    };
  });
}
*/ //Ao invés de tudo isso basta o de baixo.

axios.get('https://api.github.com/users/diego3g')
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.warn(error);
  })