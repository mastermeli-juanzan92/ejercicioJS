


document.addEventListener("DOMContentLoaded", function (event) {


    const app1 = document.getElementById('root');
    var categoryID = null;

    const mainHeadder = document.createElement('h1');
    mainHeadder.textContent = "Buscador de Trends";

    const form = document.createElement('form');
    form.setAttribute('class', 'form');
    form.setAttribute('id', 'formTrends');
    form.action = "GET";
    form.action = "/trends";





    const sites = document.createElement('select');
    sites.setAttribute('class', 'form-control');
    sites.name="siteID";
    sites.onchange = () => loadCategories(sites.value);

    const categoriesSelector = document.createElement('select');
    categoriesSelector.setAttribute('class', 'form-control');
    categoriesSelector.name = "category";

    const resultSelector = document.createElement('select');
    resultSelector.setAttribute('class', 'form-control');
    resultSelector.name = "option";

    const option1 = document.createElement('option');
    option1.textContent = "Nombre";
    option1.value = "nombre";
    const option2 = document.createElement('option');
    option2.textContent = "Imagen";
    option2.value = "imagen";


    const rows = document.createElement('input');
    rows.name="rows";
    rows.className = "form-control";
    rows.placeholder = "Ingrese cant filas";
    rows.max = '5';
    rows.min = '0';
    rows.required = true;
    const column = document.createElement('input');
    column.name="columns";
    column.className = "form-control";
    column.placeholder = "Ingrese cant columnas";
    column.max = '5';
    column.min = '0';
    column.required = true;


    const formContainer = document.createElement('div');
    formContainer.setAttribute('class', 'form-group input-group text-center');

    const formContainer2 = document.createElement('div');
    formContainer2.setAttribute('class', 'form-group input-group text-center');

    const formContainer3 = document.createElement('div');
    formContainer3.setAttribute('class', 'form-group input-group text-center');
    formContainer3.name ="filascol";


    const formContainer4 = document.createElement('div');
    formContainer4.setAttribute('class', 'form-group input-group text-center');

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('class', "btn btn-primary btn-lg ");
    submitBtn.setAttribute('type', 'submit');
    submitBtn.name = "submitbtn"
    submitBtn.textContent = "Buscar";

    const subheadder = document.createElement('label');
    subheadder.textContent = "Elegir Pais";
    subheadder.setAttribute('for', "siteID");
    const subheadder2 = document.createElement('label');
    subheadder2.textContent = "Elegir Categoria";
    subheadder2.setAttribute('for', "category");
    const subheadder3 = document.createElement('label');
    subheadder3.textContent = "Elegir Ingrese numero de filas y columnas";
    subheadder3.setAttribute('for',"filascol");
    const subheadder4 = document.createElement('label');
    subheadder4.textContent = "Elegir que mostrar ";
    subheadder4.setAttribute('for' , "submitbtn") ;

    app1.appendChild(mainHeadder);
    app1.appendChild(form);

    form.appendChild(formContainer);
    formContainer.appendChild(subheadder);
    formContainer.appendChild(sites);

    form.appendChild(formContainer2);
    formContainer2.appendChild(subheadder2);
    formContainer2.appendChild(categoriesSelector);

    form.appendChild(formContainer4);
    formContainer4.appendChild(subheadder3);
    formContainer4.appendChild(rows);
    formContainer4.appendChild(column);


    form.appendChild(formContainer3);
    formContainer3.appendChild(subheadder4);
    formContainer3.appendChild(resultSelector);
    resultSelector.appendChild(option1);
    resultSelector.appendChild(option2);


    form.appendChild(submitBtn);


    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.mercadolibre.com/sites', true);

    request.onload = function () {


        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(site => {
                const option = document.createElement('option');
                option.value = site.id;
                option.textContent = site.name;
                sites.appendChild(option);

            });


        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "No funciona!";
            app1.appendChild(errorMessage);
        }
    };
    request.send();


    function loadCategories(siteID) {
        categoriesSelector.innerText = "";
        var request = new XMLHttpRequest();
        request.open('GET', 'https://api.mercadolibre.com/sites/' + siteID + '/categories', true);
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                data.forEach(category => {
                    var option = document.createElement('option');
                    option.setAttribute('value', category.id);
                    option.textContent = category.name;

                    categoriesSelector.appendChild(option);

                });
            } else {
                const errorMessage = document.createElement('marquee');
                errorMessage.textContent = "No funciona!";
                app1.appendChild(errorMessage);
            }
        };
        request.send();
    }

});