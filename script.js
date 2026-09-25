document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // DADOS
    // ==============================

    const dateData = {
        resposta: "",
        data: "",
        horario: "",
        local: "",
        jantar: "",
        sobremesa: ""
    };


    // ==============================
    // ELEMENTOS
    // ==============================

    const screens = document.querySelectorAll(".screen");

    const progressSteps = document.querySelectorAll(".step");

    const yesButton = document.getElementById("yesButton");

    const noButton = document.getElementById("noButton");

    const dateButton = document.getElementById("dateButton");

    const localButton = document.getElementById("localButton");

    const jantarButton = document.getElementById("jantarButton");

    const finishButton = document.getElementById("finishButton");

    const dateInput = document.getElementById("dateInput");

    const timeInput = document.getElementById("timeInput");

    const options = document.querySelectorAll(".option");

    const emailForm = document.getElementById("emailForm");


    // ==============================
    // TROCAR TELA
    // ==============================

    function showScreen(number) {

        screens.forEach(function (screen) {
            screen.classList.remove("active");
        });

        const selectedScreen = document.getElementById("screen" + number);

        if (selectedScreen) {
            selectedScreen.classList.add("active");
        }

        progressSteps.forEach(function (step) {

            const stepNumber = Number(
                step.getAttribute("data-step")
            );

            if (stepNumber <= number) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==============================
    // BOTÃO SIM
    // ==============================

    yesButton.addEventListener("click", function () {

        dateData.resposta = "SIM ❤️";

        showScreen(2);

    });


    // ==============================
    // BOTÃO NÃO
    // ==============================

    function fugirDoNao() {

        const maxX = window.innerWidth - noButton.offsetWidth - 20;

        const maxY = window.innerHeight - noButton.offsetHeight - 20;

        const x = Math.max(
            10,
            Math.random() * maxX
        );

        const y = Math.max(
            10,
            Math.random() * maxY
        );

        noButton.style.position = "fixed";

        noButton.style.left = x + "px";

        noButton.style.top = y + "px";

        noButton.style.zIndex = "9999";
    }


    noButton.addEventListener("mouseenter", fugirDoNao);

    noButton.addEventListener("touchstart", function (event) {

        event.preventDefault();

        fugirDoNao();

    });


    noButton.addEventListener("click", function (event) {

        event.preventDefault();

        fugirDoNao();

    });


    // ==============================
    // DATA E HORÁRIO
    // ==============================

    dateButton.addEventListener("click", function () {

        const data = dateInput.value;

        const horario = timeInput.value;


        if (!data) {

            alert("Escolha uma data ❤️");

            return;
        }


        if (!horario) {

            alert("Escolha um horário ⏰");

            return;
        }


        // Verificar se a data/horário já passou

        const selecionado = new Date(
            data + "T" + horario
        );

        const agora = new Date();


        if (selecionado < agora) {

            alert("Escolha uma data e horário futuros ❤️");

            return;
        }


        // Salvar

        dateData.data = data;

        dateData.horario = horario;


        showScreen(3);

    });


    // ==============================
    // SELEÇÃO DAS OPÇÕES
    // ==============================

    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const category = option.dataset.category;

            const value = option.dataset.value;


            // Remover seleção das opções
            // da mesma categoria

            options.forEach(function (otherOption) {

                if (
                    otherOption.dataset.category === category
                ) {

                    otherOption.classList.remove("selected");

                }

            });


            // Selecionar

            option.classList.add("selected");


            // Salvar

            dateData[category] = value;

        });

    });


    // ==============================
    // LOCAL
    // ==============================

    localButton.addEventListener("click", function () {

        if (!dateData.local) {

            alert("Escolha um local ❤️");

            return;
        }

        showScreen(4);

    });


    // ==============================
    // JANTAR
    // ==============================

    jantarButton.addEventListener("click", function () {

        if (!dateData.jantar) {

            alert("Escolha o jantar 🍽️");

            return;
        }

        showScreen(5);

    });


    // ==============================
    // FINALIZAR
    // ==============================

    finishButton.addEventListener("click", function () {

        if (!dateData.sobremesa) {

            alert("Escolha uma sobremesa 🍰");

            return;
        }


        // ==========================
        // FORMATAR DATA
        // ==========================

        const dataFormatada =
            new Date(
                dateData.data + "T12:00:00"
            ).toLocaleDateString(
                "pt-BR"
            );


        // ==========================
        // MOSTRAR RESUMO
        // ==========================

        document.getElementById("finalDate").textContent =
            dataFormatada;

        document.getElementById("finalTime").textContent =
            dateData.horario;

        document.getElementById("finalLocal").textContent =
            dateData.local;

        document.getElementById("finalJantar").textContent =
            dateData.jantar;

        document.getElementById("finalSobremesa").textContent =
            dateData.sobremesa;


        // ==========================
        // PREENCHER FORMULÁRIO
        // ==========================

        document.getElementById("emailResposta").value =
            dateData.resposta;

        document.getElementById("emailData").value =
            dataFormatada;

        document.getElementById("emailHorario").value =
            dateData.horario;

        document.getElementById("emailLocal").value =
            dateData.local;

        document.getElementById("emailJantar").value =
            dateData.jantar;

        document.getElementById("emailSobremesa").value =
            dateData.sobremesa;


        // ==========================
        // ENVIAR EMAIL
        // ==========================

        emailForm.submit();


        // ==========================
        // MOSTRAR FINAL
        // ==========================

        screens.forEach(function (screen) {
            screen.classList.remove("active");
        });

        document
            .getElementById("finalScreen")
            .classList.add("active");


        document
            .getElementById("progress")
            .style.display = "none";


        criarCoracoes();

    });


    // ==============================
    // CORAÇÕES
    // ==============================

    function criarCoracoes() {

        const container =
            document.querySelector(".hearts");


        for (let i = 0; i < 30; i++) {

            const heart =
                document.createElement("div");

            heart.className = "floating-heart";

            heart.textContent = "❤️";

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.fontSize =
                (12 + Math.random() * 20) + "px";

            heart.style.animationDuration =
                (4 + Math.random() * 5) + "s";

            heart.style.animationDelay =
                Math.random() * 3 + "s";

            container.appendChild(heart);

        }

    }


    // ==============================
    // CORAÇÕES DE FUNDO
    // ==============================

    setInterval(function () {

        const container =
            document.querySelector(".hearts");

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.textContent = "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (12 + Math.random() * 15) + "px";

        heart.style.animationDuration =
            (6 + Math.random() * 4) + "s";

        container.appendChild(heart);


        setTimeout(function () {

            heart.remove();

        }, 10000);

    }, 1200);

});