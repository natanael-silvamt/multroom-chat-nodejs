module.exports.initChat = function(application, request, response) {
    var dataForm = request.body;
    request.assert('apelido', 'Nome ou Apelido é Obrigatório.').notEmpty();
    request.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres.').len(3, 15);
    var errors = request.validationErrors();

    if(errors){
        response.render("index", {validation : errors});
        return;
    }

    application.get('ioSocket').emit('messageForClient', {apelido : dataForm.apelido, message : 'acabou de entrar no chat'});

    response.render('chat', {dataForm : dataForm});
}