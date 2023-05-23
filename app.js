$(document).ready(function() {
    var completedTasks = 0;
  
    $('#login-btn').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
    
        if (username === 'admin' && password === '12345') {
          $('#login-page').hide();
          $('#main-page').show();
        }
      });
    
      
      $('#logout-btn').click(function() {
        $('#main-page').hide();
        $('#login-page').show();
        completedTasks = 0; 
      });
  
    
    $('#todo-list-btn').click(function() {
      retrieveTodoList()
        .then(function(response) {
          var tasksHTML = '';
          completedTasks = 0;
          response.forEach(function(task) {
            var completedClass = task.completed ? 'completed' : '';
            tasksHTML += '<tr class="task ' + completedClass + '">' +
              '<td>' + task.title + '</td>' +
              '<td><input type="checkbox" ' + (task.completed ? 'checked' : '') +
              ' onchange="updateCompletedTasks(this)"' + (task.completed ? 'disabled' : '') + '></td>' +
              '</tr>';
  
            if (task.completed) {
              completedTasks++;
            }
          });
  
          $('#todo-list-body').html(tasksHTML);
  
          
        })
        .catch(function(error) {
          console.log('Error: ' + error);
        });
    });
  
    
    function updateCompletedTasks() {
        completedTasks = $('input[type="checkbox"]:checked').length;
    
        if (completedTasks === 5) {
          showCongratsPopUp(completedTasks);
        }
      }
  
    
    function showCongratsPopUp(count) {
      alert('Congrats. ' + count + ' Tasks have been Successfully Completed');
    }
  
    
    function retrieveTodoList() {
      return new Promise(function(resolve, reject) {
        $.ajax({
          url: 'https://jsonplaceholder.typicode.com/todos',
          method: 'GET',
          success: function(response) {
            resolve(response);
          },
          error: function(xhr, status, error) {
            reject(error);
          }
        });
      });
    }
  });
  