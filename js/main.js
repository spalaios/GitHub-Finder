$(document).ready(function(){



  $('#searchUser').keypress($.debounce(500,function(e){

    let username = $(this).val();

    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'a9c8c34c614b07d5290d',
        client_secret:'2582c7f2937f1185c314f86df995bbf5955f2259'
      }
    }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'a9c8c34c614b07d5290d',
            client_secret:'2582c7f2937f1185c314f86df995bbf5955f2259',
            per_page:5,
            sort:'created: asc'
          }
        }).done(function(repos){
          $.each(repos,function(index,repo){
            $('#repos').append(`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href=${repo.html_url} target="_blank" class="btn btn-default">Repo Page</a>
                </div>
                </div>

              </div>
            `);
          })
        })
      //  console.log(user);
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
          <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img src=${user.avatar_url} class="thumbnail avatar">
                  <a class="btn btn-primary btn-block" target="_blank" href=${user.html_url}>View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gist: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                  <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/Blog:<a href=${user.blog}>${user.blog}</a></li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member : ${user.created_at}</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page_header">Latest Repos</h3>
        <div id="repos">

        </div>
        `);
    });

  }));
});
// ));
