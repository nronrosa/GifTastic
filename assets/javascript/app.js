$(document).ready(function () {
    // set variables
    var topics = ["Cherry Blossom", "Chrysanthemum", "Dahlia", "Daisy", "Gazania", "Lotus", "Orchid", "Peony", "Roses", "Tulips", "Water Lilies"];


    // ******************************
    // Adding click event listen listener to all buttons
    // $("button").on("click", function () {
    function displayGifs() {
        $("#gifs").empty();
        var topic = $(this).attr("data-topic");
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vf4EK7hbA3pOFo1EFcPqh1cW52hsodu1&q=" + topic + "&limit=10&rating=G&offset=0&rating=G&lang=en";
        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .done(function (response) {
                console.log(queryURL);
                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;
                // debugger;
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    // debugger;
                    // Creating and storing a div tag
                    var flowerDiv = $("<div col='col-4'>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    // Creating and storing an image tag
                    var flowerImage = $("<img>");
                    // image = '<div class="col-md-4">' + image + "</div>";
                    // Setting the src attribute of the image to a property pulled off the result item
                    flowerImage.attr("src", results[i].images.fixed_height_still.url);
                    flowerImage.attr("data-state-still", results[i].images.fixed_height_still.url);
                    flowerImage.attr("data-state-animate", results[i].images.fixed_height.url);
                    flowerImage.attr("data-state", "still");
                    flowerImage.addClass("flower-img");
                    // Appending the paragraph and image tag
                    flowerDiv.append(p);
                    flowerDiv.append(flowerImage);
                    // Prependng to the HTML page in the "#gifs-appear-here" div
                    $("#gifs").prepend(flowerDiv);
                    // }

                };

            });
    };

    $(".flower-img").on("click", function () {
        debugger;
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-state-animate"));
            console.log(this);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-state-still"));
            console.log(this);
            $(this).attr("data-state", "still");
        };
    });

    function renderButtons() {
        // debugger;
        $("#created-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("flower-btn");
            button.attr("data-topic", topics[i]);
            button.text(topics[i]);
            $("#created-buttons").append(button);
        };
    };

     // This function handles events where one button is clicked
     $("#add-flower").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var flower = $("#flower-input").val().trim();
        // Adding the movie from the textbox to our array
        topics.push(flower);
        console.log(topics);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });






    // Function for displaying the movie info
    // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
    $(document).on("click", ".flower-btn", displayGifs);

   
    renderButtons();




});
