$(document).ready(function() {
  $('#gender_specify').hide()
  $('#race_specify').hide()
  $('#accepted_student_half_full').hide()

  $('#gender').change(function() {
    if($(this).val() == 'specify')
      $('#gender_specify').show()
    else
      $('#gender_specify').hide()
  })

  $('#race').change(function() {
    if($(this).val() == 'specify')
      $('#race_specify').show()
    else
      $('#race_specify').hide()
  })

  $('#accepted_student').change(function() {
    if($(this).val() == 'specify')
      $('#accepted_student_half_full').show()
    else
      $('#accepted_student_half_full').hide()
  })

});
