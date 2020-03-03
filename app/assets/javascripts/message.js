$(function(){

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html).animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat__message-form__message-box__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__comment-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = 
      `<div class="main-chat__message-list__comment-box" data-message-id=${message.id}>
        <div class="main-chat__message-list__comment-box__name-box">
          <div class="main-chat__message-list__comment-box__name-box__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__comment-box__name-box__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__comment-box__comment">
          <div class="main-chat__message-list__comment-box__comment__text">
            ${message.content}
          </div>
          <img src="${message.image}">
        </div>
      </div>`
    } else if (message.content) {
      var html = 
      `<div class="main-chat__message-list__comment-box" data-message-id=${message.id}>
        <div class="main-chat__message-list__comment-box__name-box">
          <div class="main-chat__message-list__comment-box__name-box__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__comment-box__name-box__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__comment-box__comment">
          <div class="main-chat__message-list__comment-box__comment__text">
            ${message.content}
          </div>
        </div>
      </div>`
    } else if (message.image) {
      var html = 
      `<div class="main-chat__message-list__comment-box" data-message-id=${message.id}>
        <div class="main-chat__message-list__comment-box__name-box">
          <div class="main-chat__message-list__comment-box__name-box__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__comment-box__name-box__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__comment-box__comment">
          <img src="${message.image}">
        </div>
      </div>`
    };
    return html;
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});