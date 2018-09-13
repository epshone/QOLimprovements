$(document).ready(function(){
  ;(function(){
    $("#setEnvironment").submit(setDefaultEnvironment);
    $('#shortcuts').click(function(e){
      e.preventDefault();
      chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    });

    $('#lock-env').click(function(e){
      var isLocked = $('#lock-env').prop('checked');
      var request = new Request(Request.Type.SET_LOCK, {lock: isLocked});
      chrome.runtime.sendMessage(request.serialize(), function(response){
        console.log("Lock set to", isLocked, $('#lock-env').val());
      });
    });

    $('.qol-menu-tab').click(function(e){
      $('.qol-menu-tab').removeClass("active");
      $(this).addClass("active");

      var tab = $(this).text();
      $('.qol-section').hide();
      $('div[name="'+tab+'"]').show();
    });

    $('#appian-tabs-tab').click();
  })();

  chrome.storage.sync.get('default_env', function(result){
    if(result.default_env){
      $('#status').html("<div style='color: green'>Current environment set to: "+result.default_env);
      $('#environment').val(result.default_env)
    }
  });

  chrome.storage.sync.get('lock_env', function(result){
    if(result.lock_env){
      $('#lock-env').attr("checked", true)
    }
  });

  function setDefaultEnvironment(e){
    e.preventDefault();
    var environment = $('#environment').val();
    var request = new Request(Request.Type.SET_ENVIRONMENT, {url: environment});
    chrome.runtime.sendMessage(request.serialize(), function(response){
      document.getElementById("status").innerHTML = response;
    });
  }
});
