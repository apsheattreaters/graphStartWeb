

var chart;

$(function () {
    var data1, data2, data3, data4, data5;
    var allData, arr;
    var subTitleFinal;

    /* $.ajax({ 
       type: "GET",
       url: "DataProvider",  
       async: false,
       success : function(data){  
           var result = data; 
           allData=result;
           console.log(allData);
       } 
     });  */
    Highcharts.setOptions({
        global: {
            timezoneOffset: -330
        }
    });

    $("#timeFrom").datepicker({
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#timeTo").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#timeTo").datepicker({
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#timeFrom").datepicker("option", "maxDate", selectedDate);
        }
    });
    $("#hourFrom").timepicker();
    $("#hourTo").timepicker();
    $("#Plot").click(function (e) {

        if ($("#timeFrom").val() == '') {
            alert("Select from date");
            return false;
        }
        if ($("#timeTo").val() == '') {
            alert("Select to date");
            return false;
        }
        if ($("#hourFrom").val() == '') {
            alert("Select from time");
            return false;
        }
        if ($("#hourTo").val() == '') {
            alert("Select to time");
            return false;
        }

        if ($("#temp").val() == '') {
            alert("Select Furnace Temprature Channel Number");
            return false;
        }
        if ($("#otemp").val() == '') {
            alert("Select Oil Temprature Channel Number");
            return false;
        }
        if ($("#mv").val() == '') {
            alert("Select CP Channel Number");
            return false;
        }

        $.ajax({
            type: "GET",
            url: "DataProvider",
            async: false,
            data: { ft: $("#temp").val(), ot: $("#otemp").val(), mv: $("#mv").val(), timeFrom: $("#timeFrom").val(), timeTo: $("#timeTo").val(), hoursFrom: $("#hourFrom").val(), hoursTo: $("#hourTo").val(), monitor: $("#monitor").val() },
            success: function (data) {
                var result = data;
                allData = result;
            },
            error: function (xhr, status, error) {
                alert("ERROR : NO DATA FOUND FOR INPUT");
            }
        });

         
        arr = allData.split(";");
        chart = $('#container').highcharts();

        function fillSubtitles() {
            subTitle = "";
            if ($("#customer").val() != "") {
                subTitle = subTitle.concat("<b>Customer: </b>" + $("#customer").val());
            } 
            if ($("#pn").val() != "") {
                subTitle = subTitle.concat(", <b>Part Name: </b>" + $("#pn").val());
            }
            if ($("#pno").val() != "") {
                subTitle = subTitle.concat(", <b>Part No: </b>" + $("#pno").val());
            }
            if ($("#mat").val() != "") {
                subTitle = subTitle.concat(", <b>Material: </b>" + $("#mat").val());
            }
            if ($("#ht").val() != "") {
                subTitle = subTitle.concat(", <b>Process: </b>" + $("#ht").val());
            }
            if ($("#bt").val() != "") {
                subTitle = subTitle.concat(", <br><b>Batch Date : </b>" + $("#bt").val());
            } 
            if ($("#furn").val() != "") {
                subTitle = subTitle.concat(", <b>Ref Std No.: </b>" + $("#furn").val());
            }
            if ($("#bno").val() != "") {
                subTitle = subTitle.concat(", <b>Batch No: </b>" + $("#bno").val());
            }
            if ($("#bq").val() != "") {
                subTitle = subTitle.concat(", <b>Qty : </b>" + $("#bq").val());
            }
            if ($("#settemp").val() != "") {
                subTitle = subTitle.concat(", <br><b>Set Temp : </b>" + $("#settemp").val());
            }
            if ($("#lt").val() != "") {
                subTitle = subTitle.concat(", <b>Loading Time : </b>" + $("#lt").val());
            }
            if ($("#st").val() != "") {
                subTitle = subTitle.concat(", <b>Soaking Start :  </b>" + $("#st").val());
            }
            if ($("#se").val() != "") {
                subTitle = subTitle.concat(", <b>Soaking End : </b>" + $("#se").val());
            }
            if ($("#tst").val() != "") {
                subTitle = subTitle.concat(", <b>Total Soaking Time : </b>" + $("#tst").val());
            }
            if ($("#ut").val() != "") {
                subTitle = subTitle.concat(", <b>Unload Time : </b>" + $("#ut").val());
            }
            return subTitle;
        };


        subTitleFinal = "";
        subTitleFinal = fillSubtitles();
        chart.setTitle(null, {
            text: subTitleFinal

        });



        chart.series[0].setData(JSON.parse(arr[0]));
        chart.series[1].setData(JSON.parse(arr[1]));
        chart.series[2].setData(JSON.parse(arr[2]));

    });



    $('#container').highcharts({
        chart: {
            zoomType: 'x'
        },


        title: {
            text: '<b>Time-Temprature Graph</b>'
        },
        tooltip: {
            shared: true,
            crosshairs: true
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth: 1

        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '<b>{value}</b>',
                style: {
                    // color: Highcharts.getOptions().colors[5]
                }
            },
            title: {
                text: '<b>Temperature degree centigrade</b>',
                style: {
                    // color: Highcharts.getOptions().colors[5]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '<b>CP</b>',
                style: {
                    //  color: Highcharts.getOptions().colors[5]
                }
            },
            labels: {
                format: '<b>{value} %</b>',
                style: {
                    // color: Highcharts.getOptions().colors[5]
                }
            },
            opposite: true
        }],
        exporting: {
            sourceWidth: 3000,
            sourceHeight: 700,
            scale: 1
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Furnace Temprature ',
            color: Highcharts.getOptions().colors[5],
            data: []
        }, {
            name: 'CP',
            yAxis: 1,
            color: Highcharts.getOptions().colors[6],
            data: []
        }, {
            name: 'Oil Temprature',
            color: Highcharts.getOptions().colors[7],
            data: []
        },
        ]


    });

    $('#save_btn').click(function () {
        save_chart($('#container').highcharts(), 'chart');
    });


});
