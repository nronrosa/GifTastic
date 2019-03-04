$(document).ready(function () {
    // set variables
    var topics = ["Cherry Blossom", "Chrysanthemum", "Dahlia", "Daisy", "Gazania", "Lotus", "Orchid", "Peony", "Roses", "Tulips", "Water Lilies"];

    function displayGifs() {
        $("#gifs").empty();
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vf4EK7hbA3pOFo1EFcPqh1cW52hsodu1&q=" + topic + "&limit=10&rating=G&offset=0&rating=G&lang=en"; $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var flowerDiv = $("<div>");
                    var flowerImage = $("<img>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    flowerImage.attr("src", results[i].images.fixed_height_still.url);
                    flowerImage.attr("data-state-still", results[i].images.fixed_height_still.url);
                    flowerImage.attr("data-state-animate", results[i].images.fixed_height.url);
                    flowerImage.attr("data-state", "still");
                    flowerImage.addClass("flower-img");
                    flowerDiv.append(p);
                    flowerDiv.append(flowerImage);
                    $("#gifs").prepend(flowerDiv);
                };
                $(".flower-img").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-state-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-state-still"));
                        $(this).attr("data-state", "still");
                    };
                });
            });
    };

    function renderButtons() {
        $("#created-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("flower-btn");
            button.attr("data-topic", topics[i]);
            button.text(topics[i]);
            $("#created-buttons").append(button);
        };
    };

    $("#add-flower").on("click", function (event) {
        event.preventDefault();
        var flower = $("#flower-input").val().trim();
        topics.push(flower);
        renderButtons();
    });

    $(document).on("click", ".flower-btn", displayGifs);

    renderButtons();
});
