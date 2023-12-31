function save_chart(chart, filename) {
    var render_width = 1000;
    var render_height = render_width * chart.chartHeight / chart.chartWidth

    var svg = chart.getSVG({
        exporting: {
            sourceWidth: chart.chartWidth,
            sourceHeight: chart.chartHeight
        }
    });

    var canvas = document.createElement('canvas');
    canvas.height = render_height;
    canvas.width = render_width;

    canvg(canvas, svg, {
        scaleWidth: render_width,
        scaleHeight: render_height,
        ignoreDimensions: true
    });

    download(canvas, filename + '.png');
}

function download(canvas, filename) {
    download_in_ie(canvas, filename) || download_with_link(canvas, filename);
}
  
// Works in IE10 and newer
function download_in_ie(canvas, filename) {
    return(navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob(canvas.msToBlob(), filename));
}

// Works in Chrome and FF. Safari just opens image in current window, since .download attribute is not supported
function download_with_link(canvas, filename) {
    var a = document.createElement('a')
    a.download = filename
    a.href = canvas.toDataURL("image/png")
    document.body.appendChild(a);
    a.click();
    a.remove();
}