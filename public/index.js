const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = (user)=>{
    if(user){
        loggedInLinks.forEach(link => link.style.display='block');
        loggedOutLinks.forEach(link => link.style.display='none');
    }else{
        loggedInLinks.forEach(link => link.style.display='none');
        loggedOutLinks.forEach(link => link.style.display='block');   
    }
}

const postList = document.querySelector('.posts');

const setupPosts = (data)=>{
    if(data.length){
    let html = '';
    data.forEach(doc=>{
        const show_info = doc.data();

        const li= `
            <li>
                <div class="collapsible-header grey lighten-4">${show_info.title}
                    <div class="adminControls right">
                        <div id="${doc.id}" title="${show_info.title}" notice="${show_info.notice}" startday="${show_info.startday}" 
                        finishday="${show_info.finishday}" state="${show_info.state}" startday="${show_info.startday}" runtime="${show_info.runtime}" style="display:block">
                            <i class="edit material-icons modal-trigger" href="#modal-update">edit</i>    
                            <i class="delete material-icons red-text">delete</i>
                        </div>
                    </div>
                </div>    
                <div class="collapsible-body white"><span>줄거리 : ${show_info.notice}</span></div>
                <div class="collapsible-body white"><span>상영 기간 : ${show_info.startday}~${show_info.finishday}</span></div>
                <div class="collapsible-body white"><span>상영 길이 : ${show_info.runtime}</span></div>
                <div class="collapsible-body white"><span>상태 : ${show_info.state}</span></div>
                <li>    
        `;
        
        html += li;
    });
    postList.innerHTML = html;

    const editIcons = document.querySelectorAll('.edit');
    editIcons.forEach(editIcons=>{
        editIcons.addEventListener('click', (e)=>{
          
            let id = e.target.parentElement.getAttribute('id');
            let postTitle = e.target.parentElement.getAttribute('title');
            let postNotice = e.target.parentElement.getAttribute('notice');
            let postState = e.target.parentElement.getAttribute('state');
            let postStartday = e.target.parentElement.getAttribute('startday');
            let postFinishday = e.target.parentElement.getAttribute('finishday');
            let postRuntime = e.target.parentElement.getAttribute('runtime');
            
            const updatePost = document.querySelector('#update-form');
            
            for(var i=0; i<updatePost.length; i++){
                console.log(updatePost[i].id)
            }
            
            console.log(postState);

            updatePost.title.value = postTitle;
            updatePost.notice.value = postNotice;
            updatePost.state.value = postState;
            updatePost.startday.value = postStartday;
            updatePost.finishday.value = postFinishday;
            updatePost.runtime.value = postRuntime;
           
            updatePost.addEventListener('submit', (e)=>{
                e.preventDefault();
        
                db.collection("show_info").doc(id).update({
                  title : updatePost.title.value,
                  notice : updatePost.notice.value,
                  runtime : Number(updatePost.runtime.value),
                  startday : updatePost.startday.value,
                  finishday : updatePost.finishday.value,
                  state : updatePost.state.value,
              }).then(()=>{
                const modal = document.querySelector('#modal-update');
                M.Modal.getInstance(modal).close();
                updatePost.reset();
                alert('수정이 완료되었습니다.');
              }).catch(function(error){
                  alert.error("수정 오류")
              })
              
              
            })

        })
    })

    const deleteIcons = document.querySelectorAll('.delete');
    deleteIcons.forEach(deleteIcon =>{
         deleteIcon.addEventListener('click', (e)=>{
           e.stopPropagation();
           let id = e.target.parentElement.getAttribute('id');
           db.collection("show_info").doc(id).delete();
       })
    })
        }else{
             if(auth.currentUser != null){
             postList.innerHTML = '<h4 class="center-align">공연을 등록하세요.</h4>';
        }else{
            postList.innerHTML = '<h4 class="center-align">관리자 계정으로 로그인하십시오.</h4>';
            }
        }
    
 
    $(document).ready(function(){
        $('.collapsible').collapsible();
      })

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      })
      $(document).ready(function(){
        $('select').formSelect();
      })
      // Or with jQuery   

      //진행중 
      $(document).ready(function(){
        var div;
        var daybtn = document.getElementById("daybtn");
        daybtn.addEventListener("click",addbtnClick,false);
        function addbtnClick(){
            var input1 = document.createElement("<input type='text' class='DATE' />");
            input1.setAttribute("class")
            div = document.getElementById("daytime")
            div.append(input1);
        };
           
    })

  $(function() {
      $(".time1,.time2").timepicker({
          timeFormat: 'h:mm p',
          interval: 60,
          minTime: '10',
          maxTime: '23:00pm',
          defaultTime: '11',
          startTime: '10:00',
          dynamic: false,
          dropdown: true,
          scrollbar: true        
      })
  })   

  $('.DATE').datepicker({
    format: 'yy.mm.dd',
  })

  $(function() {
        var yearVal;
        var monthVal;
        var dayVal;
        var fyearVal;
        var fmonthVal;
        var fdayVal;
        var startday;
        var finishday;
    $("#year").change(function(){
         yearVal =  $(this).val();
        console.log(yearVal);
     })
     $("#month").change(function(){
          monthVal =  $(this).val();
         console.log(monthVal);
     }) 
   $("#day").change(function(){
          dayVal =  $(this).val();
         console.log(dayVal);
     })
     $("#fyear").change(function(){
          fyearVal =  $(this).val();
         console.log(fyearVal);
     })
     $("#fmonth").change(function(){
          fmonthVal =  $(this).val();
         console.log(fmonthVal);
     }) 
     $("#fday").change(function(){
          fdayVal =  $(this).val();
         console.log(fdayVal);
     })
        startday= yearVal+"."+monthVal+"."+dayVal;
        console.log(startday);
        finishday= fyearVal+"."+fmonthVal+"."+fdayVal;
        console.log(finishday);
    })
}
//공연장선택
$(function() {
    var showplace;
   var img;
    var imagePreview=document.getElementById("imagePreview");
    $(".place").change(function(){
       showplace =  $(this).val();
       console.log(showplace);
       //     
       img = document.createElement( "img");
       img.setAttribute( "src", "../img/" + showplace + ".png");
       imagePreview.appendChild(img);
       console.log(img);
       imagePreview.replaceChild(img, imagePreview.firstChild);
})
})
