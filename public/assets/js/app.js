$(function(){
    $(".change-eaten").on("click", function(event){
        var id = $(this).data("id");
        newValue = {
            devoured: 1
        }

        $.ajax("/api/burgers/" + id, {
            method: "PUT",
            data: newValue
        }).then(
            function(){
                console.log("changed eaten to", newValue);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bg").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            method: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("created new burger");
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event){
        event.preventDefault();
        var id = $(this).data("id");//this is calling the button
        $.ajax("/api/burgers/" + id, {
            method: "DELETE"
            // id: id
        }).then(
            function(){
                console.log("deleted burger");
                location.reload();
            }
        );
            //console log ID to make sure it's right
        })});
