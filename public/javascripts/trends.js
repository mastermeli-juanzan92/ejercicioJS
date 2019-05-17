document.addEventListener("DOMContentLoaded", function (event) {

    // const GoogleImages = require("google-images");
    //const client = new GoogleImages('009186683215298680698:roeme_ofjq8', 'AIzaSyBdxE_XnZ6veHVIcgbRT6rSfghsLwUJrfI');
    const container = document.body;

    const grid = document.createElement('grid');
    grid.style = "overflow: hidden; max";
    container.appendChild(grid);

    //atrapo el objeto json de la vista
    var div = document.getElementById('catcher');
    var catcher = div.getAttribute('class');
    // lo paso nuevamente a json para trabajarlo comodamente
    catcher = JSON.parse(catcher);

    console.log(catcher);


    var trends = ['cargando...'];


    console.log(trends);

    if (catcher.option === "nombre") {

        fetch('https://api.mercadolibre.com/trends/' + catcher.site + "/" + catcher.category)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (myJson) {
                trends = myJson.map(function (i) {
                    return i.keyword;
                })
            });
// slide options
        var slideEase = function (t) {
                return t * t * t;
            },
            slideDuration = 1000;

// text options
        var delay = {
            before: 300,
            between: 200,
            after: 2500
        };

// trends snapshot (can't think of a JS only way to load these dynamically)

        function randomTrend() {
            return trends[Math.floor(trends.length * Math.random())];
        }

// colors
        var colors = ['#ff3231', '#68ac0d', '#00a8da', '#fbc500'];

        function randomColor() {
            return colors[Math.floor(colors.length * Math.random())];
        }

        var Cell = function (x, y) {
            // create the node
            var node = document.createElement('div');
            node.className = 'cell';
            var width = 100 / catcher.columns;
            var heigth = 100 / catcher.rows;

            node.style.width = width + '%';
            node.style.height = heigth + '%';

            node.style.left = x * width + '%';
            node.style.top = y * heigth + '%';
            this.node = node;

            // create and add the panes
            var panes = [new Pane(this), new Pane(this)];
            node.appendChild(panes[0].node);
            node.appendChild(panes[1].node);
            panes[0].setOtherNode(panes[1].node);
            panes[1].setOtherNode(panes[0].node);

            // handles sliding in next pane
            var currentPane = 0;
            this.nextPane = function () {
                // swap z-indexes
                panes[currentPane].node.style.zIndex = '-1';
                currentPane = ++currentPane % 2;
                panes[currentPane].node.style.zIndex = '1';

                panes[currentPane].init();
            };

            // quickstart
            panes[0].quickStart();
            panes[0].node.style.zIndex = '1';
        };

        var Pane = function (cell) {
            var otherNode;
            this.setOtherNode = function (other) {
                otherNode = other;
            };

            // create the node
            var node = document.createElement('div');
            node.className = 'pane';
            this.node = node;

            // a place to write the trends
            var trend = document.createElement('a');
            trend.className = 'trend';
            node.appendChild(trend);

            // (re-)initialize pane when sliding in
            this.init = function () {
                var dir = Math.floor(4 * Math.random());
                switch (dir) {
                    case 0:
                        slideStart = {left: 0, top: -100};
                        break;
                    case 1:
                        slideStart = {left: 100, top: 0};
                        break;
                    case 2:
                        slideStart = {left: 0, top: 100};
                        break;
                    case 3:
                        slideStart = {left: -100, top: 0};
                        break;
                }
                // make sure it's a different background color
                do
                    node.style.backgroundColor = randomColor();
                while (node.style.backgroundColor == otherNode.style.backgroundColor);

                trend.title = randomTrend();
                trend.href = 'https://www.google.com/search?q=' + trend.title;
                trend.innerHTML = '';

                // start sliding in
                slideValue = 0;
                slideIn();
            };

            // handles sliding in
            var slideStart,
                slideValue;
            var slideIn = function () {
                slideValue += 20 / slideDuration;
                if (slideValue >= 1) {
                    // end of sliding in
                    slideValue = 1;
                    setTimeout(nextChar, delay.before);
                } else {
                    setTimeout(slideIn, 20);
                }
                node.style.left = slideEase(1 - slideValue) * slideStart.left + '%';
                node.style.top = slideEase(1 - slideValue) * slideStart.top + '%';
                // push other node away
                otherNode.style.left =
                    (slideEase(1 - slideValue) - 1) * slideStart.left + '%';
                otherNode.style.top =
                    (slideEase(1 - slideValue) - 1) * slideStart.top + '%';
            };

            // handles text
            var nextChar = function () {
                if (trend.innerHTML.length < trend.title.length) {
                    trend.innerHTML =
                        trend.title.slice(0, trend.innerHTML.length + 1);
                    setTimeout(nextChar, delay.between);
                } else {
                    setTimeout(cell.nextPane, delay.after);
                }
            };

            // initial start
            this.quickStart = function () {
                node.style.backgroundColor = colors[3];
                trend.title = randomTrend();
                trend.href = 'https://www.google.com/search?q=' + trend.title;
                nextChar();
            }
        };

// create the cells
        var cells = [];
        for (var i = 0; i < (catcher.rows * catcher.columns); i++) {
            cells[i] = new Cell(i % catcher.columns, Math.floor(i / catcher.columns));
            container.appendChild(cells[i].node);
        }

// handles font size on resize
// quick and dirty, needs a fix
        function calcFontsize() {
            var fontSize = Math.min(
                container.clientHeight / 18,
                container.clientWidth / 46
            );
            fontSize = Math.floor(fontSize);
            container.style.fontSize = fontSize + 'px';
        }

        calcFontsize();
        window.onresize = calcFontsize;

    } else {

        var trendcito = ["cargand"];

        fetch('https://api.mercadolibre.com/trends/' + catcher.site + "/" + catcher.category)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                trendcito = myJson.map(function (i) {
                    return i.keyword;
                })
            });

        var imagenes = ["cargando..."];


        for (let i = 0; i < (catcher.rows * catcher.rows); i++) {

            fetch('https://api.mercadolibre.com/sites/' + catcher.site + '/search?q=' + trends[i])
                .then(response => response.json())
                .then(data => {
                    fetch('https://api.mercadolibre.com/items/' + data.results[0].id)
                        .then(response => response.json())
                        .then(data => {
                            imagenes[i] = data.pictures[0].url;
                        });
                });
        }



