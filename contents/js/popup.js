$(document).ready(function(){
  $("#setEnvironment").submit(setDefaultEnvironment);

  chrome.storage.sync.get('default_env', function(result){
    if(result.default_env){
      console.log(result.default_env)
      $('#status').html("<div style='color: green'>Current environment set to: "+result.default_env);
      $('#environment').val(result.default_env)
    }else{
      console.log(result)
    }
  })

  function setDefaultEnvironment(e){
    e.preventDefault();
    var environment = $('#environment').val();
    console.log(environment)
    var request = new Request(Request.SET_ENVIRONMENT, {url: environment});
    chrome.runtime.sendMessage(request.serialize(), function(response){
      document.getElementById("status").innerHTML = response;
    });
  }
});
