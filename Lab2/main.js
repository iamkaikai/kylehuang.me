let selected_id = 0;  //to check whether an answer is checked
let question_counter = 0;
let cur_question = 0;
let questoin_numb = 1;
let total_score = 0;
let json_path = "./data1.json"

function loadAnswer(id,i){
  $.getJSON(json_path, function(data) {
      $(`#${i}-prompt`).text(data.quiz[id].question);
      $(`#${i}-a1`).text(data.quiz[id].answers[0].option); 
      $(`#${i}-a2`).text(data.quiz[id].answers[1].option);
      $(`#${i}-a3`).text(data.quiz[id].answers[2].option);
      $(`#${i}-a4`).text(data.quiz[id].answers[3].option);   

      $(`#${i}-a1`).attr('value', data.quiz[id].answers[0].value); 
      $(`#${i}-a2`).attr('value', data.quiz[id].answers[1].value); 
      $(`#${i}-a3`).attr('value', data.quiz[id].answers[2].value); 
      $(`#${i}-a4`).attr('value', data.quiz[id].answers[3].value); 
       
  })  
}

function loadResult(score){
  $.getJSON(json_path, function(data) {
    if (score < 3) {
      ending = 0;
    }else if(score >= 3 && score < 7){
      ending = 1;
    }else if(score >= 7 && score <9){
      ending = 2;
    }else{
      ending = 3;
    }
    $('#result_h3').text(data.result[ending].title);
    $('#result_des').text(data.result[ending].description);
    $('#result_img').attr('src', data.result[ending].img);
  })
}

for(i=0; i<questoin_numb; i++){
  var wrap = $('<div class="question-wrap" id="questions"></div>')
  var h3 = $(`<h3 id="${i}-prompt">Question</h3>`);
  var q1 = $(`<label class="pill-answer" id="${i}-a1"></label>`);
  var q2 = $(`<label class="pill-answer" id="${i}-a2"></label>`);
  var q3 = $(`<label class="pill-answer" id="${i}-a3"></label>`);
  var q4 = $(`<label class="pill-answer" id="${i}-a4"></label>`);
  var btn = $('<button class="pill-next" id="next">Next</button>');
  wrap.append(h3);
  wrap.append(q1);
  wrap.append(q2);
  wrap.append(q3);
  wrap.append(q4);
  wrap.append(btn);
  $('.left.flex').append(wrap);
  loadAnswer(question_counter,i);
  question_counter+=1;    
}

var img = $('<img src="assets/side-bg.jpeg" id="side-bg">');
$('#right-all').append(img);



$('#start').on('click', function(e) {
  $("#welcome").addClass("fade-out");
  $("#questions").addClass("fade-in");
});


$('.pill-answer').on('click', function(e) {
  console.log("input clicked!");  
  $(this).removeClass("un-selected");
  $(this).addClass("selected");
  $(this).siblings("label").removeClass("selected");  
  $(this).siblings("label").addClass("un-selected");
  $(".pill-next").addClass("next-active");

});

$('.pill-next').on('click', function(e) { 
  console.log("Next clicked");

  if($(this).hasClass("next-active")){
  
    selected_answer = 'label[id^=' + cur_question + '].selected';
    total_score += parseInt($(selected_answer).attr('value'));
    console.log("total_score = "+total_score);

    if(cur_question == questoin_numb-1){
      var result = $('<div class="result fade-in" id="result1"></div>');
      var result_h3 = $('<h3 id="result_h3"></h3>');
      var result_des = $('<p class="result_des" id="result_des"></p>');
      var result_img = $('<img id="result_img"></img>');
      var result_btn = $('<button class="pill" id="end">Restart the quiz</button>');
      
      $(result).append(result_h3);
      $(result).append(result_des);
      $(result).append(result_img);
      $(result).append(result_btn);
      loadResult(total_score);

      $('#left-all').append(result);
      $(this).parent().addClass("fade-out");

    }else{
      $(this).parent().removeClass("fade-in");
      $(this).parent().addClass("fade-out");
      $(this).parent().next().addClass("fade-in");
      $('.pill-next').removeClass('next-active');
    }

    cur_question += 1;
  }
})

//ask GPT about the event delegation
$('body').on('click', '#end', function(e) {
  console.log("restart click");
  window.location.reload();
});

