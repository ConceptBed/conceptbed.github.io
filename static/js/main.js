var object_lines = [];
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "static/data/sample_objects.csv",
        dataType: "text",
        success: function (data) { processDataObject(data); }
    });
});

var domain_lines = [];
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "static/data/sample_domains.csv",
        dataType: "text",
        success: function (data) { processDataDomain(data); }
    });
});

var composition_lines = [];
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "static/data/sample_compositions.csv",
        dataType: "text",
        success: function (data) { processDataComposition(data); }
    });
});

function processDataObject(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');


    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(headers[j] + ":" + data[j]);
            }
            object_lines.push(tarr);
        }
    }
}

function processDataDomain(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');


    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(headers[j] + ":" + data[j]);
            }
            domain_lines.push(tarr);
        }
    }
}

function processDataComposition(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');


    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(headers[j] + ":" + data[j]);
            }
            composition_lines.push(tarr);
        }
    }
}

function join_http(d) {
    a = d.split(":")
    return a[1] + ":" + a[2]
}
var modelmapping = {
    "none_with_emb_without_multires": "Textual Inversion (SD)",
    "textualinversion_ldm": "Textual Inversion (LDM)",
    "unet_without_emb_without_multires": "DreamBooth",
    "kv_with_emb_without_multires": "Custom Diffusion",
};

var modelmappingdomain = {
    "hf_textualinversion": "Textual Inversion (SD)",
    "textualinversion": "Textual Inversion (LDM)",
    "dreambooth": "DreamBooth",
    "custom_diffusion/style": "Custom Diffusion",
};




function get_object_batch() {
    toggle_object();
    ds = object_lines[Math.floor(Math.random() * object_lines.length)];

    document.getElementById("object_target_img").src = join_http(ds[3])
    document.getElementById("object_source_img1").src = join_http(ds[4])
    document.getElementById("object_source_img2").src = join_http(ds[5])
    document.getElementById("object_source_img3").src = join_http(ds[6])

    document.getElementById("objecttype").textContent = "Concept: " + ds[1].split(":")[1].replace("_", " ")
    document.getElementById("objectname").textContent = "Model: " + modelmapping[ds[0].split(":")[1]]

}

function toggle_object() {
    var x = document.getElementById('ourObject');
    if (x.style.display === "none") {
        x.style.display = "block";
    }

    var x = document.getElementById('ourDomain');
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById('ourComposition');
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function get_domain_batch() {
    toggle_domain();
    ds = domain_lines[Math.floor(Math.random() * domain_lines.length)];

    document.getElementById("domain_target_img").src = join_http(ds[3])
    document.getElementById("domain_source_img1").src = join_http(ds[4])
    document.getElementById("domain_source_img2").src = join_http(ds[5])
    document.getElementById("domain_source_img3").src = join_http(ds[6])

    document.getElementById("domaintype").textContent = "Concept: " + ds[2].split(":")[1].replace("_", " ")
    document.getElementById("domainname").textContent = "Model: " + modelmappingdomain[ds[0].split(":")[1]]

}

function toggle_domain() {
    var x = document.getElementById('ourDomain');
    if (x.style.display === "none") {
        x.style.display = "block";
    }

    var x = document.getElementById('ourObject');
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById('ourComposition');
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function get_composition_batch() {
    toggle_composition();
    ds = composition_lines[Math.floor(Math.random() * composition_lines.length)];

    document.getElementById("composition_img").src = join_http(ds[4])

    document.getElementById("compositiontype").textContent = "Categories: " + ds[2].split(":")[1].replace("[", " ").replace("]", " ")
    document.getElementById("compositionmodel").textContent = "Model: " + modelmapping[ds[0].split(":")[1]]
    document.getElementById("compositioncaption").textContent = "Caption: " + ds[3].split(":")[1]

}

function toggle_composition() {
    var x = document.getElementById('ourComposition');
    if (x.style.display === "none") {
        x.style.display = "block";
    }

    var x = document.getElementById('ourObject');
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById('ourDomain');
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}


