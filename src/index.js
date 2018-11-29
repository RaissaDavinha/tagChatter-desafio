
(function(apiUrl) {
  let oldMessages = [];
  let messagesList = [];

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
        setInterval(() => {
            $.get(apiUrl + "/messages")
                .then(newMessages => {
                    if(newMessages.toString() != oldMessages.toString()){

                        oldMessages = [...newMessages];

                        let mailBox = document.getElementById("messages");

                        mailBox.innerHTML = "";
                        newMessages.forEach(message => {
                            messagesList.push(new classMessage(message));
                        });

                        mailBox.innerHTML = messagesList;
                        console.log(messagesList);
                    }
                });
        }, 3000);
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
      let idUser;
      let userName;
      let avatar;
      let element = document.getElementById('usurious');

      $.get(apiUrl + "/me")
          .then(res => {
                  idUser = res.id;
                  userName = res.name;
                  avatar = res.avatar;
                  console.log(avatar);
                  element.innerHTML = "<img src=" + res.avatar + ">";
              }
          );
  }

  function initialize() {
    fetchParrotsCount();
    listMessages();
    getMe();
  }

  initialize();
})("https://tagchatter.herokuapp.com");