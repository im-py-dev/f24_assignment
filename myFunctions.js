var defaultApplications = [
    {
        appName: "ChatGPT",
        companyName: "OpenAI",
        websiteUrl: "https://chat.openai.com",
        isFree: true,
        fieldOfUse: "Conversational AI",
        description: "An AI chatbot capable of generating human-like text responses, answering questions, and assisting with content creation.",
        logoUrl: "https://img.icons8.com/color/512/chatgpt.png"
    },
    {
        appName: "CanvaAI",
        companyName: "Canva",
        websiteUrl: "https://www.canva.com/ai/",
        isFree: true,
        fieldOfUse: "Graphic Design",
        description: "AI-powered tools in Canva to help design graphics, presentations, and social media content quickly and easily.",
        logoUrl: "https://img.icons8.com/color/512/canva.png"
    },
    {
        appName: "Grammarly",
        companyName: "Grammarly Inc",
        websiteUrl: "https://www.grammarly.com/",
        isFree: true,
        fieldOfUse: "Writing Assistant",
        description: "AI-powered writing assistant that checks grammar, spelling, tone, and style for clear and effective writing.",
        logoUrl: "https://img.icons8.com/color/512/grammarly.png"
    },
    {
        appName: "Replika",
        companyName: "Luka Inc",
        websiteUrl: "https://replika.ai/",
        isFree: true,
        fieldOfUse: "Health",
        description: "AI companion chatbot designed for conversation, self-improvement, and mental wellness support.",
        logoUrl: "https://images.seeklogo.com/logo-png/61/1/replika-logo-png_seeklogo-616569.png"
    },
    {
        appName: "Synthesia",
        companyName: "Synthesia",
        websiteUrl: "https://www.synthesia.io/",
        isFree: false,
        fieldOfUse: "Media Creation",
        description: "AI platform to create videos from text using digital avatars and voiceovers without cameras or actors.",
        logoUrl: "https://img.icons8.com/ios_filled/512/3e57da/synthesia.png"
    },
    {
        appName: "TensorFlow",
        companyName: "Google",
        websiteUrl: "https://www.tensorflow.org/",
        isFree: true,
        fieldOfUse: "Machine Learning",
        description: "Open-source library for machine learning and AI model development, widely used for research and production.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/128px-Tensorflow_logo.svg.png"
    },
    {
        appName: "JasperAI",
        companyName: "Jasper",
        websiteUrl: "https://www.jasper.ai/",
        isFree: false,
        fieldOfUse: "Content Creation",
        description: "AI writing assistant designed to generate high-quality marketing content, blog posts, and social media copy.",
        logoUrl: "https://img.icons8.com/ios_filled/512/12B886/jasper-ai.png"
    }
];

var storedApps = localStorage.getItem("applications");
var apps = [];
if (storedApps) {
    apps = JSON.parse(storedApps);
} else {
    apps = defaultApplications;
    localStorage.setItem("applications", JSON.stringify(defaultApplications));
}

function loadApps() {
    var tbody = $("#applicationsTable tbody");
    tbody.find("tr:not(:first)").remove();
    
    for (var i = 0; i < apps.length; i++) {
        var app = apps[i];
        var freeCheckbox = "";
        if (app.isFree) {
            freeCheckbox = '<input type="checkbox" checked disabled>';
        } else {
            freeCheckbox = '<input type="checkbox" disabled>';
        }
        
        var row = '<tr>' +
            '<td>' + app.appName + '</td>' +
            '<td>' + app.companyName + '</td>' +
            '<td>' + app.fieldOfUse + '</td>' +
            '<td>' + freeCheckbox + '</td>' +
            '<td><input type="checkbox" class="show-details" data-id="' + i + '"></td>' +
            '</tr>';
        
        var detailsRow = '<tr class="details" id="details-' + i + '" style="display:none;">' +
            '<td colspan="5">' +
            '<div class="app-details">' +
            '<p><strong>Website:</strong> <a href="' + app.websiteUrl + '" target="_blank">' + app.websiteUrl + '</a></p>' +
            '<p><strong>Description:</strong> ' + app.description + '</p>';
        
        if (app.logoUrl) {
            detailsRow += '<p><strong>Logo:</strong><br><img src="' + app.logoUrl + '" style="max-width:100px;"></p>';
        }
        
        detailsRow += '</div>' +
            '</td>' +
            '</tr>';
        
        tbody.append(row);
        tbody.append(detailsRow);
    }
}

$(document).ready(function() {
    if ($("#applicationsTable").length) {
        loadApps();
    }

    $("#applicationsTable tbody").on("click", ".show-details", function() {
        var id = $(this).data("id");
        $("#details-" + id).toggle();
    });

    $("#addAppForm").submit(function(e) {
        e.preventDefault();
        
        var isFreeValue = $("#isFree").val();
        var isFree = false;
        if (isFreeValue === "true") {
            isFree = true;
        }
        
        var index = apps.length;
        apps[index] = {};
        apps[index].appName = $("#appName").val();
        apps[index].companyName = $("#companyName").val();
        apps[index].websiteUrl = $("#websiteUrl").val();
        apps[index].isFree = isFree;
        apps[index].fieldOfUse = $("#fieldOfUse").val();
        apps[index].description = $("#description").val();
        apps[index].logoUrl = $("#logoUrl").val();
        localStorage.setItem("applications", JSON.stringify(apps));
        alert("Application added successfully!");
        window.location.href = "apps.html";
    });
});
