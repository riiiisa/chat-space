$(function(){
  console.log(1)
    function buildHTML(message){
      if ( message.image ) {
          var html =
          `<div class="message" data-message-id=${message.id}>
          <div class="user">
            <div class="user__name">
              ${message.user_name}
            </div>
            <div class="user__day">
              ${message.created_at}
            </div>
          </div>
          <div class="content">
            <p class="image">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
        } else {
          var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="user">
              <div class="user__neme">
                ${message.user_name}
              </div>
              <div class="user__day">
                ${message.created_at}
              </div>
            </div>
            <div class="contente">
              <p class="image">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  

    $('#new_message').on('submit', function(e){
      // console.log(1)
      e.preventDefault();
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
        console.log(seikou) 
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('form')[0].reset();
      })

      .fail(function(message) {
        alert("メッセージ送信に失敗しました");
      })

      .always(function(message){
        $('.submit-btn').prop('disabled', false);
      })
    });
    
    var reloadMessages = function() {
      // console.log(1)
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(1)
        if (messages.length !== 0) {
          var insertHTML = '';
          console.log(1)
          $.each(messages, function(i, message) {
            // console.log(1)
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        // console.log(1)
        alert('error');
      });
    };
    // console.log(1)
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
      // console.log(1)
    };
});