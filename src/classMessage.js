
class classMessage{
    constructor(json){
        this.id = json.id; 
        this.content = json.content;
        this.created_at = new Date(json.created_at);  //transformo string iso8601 em objeto data
        this.has_parrot = json.has_parrot;
        this.id_author = json.author.id;
        this.name = json.author.name; 
        this.avatar = json.author.avatar;
    }

    toString() {
        return "<div class='container'>" +
                    "<img src='"+ this.avatar +"' class='avatar'>" +
                    "<div class='name'>" +
                        this.name +
                    "</div>" +
                    "<div class='date'>" +
                        "<img class='dot' src='images/message_header_separator.png'>" +
                        this.created_at.getHours() + ":" + this.created_at.getMinutes() +
                        "<img class='dot' src='images/message_header_separator.png'>" +
                    "</div>" +
                        "<img id='parrot' onclick='parrotMessage(" + "this.id" + ");' src='images/light-parrot.svg' class='parrot'>" +
                    "<div class='message'>" +
                        this.content +
                    "</div>" +
                "</div></br>";
    }
}