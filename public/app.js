//등록

// let setSf = ref.doc(randomId).set( { 
//   name: "HELLO", 
//   booleans: false, 
//   numbers: 860000 });

const create = document.querySelector('#create-form');
      create.addEventListener('submit', (e)=>{
        e.preventDefault();
    
        db.collection("show_info").add({

          title : create.title.value,
          notice : create.notice.value,
          startday : create.startday.value,
          finishday : create.finishday.value,
          hit : 0,
          image_Path : "lamancha_3.PNG"
      })
      alert('등록이 완료되었습니다.')
    })

 //수정
// ref.doc(randomId).update({
//   name: 'HELLO worlds'
// });    

 //삭제
//ref.doc("abcd1234").delete();


let ref1 = db.collection("show_info");
let getDoc = ref1.get()
    .then(doc => {
        doc.forEach( item=>{  //item이 저장한 데이터 객체 원본입니다.
            console.log(item.data());
            //console.log(item.id);  //고유 키 값 입니다.
        });
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
