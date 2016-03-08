// http://startbootstrap.com/template-overviews/simple-sidebar/
// use with eg  <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a>
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
