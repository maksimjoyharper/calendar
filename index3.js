let form = document.getElementById("formDate");

form.addEventListener("submit", (element) => {
  element.preventDefault();

  let formData = new FormData(form);
  let year = formData.get("year");
  let month = formData.get("month");

  let a = Number(year);
  let b = Number(month);

  function calendar(element, year, month) {
    element = document.querySelector(element);

    let mon = month - 1;
    let d = new Date(year, mon);

    function sunday(date) {
      let day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    }

    let table = `
  <table>
  <tr>
  <th>Пн</th>
  <th>Вт</th>
  <th>Ср</th>
  <th>Чт</th>
  <th>Пт</th>
  <th>Сб</th>
  <th>Вс</th>
  </tr>
  <tr>
  `;

    for (let i = 0; i < sunday(d); i++) {
      table += "<td></td>";
    }

    while (d.getMonth() == mon) {
      table += "<td class='arr'>" + d.getDate() + "</td>";

      if (sunday(d) % 7 == 6) {
        table += "</tr ><tr>";
      }
      let a = d.getDate();
      d.setDate(a + 1);
    }

    if ((i = sunday(d) != 0)) {
      for (let i = sunday(d); i < 7; i++) {
        table += "<td></td>";
      }
    }

    table += "</tr></table>";
    element.innerHTML = table;

    let allDays = document.querySelectorAll(".arr");
    allDays.forEach((element) => {
      let saveEvent = "";
      element.addEventListener("click", function () {
        element.classList.add("dayActive");
        let event = `<div class="event-box">
        <p>События</p>
        <input id="event-enter" type="text" placeholder="Запишите событие">
        <span class="event-span"></span>
        <button id="btnClose">Закрыть</button>
        <div class="btn-box">
            <button id="save">Save</button>
            <button id="delete">Delete</button>
        </div>
        </div>`;

        let s = document.getElementById("content-event");
        s.innerHTML = event;

        let eventEnter = document.getElementById("event-enter");
        let btnSave = document.getElementById("save");
        let btnDelete = document.getElementById("delete");
        let eventText = document.querySelector(".event-span");
        eventText.innerHTML = saveEvent;
        btnSave.addEventListener("click", function () {
          let event = eventEnter.value;
          eventText.innerHTML = eventText.textContent + event;
          saveEvent = eventText.textContent;
        });
        btnDelete.addEventListener("click", function () {
          eventText.innerHTML = null;
          eventEnter.value = null;
          saveEvent = "";
        });
        let btnClose = document.getElementById("btnClose");
        btnClose.addEventListener("click", function () {
          element.classList.remove("dayActive");
          s.innerHTML = null;
          element.classList.add("dayEvent");
          if (eventText.innerHTML === "") {
            element.classList.remove("dayEvent");
          } else {
            element.classList.add("event");
          }
        });
      });
    });
  }

  calendar("section", a, b);
});
