// $ -> Substitui jQuery(...) ou document.queryElement(...)
//$("h1").css("color", "red");
console.log($("h1").css("font-size"));

$("h1").addClass("big-title");
//$("h1").removeClass("big-title");
console.log($("h1").hasClass("big-title"));
$("a").attr("href", "https://www.google.com");

$("h1").click(() => {
    $("h1").css("color", "green");
});

$("button").click(() => {
    //$("h1").css("color", "turquoise");
    //$("h1").fadeToggle();
    $("h1").slideToggle();
});

$("input").keypress((event) => {
    console.log(event.key);
    $("h1").text(event.key);
});

$("h1").on("mouseover", () => {
    $("h1").css("color", "purple");
});

