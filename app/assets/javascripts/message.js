$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-list__comment-box">
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
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="main-chat__message-list__comment-box">
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
      return html;
    };
  }
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
});