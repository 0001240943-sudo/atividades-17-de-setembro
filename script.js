document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("quizForm");

    const respostasCorretas = {
        p1: "C",
        p2: "B",
        p3: "D",
        p4: "C",
        p5: "C",
        p6: "B",
        p7: "A",
        p8: "A",
        p9: "C",
        p10: "B"
    };


    formulario.addEventListener("submit", function (evento) {

        // Impede o formulário de recarregar a página
        evento.preventDefault();


        // =====================================================
        // DADOS DO USUÁRIO
        // =====================================================

        const nome = document.getElementById("inputNome").value.trim();
        const data = document.getElementById("inputData").value;


        // Verifica o nome
        if (nome === "") {
            alert("Por favor, digite seu nome.");
            document.getElementById("inputNome").focus();
            return;
        }


        // Verifica a data
        if (data === "") {
            alert("Por favor, informe a data.");
            document.getElementById("inputData").focus();
            return;
        }


        // =====================================================
        // CORREÇÃO DAS QUESTÕES
        // =====================================================

        let acertos = 0;
        let resultado = "";


        for (let i = 1; i <= 10; i++) {

            const respostaSelecionada = document.querySelector(
                'input[name="p' + i + '"]:checked'
            );


            // Caso alguma pergunta não tenha sido respondida
            if (!respostaSelecionada) {
                alert("Por favor, responda todas as perguntas.");
                return;
            }


            const resposta = respostaSelecionada.value;
            const correta = respostasCorretas["p" + i];


            if (resposta === correta) {

                acertos++;

                resultado +=
                    "Pergunta " + i + ": CORRETA\n" +
                    "Resposta marcada: " + resposta + "\n" +
                    "Resposta correta: " + correta + "\n\n";

            } else {

                resultado +=
                    "Pergunta " + i + ": INCORRETA\n" +
                    "Resposta marcada: " + resposta + "\n" +
                    "Resposta correta: " + correta + "\n\n";
            }
        }


        // =====================================================
        // CALCULA A NOTA
        // =====================================================

        const totalQuestoes = 10;

        const porcentagem = (acertos / totalQuestoes) * 100;


        // =====================================================
        // MONTA O DOCUMENTO DE TEXTO
        // =====================================================

        const textoResultado =
`QUESTIONÁRIO SOBRE HTML, CSS E JAVASCRIPT
============================================

Nome: ${nome}
Data: ${data}

Resultado
============================================

Acertos: ${acertos} de ${totalQuestoes}
Porcentagem: ${porcentagem}%

============================================

${resultado}
============================================
Questionário realizado por ${nome}.
©Estevão. 2026. Todos os direitos reservados.
`;


        // =====================================================
        // CRIA O ARQUIVO TXT
        // =====================================================

        const arquivo = new Blob(
            [textoResultado],
            { type: "text/plain;charset=utf-8" }
        );


        // Cria um endereço temporário para o arquivo
        const url = URL.createObjectURL(arquivo);


        // Cria um link temporário
        const link = document.createElement("a");

        link.href = url;

        link.download =
            "Questionario_" +
            nome.replace(/\s+/g, "_") +
            ".txt";


        // Adiciona o link temporariamente à página
        document.body.appendChild(link);


        // Inicia o download
        link.click();


        // Remove o link
        document.body.removeChild(link);


        // Libera a memória
        URL.revokeObjectURL(url);


        // =====================================================
        // MENSAGEM FINAL
        // =====================================================

        alert(
            "Questionário enviado com sucesso!\n\n" +
            "Nome: " + nome + "\n" +
            "Acertos: " + acertos + " de " + totalQuestoes + "\n" +
            "Resultado: " + porcentagem + "%"
        );

    });

});