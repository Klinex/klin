$(document).ready(function () {

  nunjucks.configure({
    autoescape: true,
    web: {
      async: false
    }
  });

  $.ajax({
    url: "./mockapi/structure.json",
    success: function(data, status) {
      nunjucks.render('./partials/article.html', data, function (err, res) {
        $('.js-articles').append(res);
      });
    }
  });

});
