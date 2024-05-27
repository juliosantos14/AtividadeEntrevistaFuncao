var objeto = obj;
var beneficiario;

function verificaExistenciaBeneficiario() {

    if (beneficiario == undefined || beneficiario == "") {
        adicionarBeneficiario();
    } else {
        editarBeneficiario(beneficiario);
    }
}
function adicionarBeneficiario() {   

    var idCliente = obj.Id;
    var nome = $("#BeneficiarioNome").val();
    var cpf = $("#BeneficiarioCPF").val();

    $.ajax({
        url: urlPostBeneficiario,
        method: "POST",
        data: {
            "Nome": nome,
            "CPF": cpf,
            "IdCliente": idCliente,
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r);
                limparModal();
                setTimeout(function () {
                    listarPorClienteId();
                }, 1000);
            }
    });
}
function editarBeneficiario(Id) {
    var nome = $("#BeneficiarioNome").val();
    var cpf = $("#BeneficiarioCPF").val();

    $.ajax({
        url: urlAlterarBeneficiario,
        method: "POST",
        data: {
            "id": Id,
            "Nome": nome,
            "CPF": cpf,
            "IdCliente": obj.id,
        },success:
            function (r) {
                ModalDialog("Sucesso!", r);
                limparModal();
                setTimeout(function () { listarPorClienteId() });
            },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
       
    });
}
function listarPorClienteId() {
    
    var idCliente = obj.Id;

    $.ajax({
        url: '/Beneficiario/BeneficiarioList', 
        method: "POST",
        data: {
            idCliente: idCliente
        },
        success: function (response) {
            if (response.Result === "OK") {

                var beneficiarios = response.Records;
                var beneficiariosHtml = '';

                beneficiarios.forEach(function (beneficiario) {
                    beneficiariosHtml += '<tr>';
                    beneficiariosHtml += '<td>' + beneficiario.Nome + '</td>';
                    beneficiariosHtml += '<td>' + beneficiario.CPF + '</td>';
                    beneficiariosHtml += '<td>';
                    beneficiariosHtml += '<button type="button" class="btn btn-primary editar" onclick="getBeneficiarioPorClienteId(' + idCliente + ', ' + beneficiario.Id + ')">Editar</button>';
                    beneficiariosHtml += ' <button type="button" class="btn btn-danger excluir" onclick="excluirBeneficiario(' + beneficiario.Id + ')">Excluir</button>';
                    beneficiariosHtml += '</td>';
                    beneficiariosHtml += '</tr>';
                });

                $('#beneficiariosTable tbody').html(beneficiariosHtml);
            } else {
                ModalDialog("Ocorreu um erro", response.Message);
            }
        },
        error: function (r) {
            ModalDialog("Ocorreu um erro", "Não foi possível obter a lista de beneficiários.");
        }
    });
}
function getBeneficiarioPorClienteId(idCliente, idBeneficiario) {
    beneficiario = idBeneficiario;

    $.ajax({
        url: '/Beneficiario/GetBeneficiarioPorId',
        method: "POST",
        data: {
            idCliente: idCliente,
            idBeneficiario: idBeneficiario
        },
        success: function (response) {
            if (response.Result === "OK") {
                var beneficiario = response.Records;
                $("#BeneficiarioNome").val(beneficiario.Nome);
                $("#BeneficiarioCPF").val(beneficiario.CPF);
                $("#BeneficiarioId").val(beneficiario.Id);
                $("#addBeneficiario").text("Atualizar");
            } else {
                ModalDialog("Ocorreu um erro", response.Message);
            }
        },
        error: function (r) {
            ModalDialog("Ocorreu um erro", "Não foi possível obter a lista de beneficiários.");
        }
    });
}
function validaExistenciaCliente() {
    if (typeof objeto === 'undefined' || objeto === null || objeto <= 0) {
        ModalDialog("Erro", "Você precisa criar um cliente antes de adicionar um beneficiário.");
        return;
    } else {
        listarPorClienteId();
        document.getElementById("modalBeneficiario").id = "beneficiarioModal";

    }
}
function excluirBeneficiario(Id) {
    if (confirm("Você tem certeza que deseja excluir este beneficiário?")) {
        $.ajax({
            url: urlExcluirBeneficiario,
            method: "DELETE",
            data: {
                "id": Id
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r);
                    limparModal();

                    setTimeout(function () {
                        listarPorClienteId();
                    }, 1000);
                }
        });
    }
}
function limparModal() {
        $("#BeneficiarioNome").val("");
        $("#BeneficiarioCPF").val("");
        $("#BeneficiarioId").val("");
        $("#ClienteId").val("");
        $("#addBeneficiario").text("Incluir");
    }
function ModalDialog(titulo, texto) {
        var random = Math.random().toString().replace('.', '');
        var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
            '        <div class="modal-dialog">                                                                                 ' +
            '            <div class="modal-content">                                                                            ' +
            '                <div class="modal-header">                                                                         ' +
            '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
            '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
            '                </div>                                                                                             ' +
            '                <div class="modal-body">                                                                           ' +
            '                    <p>' + texto + '</p>                                                                           ' +
            '                </div>                                                                                             ' +
            '                <div class="modal-footer">                                                                         ' +
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
            '                                                                                                                   ' +
            '                </div>                                                                                             ' +
            '            </div><!-- /.modal-content -->                                                                         ' +
            '  </div><!-- /.modal-dialog -->                                                                                    ' +
            '</div> <!-- /.modal -->                                                                                        ';

        $('body').append(texto);
        $('#' + random).modal('show');
}
function FormatacaoCPF(input) {
    var cpf = input.value.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    input.value = cpf;
}

