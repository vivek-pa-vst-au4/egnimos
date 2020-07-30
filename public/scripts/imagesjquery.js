$(document).ready(function(){

  $.ajax({
    type: "GET",
    url: "/retrieve",
    //datatype: "JSON",
    success: function(data){
        //console.log(data);
        // Check the length of success
        var datalength = Object.keys(data.data).length;
        //reactions(data, datalength, count);
        console.log(datalength);
        console.log("data is here", data);
        
    
    var addimages = '';
    for(i=0;i<datalength;i++)
    
    {
        console.log("Itteration",data.data[i]._id)
        addimages +=`<div class="grid-item col-md-6 col-sm-6">
            			<!--<div class="media-grid fluid">-->
                    <div class="img-wrapper" data-toggle="modal" data-target=".modal-1">
                      <img src="${data.data[i].uploads}" alt="" class="img-responsive post-image" />
                    </div>
                    <!--<div class="media-info">
                      <div class="reaction">
                        <a class="btn text-green"><i class="fa fa-thumbs-up"></i> 63</a>
                        <a class="btn text-red"><i class="fa fa-thumbs-down"></i> 12</a>
                      </div>-->
                      <!--<div class="user-info">
                        <img src="images/users/user-8.jpg" alt="" class="profile-photo-sm pull-left" />
                        <div class="user">
                          <h6><a href="#" class="profile-link">Richard Bell</a></h6>-->
                          <!--<a class="text-green" href="#">Friend</a>-->
                        </div>
                      </div>
                    </div>

                   
                    </div>
                    </div>`

    };


    $(".gridaddhere").append(addimages);
    }
  })      
  
  $('#logOutBtn').on('click', () => {
    console.log("Button CLicked.")
          $.ajax({
             url: "/logout",
             type: "GET",
             dataType: 'json',
              success: (data) => {
                  console.log("User Logged Out")
                  window.location.href = "/login"

              }
          })
     })    
})




/*
<div class="col-md-6 col-sm-6">
                  <div class="friend-card">
                  	<img src="${result.data[i].uploads}" alt="profile-cover" class="img-responsive cover">
                  	<div class="card-info">
                      <img src="profile photo hai ye" alt="user" class="profile-photo-lg">
                      <div class="friend-info">
                        <!--<a href="#" class="pull-right text-green">My Friend</a>-->
                      	<h5><a href="timeline.html" class="profile-link">${result.data[i].username}</a></h5>
                      </div>
                    </div>
                  </div>
                </div>
                

                 <!--Popup-->
                    <div class="modal fade modal-1" tabindex="-1" role="dialog" aria-hidden="true">
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="post-content">
                            <img src="images/post-images/6.jpg" alt="post-image" class="img-responsive post-image" />
                            <div class="post-container">
                              <img src="images/users/user-8.jpg" alt="user" class="profile-photo-md pull-left" />
                              <div class="post-detail">
                                <div class="user-info">
                                  <h5><a href="timeline.html" class="profile-link">Alexis Clark</a> <span class="following">following</span></h5>
                                  <p class="text-muted">Published a photo about 3 mins ago</p>
                                </div>
                                <div class="reaction">
                                  <a class="btn text-green"><i class="icon ion-thumbsup"></i> 13</a>
                                  <a class="btn text-red"><i class="fa fa-thumbs-down"></i> 0</a>
                                </div>
                                <div class="line-divider"></div>
                                <div class="post-text">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <i class="em em-anguished"></i> <i class="em em-anguished"></i> <i class="em em-anguished"></i></p>
                                </div>
                                <div class="line-divider"></div>
                                <div class="post-comment">
                                  <img src="images/users/user-11.jpg" alt="" class="profile-photo-sm" />
                                  <p><a href="timeline.html" class="profile-link">Diana </a><i class="em em-laughing"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                </div>
                                <div class="post-comment">
                                  <img src="images/users/user-4.jpg" alt="" class="profile-photo-sm" />
                                  <p><a href="timeline.html" class="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                </div>
                                <div class="post-comment">
                                  <img src="images/users/user-1.jpg" alt="" class="profile-photo-sm" />
                                  <input type="text" class="form-control" placeholder="Post a comment">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    <!--Popup End-->
                
*/
