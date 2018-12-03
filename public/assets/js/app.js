$(function(){
    $(".change-eaten").on("click", function(event){
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newEatenStatus = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenStatus
        }).then(
            function(){
                console.log("changed eaten to", newEatenStatus);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        var newBurger = {
            name: $("#bg").val().trim(),
            sleepy: $("[burger_name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("crested new burger");
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event){
        var id = $(this).data("id");
        $.ajax("api/burgers/", + id, {
            type: "DELETE"
        }).then(
            function(){
                console.log("deleted burger", id);
                location.reload();
            }
        );
    });
});