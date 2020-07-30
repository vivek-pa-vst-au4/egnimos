$(document).ready(function() {
    //var $addhere = $("#addhere");
/*
    $.ajax({
      type: "POST",
      url: "/tweetcreate",
      //datatype: "JSON",
      success: function(data){
          //console.log(data);
         
          
      }
    });
*/
    $.ajax({
        type: "GET",
        url: "/retrieve",
        //datatype: "JSON",
        success: function(data){
            //console.log(data);
            // Check the length of success
            //const data = datas;
            var datalength = Object.keys(data.data).length;
            // Calling the result function
            //var count = 0;
            result(data, datalength);
            //reactions(data, datalength, count);
            
        }
    });

    function result(result, datalength){
        // Values are here im result
        console.log(result);
        var myPostHtml = '';
        // Values in the first place of object array
        //console.log(result.data[0].uploads);
        for(i=0;i<datalength;i++)
        {
          //if(result.data[i].uploads.attr("src", "No files uploaded")){
          //}
            myPostHtml += `<div id="hideme"${result.data[i]._id}>
            <img src="${result.data[i].uploads}" id="contentAreaHomePageTweetPhoto" alt="post-image" class="img-responsive post-image" />
            <div class="post-container">
              <img src="${result.data[i].uploads}" id="" alt="user" class="profile-photo-md pull-left" />
              <div class="post-detail">
                <div class="user-info">
                  <h5><a href="/timeline" id="" class="profile-link">${result.data[i].username}</a> <!--<span class="following">following</span>--></h5>
                  <p class="text-muted"id="contentAreaHomePageTime">${result.data[i].createdAt}</p>
                </div>
                <div class="reaction">
                  <button class="btn text-green" id="contentAreaHomePageLikeButton" value="${result.data[i]._id}"><i class="icon ion-thumbsup"></i>${result.data[i].likeCount}</button>
                  <!--<button class="btn text-blue" id="contentAreaHomePageUpdateButton" value="${result.data[i]._id}"><i class="fa fa-pencil-square-o"></i></button>-->
                  <button class="btn text-red" id="contentAreaHomePageDeleteButton"  value="${result.data[i]._id}"><i class="icon ion-android-delete"></i></button>
                </div>
                <div class="line-divider"></div>
                <div class="post-text">
                  <p><i class="em em-anguished"></i> <i class="em em-anguished"></i> <i class="em em-anguished"></i></p>
                </div>
                <!--<div class="line-divider"></div>-->
                <div class="">
                  <!--<img src="images/users/user-11.jpg" alt="" class="profile-photo-sm" />-->
                  <p id="contentAreaHomePagePostText"+${result.data[i]._id}><b><!--<a href="/timeline" class="profile-link"></a><i class="em em-laughing"></i>-->${result.data[i].post}</b></p>
                
                </div>
                <!--<div class="post-comment">
                  <img src="" alt="" class="profile-photo-sm" />
                  <p><a href="/timeline" class="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </h5>
                </div>
                <div class="post-comment">
                  <img src="" alt="" class="profile-photo-sm" />
                  <input type="text" class="form-control" placeholder="Post a comment">
                </div>
              </div>-->
            </div>
            </div>
            <div class="line-divider"></div>
            </div>`
        };
      
        $(".post-content").append(myPostHtml);
    };
  });
    
    $(document).ready(function() {
      //var count = 0;
      $(document).on('click','.text-green',function(){
        
        var likeBtnId = $(this).attr("value");
        var count = $(this).text();
        //count;
        console.log(count);
          //count++;
        //console.log(count);
        console.log("here is id",likeBtnId);
        //$(`#contentAreaHomePagePostText ${likeBtnId}`).innerText("2"); 
            
      console.log("button clicked", likeBtnId);
      $.ajax({
        url: "/tweetlike",
        type: "POST",
        datatype: "JSON",
        data: {id: likeBtnId,
              counter: count
        },
        success: function(data){
          //location.reload();
          //$("#contentAreaHomePageDeleteButton"+result.data[i]._id).hide();
          console.log("done");
          alert("Post liked");
          location.reload();
        }
      });
      });
    

      $(document).on('click','.text-blue',function(){
        //$()
        var updateBtnId = $(this).attr("value");   //NOT USED TILL NOW
        console.log("button", updateBtnId);
        var appendform =''
        appendform +=`<form name="updateTweetForm">
        <div class="row">
          <div class="col-md-7 col-sm-7">

            <div class="form-group">
              <textarea name="TweetHomeInputTextupdate" id="TweetHomeInputupdate" cols="30" rows="1" class="form-control" placeholder="Write what you wish"></textarea>
          <button type="button" ></button>
          </form>`
        $("#contentAreaHomePagePostText"+updateBtnId).append(appendform);

        console.log("button clicked", updateBtnId);
      /*
      $.ajax({
        url: "/newsfeed/",
        type: "POST",
        datatype: "JSON",
        data: 
        {
          id: updateBtnId,
          postchange: posts
        },
        success: function(data){
          //location.reload();
          //$("#contentAreaHomePageDeleteButton"+result.data[i]._id).hide();
          console.log("done");
          alert("Post has been deleted sucessfully");
          location.reload();
        }
      });
      */
    
    })

    /*$(document).on('click','',function(){

      
    
    $.ajax({
      url: "/commenting",
      type: "POST",
      datatype: "JSON",         // FOR COMMENT 
      data: {id: abab,      // Add the id of the poast here
            comment: request.body // add the comment here
      },
      success: function(data){
        //location.reload();
        console.log("done");
        alert("Posted comment sucessfully");
        
        location.reload();
      }
    });
    
  
  });
  */
  
      $(document).on('click','.text-red',function(){
        var deleteBtnId = $(this).attr("value");     
      console.log("button clicked", deleteBtnId);
      
      $.ajax({
        url: "/tweetdelete",
        type: "POST",
        datatype: "JSON",
        data: {id: deleteBtnId},
        success: function(data){
          //location.reload();
          console.log("done");
          $("#hideme"+deleteBtnId).hide();
          alert("Post has been deleted sucessfully");
          
          location.reload();
        }
      });
      
    
    });
  });
  