// slide options
        var slideEase = function (t) {
                return t * t * t;
            },
            slideDuration = 1000;

// text options
        var delay = {
            before: 300,
            between: 200,
            after: 2500
        };

// trends snapshot (can't think of a JS only way to load these dynamically)

        function randomImg() {
            return imagenes[Math.floor(trends.length * Math.random())];
        }

// colors
        var colors = ['#ff3231', '#68ac0d', '#00a8da', '#fbc500'];

        var Img = function (x, y) {
            // create the node
            var node = document.createElement('img');
            node.className = 'img';
            var width = 100 / catcher.columns;
            var heigth = 100 / catcher.rows;

            node.style.width = width + '%';
            node.style.height = heigth + '%';

            node.style.left = x * width + '%';
            node.style.top = y * heigth + '%';
            this.node = node;
            // create and add the panes
            var panes = [new Pane(this), new Pane(this)];
            node.appendChild(panes[0].node);
            node.appendChild(panes[1].node);
            panes[0].setOtherNode(panes[1].node);
            panes[1].setOtherNode(panes[0].node);

            // handles sliding in next pane
            var currentPane = 0;
            this.nextPane = function () {
                // swap z-indexes
                panes[currentPane].node.style.zIndex = '-1';
                currentPane = ++currentPane % 2;
                panes[currentPane].node.style.zIndex = '1';

                panes[currentPane].init();
            };

            // quickstart
            panes[0].quickStart();
            panes[0].node.style.zIndex = '1';
        };

        var Pane = function (cell) {
            var otherNode;
            this.setOtherNode = function (other) {
                otherNode = other;
            };

            // create the node
            var node = document.createElement('div');
            node.className = 'pane';
            this.node = node;

            // a place to write the trends
            var trend = document.createElement('a');
            trend.className = 'trend';
            node.appendChild(trend);

            // (re-)initialize pane when sliding in
            this.init = function () {
                var dir = Math.floor(4 * Math.random());
                switch (dir) {
                    case 0:
                        slideStart = {left: 0, top: -100};
                        break;
                    case 1:
                        slideStart = {left: 100, top: 0};
                        break;
                    case 2:
                        slideStart = {left: 0, top: 100};
                        break;
                    case 3:
                        slideStart = {left: -100, top: 0};
                        break;
                }
                // make sure it's a different background color
                do

                    node.style.backgroundColor =  colors[Math.floor(colors.length * Math.random())];
                while (node.style.backgroundColor == otherNode.style.backgroundColor);

                trend.src = trends[Math.floor(trends.length * Math.random())];
                trend.innerHTML = '';

                // start sliding in
                slideValue = 0;
                slideIn();
            };

            // handles sliding in
            var slideStart,
                slideValue;
            var slideIn = function () {
                slideValue += 20 / slideDuration;
                if (slideValue >= 1) {
                    // end of sliding in
                    slideValue = 1;
                    setTimeout(nextChar, delay.before);
                } else {
                    setTimeout(slideIn, 20);
                }
                node.style.left = slideEase(1 - slideValue) * slideStart.left + '%';
                node.style.top = slideEase(1 - slideValue) * slideStart.top + '%';
                // push other node away
                otherNode.style.left =
                    (slideEase(1 - slideValue) - 1) * slideStart.left + '%';
                otherNode.style.top =
                    (slideEase(1 - slideValue) - 1) * slideStart.top + '%';
            };

            // handles text
            var nextChar = function () {
                if (trend.innerHTML.length < trend.title.length) {
                    trend.innerHTML =
                        trend.title.slice(0, trend.innerHTML.length + 1);
                    setTimeout(nextChar, delay.between);
                } else {
                    setTimeout(cell.nextPane, delay.after);
                }
            };

            // initial start
            this.quickStart = function () {
                trend.src = randomImg();
                nextChar();
            }
        };
        // create the cells
        var cells = [];
        for (var i = 0; i < (catcher.rows * catcher.columns); i++) {
            cells[i] = new Img(i % catcher.columns, Math.floor(i / catcher.columns));

            container.appendChild(cells[i].node);
        }
        console.log(imagenes);

        function calcFontsize() {
            var fontSize = Math.min(
                container.clientHeight / 18,
                container.clientWidth / 46
            );
            fontSize = Math.floor(fontSize);
            container.style.fontSize = fontSize + 'px';
        }

        calcFontsize();
        window.onresize = calcFontsize;

    }

});

