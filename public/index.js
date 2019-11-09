$(document).ready(function() {
  fetch('/candidates')
  .then(res => res.json())
  .then(res => {
    const candidatesTableHTML = res.candidates.map(function(candidate) {
      return `<tr><td>${candidate.name}</td><td id='${candidate.name}'>${candidate.votes}</td></tr>`;
    });
    $('#candidatesTable').html(candidatesTableHTML);

    
    const retornaCantidadatosListado = res.candidates.map(function(candidato) {  
       return `<option value='${candidato.name}'>${candidato.name}</option>`;
    });
    var joi = retornaCantidadatosListado.join('');
    console.log(joi);
    $('#candidateName').append(joi);

  }).catch(function(err) {
    // Error :(
  });

  $('#voteSubmit').click(function(event) {
    
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    fetch('/vote', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({ candidateName: $('#candidateName').val() }),
    })
    .then(res => res.json())
    .then(res => {
      $('#' + res.name).html(res.votes);
    }).catch(function() {
      // Error
    });
  });
});

