class classMessage{
    constructor(json){
        this.id = json.id; 
        this.content = json.content;
        this.created_at = json.created_at;
        this.has_parrot = json.has_parrot;
        this.id_author = json.author.id;
        this.name = json.author.name; 
        this.avatar = json.author.avatar;
    }

    toString() {
        return "nome: " + this.name + "</br>" +
                "conteúdo: " + this.content + "</br>";
    }
}