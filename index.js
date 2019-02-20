$( document ).ready(function() {
    startClock();
});

function resetClock() {
    stopClock();
    startClock();
}

function startClock() {
    var interval = Number(opt_clock_interval.value) * 1000;
    $(btn_play_clock).hide();
    $(btn_stop_clock).show();
    clock.parentNode.className = "btn btn-success";
    updateClock();

    timer = setInterval(function() {
        updateClock();
    }, interval);
}

function updateClock() {
    now = new Date();
    clock.innerHTML = now.toLocaleString();
    loadData();
}

function stopClock() {
    for (var x = 0; x <= timer; ++x) {
        clearTimeout(x);
    }

    timer = 0;
    clock.parentNode.className = "btn btn-danger";
    $(btn_play_clock).show();
    $(btn_stop_clock).hide();
}

function loadData() {
    $.getJSON("index.json", function(data, status) {
        if (status == "success") {
            renderForm(data);
        } else {
            alert("Error al cargar informacion, Estado : " + status);
            renderForm(null);
        }
    });
}

function renderForm(data) {
    if (data) {
        var ul, li;

        if (data.mysql_status == "OK") {
            mysqld_panel.className = "panel panel-success";
        } else {
            mysqld_panel.className = "panel panel-danger";
        }

        mysqld_panel_body.innerHTML = "";

        ul = document.createElement("ul");

        li = document.createElement("li");
        li.innerHTML = "<b>Estado</b>: " + data.mysql_status;
        ul.appendChild(li);

        li = document.createElement("li");
        li.innerHTML = "<b>Último Analisis</b>: " + data.last_task_execution + " (Hora del servidor)";
        ul.appendChild(li);

        li = document.createElement("li");
        li.innerHTML = "<b>PATH</b>: " + data.sys_path;
        ul.appendChild(li);

        mysqld_panel_body.appendChild(ul);
    } else {
        mysqld_panel.className = "panel panel-danger";
        stopClock();
    }
}