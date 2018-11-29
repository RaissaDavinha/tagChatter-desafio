          /*criar classe mensagem
          /*passar json[i] como parametro para converter
          /*vetor de classe mensagem 
          /*apresentar vetor na tela em formato caixas de texto*/

(function(apiUrl) {
  function fetchParrotsCount() {
    return fetch(apiUrl + "/messages/parrots-count")
      .then(function(response) {
        return response.json();
      })
      .then(function(count) {
        document.getElementById("parrots-counter").innerHTML = count;
      });
  }

  function listMessages() {
      $.get(apiUrl + "/messages")
          .then(res => {      //json com 200 mensagens, mudar para objeto
              obj = new classMessage(res[0]);
              document.getElementById("messages").innerHTML += obj;
              obj = new classMessage(res[2]);
              document.getElementById("messages").innerHTML += obj;
              obj = new classMessage(res[3]);
              document.getElementById("messages").innerHTML += obj;
              }
          )
    // Faz um request para a API de listagem de mensagens
    // Atualiza a o conteúdo da lista de mensagens
    // Deve ser chamado a cada 3 segundos
   /* setInterval( _ => {
        $.get(apiUrl + "/messages")
          .then(res => {      //json com 200 mensagens, mudar para objeto
            obj = new classMessage(res[0]);
            document.getElementById("messages").innerHTML += obj;
          }
        )
    }, 3000); */

  }

  function parrotMessage(messageId) {
    // Faz um request para marcar a mensagem como parrot no servidor
    // Altera a mensagem na lista para que ela apareça como parrot na interface
      element = document.getElementById('parrot');
      if (element.src.match('light')) {
          element.src = 'images/parrot.gif';
          $.put(apiUrl + "/messages/" + messageId + "/parrot");
      } else {
        console.log("Erro ao marcar parrot");
      }

  }

  function sendMessage(message, authorId) {
    // Manda a mensagem para a API quando o usuário envia a mensagem
    // Caso o request falhe exibe uma mensagem para o usuário utilizando Window.alert ou outro componente visual
    // Se o request for bem sucedido, atualiza o conteúdo da lista de mensagens
  }

  function getMe() {
    // Faz um request para pegar os dados do usuário atual
    // Exibe a foto do usuário atual na tela e armazena o seu ID para quando ele enviar uma mensagem
  }

  function initialize() {
    fetchParrotsCount();
    listMessages();
  }

  initialize();
})("https://tagchatter.herokuapp.com");