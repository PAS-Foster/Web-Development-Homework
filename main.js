var organized_data = [];
var position = 0;

//onload
$(function() {
  getReddit();
});

async function getReddit() {
  var final = [];
  fetch('https://www.reddit.com/r/business/hot.json?limit=39')
  .then(function(res) {
    return res.json();   
  })
  .then(function(response) {
    response.data.children.forEach(function(item) {
      final.push({
        'title': item.data.title,
        'comments': item.data.num_comments,
        'author': item.data.author,
        'url': item.data.url
      });
    });
    organized_data = alignData(final);
    position = 0;

    loadInfo('#post-template', { 'post': organized_data[position] }, '#post-area');
  })
  .catch(function(err) {
    console.log(err);   
  });
}

function alignData(data) {
  var temp = [];
  var final = [];
  var counter = 0;
  for (var i=0; i<data.length; i++) {
    if (counter == 4) {
      counter = 0;
      final.push(temp);
      temp = [];
    }
    temp.push(data[i]);
    counter++;
  }

  return final;
}

function nextButton() {
  position++;
  loadInfo('#post-template', { 'post': organized_data[position] }, '#post-area');
  window.scrollTo(0,0);
}

function previousButton() {
  position--;
  loadInfo('#post-template', { 'post': organized_data[position] }, '#post-area');
  window.scrollTo(0,0);
}

//loads a handlebars template
function loadInfo(temp, info, area) {
  var source = $(temp).html();
  var template = Handlebars.compile(source);
  var html = template(info);
  $(area).html(html);
}

