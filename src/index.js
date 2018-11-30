
(function(apiUrl) {
  let oldMessages = [];
  let messagesList = [];
  let idUser;
  let userName;

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
                            messagesList.push(ClassMessage(message));
                        });

                        mailBox.innerHTML = messagesList;
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
          $.put(apiUrl + "/messages/" + messageId + "/parrot")
              .then(
                  fetchParrotsCount()
              );
      } else {
        console.log("Parrot já marcado");
      }
  }

  function sendMessage(authorId) {
    // Manda a mensagem para a API quando o usuário envia a mensagem
    // Caso o request falhe exibe uma mensagem para o usuário utilizando Window.alert ou outro componente visual
    // Se o request for bem sucedido, atualiza o conteúdo da lista de mensagens
      var message = document.getElementById('inputtext').value;
      $.put(apiUrl + "/messages", {body: JSON.stringify({ message: message, author_id: authorId })})
          .then(res => {
              if(res.ok){
                console.log("Mensagem enviada");
              } else {
                  console.log("Mensagem não enviada, erro");
              }
          })
  }

  function getMe() {
    // Faz um request para pegar os dados do usuário atual
    // Exibe a foto do usuário atual na tela e armazena o seu ID para quando ele enviar uma mensagem

      $.get(apiUrl + "/me")
          //.then(function(response) { return response.json(); })
          .then(res => {
                  idUser = res.id;
                  userName = res.name;
                  document.querySelector('#usurious').src = res.avatar;
                  //window.sessionStorage.setItem("userId", user.id);
              }
          );
  }

    /**
     * @return {string}
     */
    function ClassMessage(json){
        created_at = new Date(json.created_at);  //transformo string iso8601 em objeto data
        this.has_parrot = json.has_parrot;
        this.id_author = json.author.id;

        return "<div class='container'>" +
            "<img src='"+ json.author.avatar +"' class='avatar'>" +
            "<div class='name'>" +
            json.author.name +
            "</div>" +
            "<div class='date'>" +
            "<img class='dot' src='images/message_header_separator.png'>" +
            time(this.created_at.getHours(), this.created_at.getMinutes())+
            "<img class='dot' src='images/message_header_separator.png'>" +
            "</div>" +
            "<img id=parrotonclick src='images/light-parrot.svg' class='parrot'>" +
            "<div class='message'>" +
            json.content +
            "</div>" +
            "</div></br>";
    }

    //alterar formado da hora
    function time(hours, minutes) {
        let time;

        if (hours < 10){
            time = '0' + hours;
        } else {
            time = hours;
        }
        time += ':';
        if (minutes < 10) {
            time += '0' + minutes;
        } else {
            time += minutes;
        }
        return time;
    }

    function callbuttons() {
        var linkenviar = document.getElementById('enviar');
        linkenviar.onclick = sendMessage(idUser);
    }
    
  function initialize() {
    fetchParrotsCount();
    listMessages();
    getMe();
    callbuttons();
  }

  initialize();
})("https://tagchatter.herokuapp.com");