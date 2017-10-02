google.charts.load('45', { packages: ['corechart', 'table'] });

google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawColumnChart);


function drawColumnChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            var w = []
            var q = []
            r=0
            for (var i = 0; i < jsonData.length; i++) {
                w.push(jsonData[i].date)
            }


            var count = {};
            w.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            console.log(count)

            
            data.addColumn('string', 'monts');
            data.addColumn('number', 'Sales');
            for (var i in count) {
                data.addRow([
                    i,
                    count[i],
                ]);

            }
            var options = {
                title: 'Company Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: 'red' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('graf2'));
            chart.draw(data, options);
        }
    });
}

function drawPieChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            w = []
            q = []
            r=0
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Numbers');
            for (var i = 0; i < jsonData.length; i++) {
                w.push(jsonData[i].host)
            }


            var count = {};
            w.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

            for (i in count) {
                data.addRows([
                    [i, count[i]],
                ]);
                r++
            }


            var options = {
                legend: 'left',
                title: 'All companies',
                is3D: true,
                width: '100%',
                height: '100%'
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('graf1'));
            chart.draw(data, options);
        }
    });
}


function drawTable() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'url');
            data.addColumn('string', 'comp');
            data.addColumn('string', 'host');
            data.addColumn('string', 'date');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].url,
                    jsonData[i].comp,
                    jsonData[i].host,
                    jsonData[i].data,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('table'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}
$(window).resize(function () {
    drawPieChart();
    drawTable();
    drawColumnChart();
});
