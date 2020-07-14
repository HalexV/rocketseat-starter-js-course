var usuarios = [
  {
  nome: "Diego",
  habilidades: ["Javascript", "ReactJS", "Redux"]
  },
  {
  nome: "Gabriel",
  habilidades: ["VueJS", "Ruby on Rails", "Elixir"]
  }
 ];

 function usersInfo(users){
   for (let user of users) {
    console.log(`O ${user.nome} possui as habilidades: ${user.habilidades.join(', ')}.`);
   }
 }

 usersInfo(usuarios);