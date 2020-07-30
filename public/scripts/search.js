$("#myOut").hide();
$("#searchContainer").keyup(function(){
    var searchStr = $(this).val()
   
    $.ajax({
        url: "/search/search?name="+ searchStr,
        type: "GET",
        dataType: "json",

        success: out => {
            $("#myOut").empty();
            var html = '';
            if(searchStr === ""){
                $("#myOut").fadeOut();
            }
            else if(out.length<1){
                $("#myOut").fadeIn();
                html += `<p>no results found</p>`
                $("#myOut").append(html);
            }
            else {
                $("#myOut").fadeIn();
            for (let i = 0, len =  out.length; i < len; i++) {
             
                html += `<p> ${out[i].name}</p>`;
               
                
            }
            $("#myOut").append(html);
        }
        
    }
    })

  });

  