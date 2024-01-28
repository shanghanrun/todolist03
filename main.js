//탭 관련된 것부터 만든다.
const shadow = document.querySelector('#shadow')
const tabs = document.querySelectorAll('.tab')

tabs.forEach( tab => tab.addEventListener('click', (e)=> indicator(e)))

function indicator(e){
    console.log(e.currentTarget);
    const target = e.currentTarget;
    const px = 'px';

    shadow.style.left =target.offsetLeft + px;
    shadow.style.top = target.offsetTop + 40+px;
    shadow.style.width = target.offsetWidth +px;

    // 표시영역을 세로방향으로 더 넓히기
    shadow.style.height = '40px';
    shadow.style.top = target.offsetTop +10+px;
}


// 유저 입력 값 받아오기
// 두가지 방법( Enter, +버튼 클릭)
// 입력을 담을 리스트 준비
let todoList=[]
let doneList=[]
let ongoingList=[]

const input = document.querySelector('input')
input.addEventListener('keyup', function(e){
    if(e.key =='Enter'){
        const inputValue = input.value.trim();
        const item ={value:inputValue, class:'normal'}
        //앞서 입력한 값이 다시 들어오면 입력안되고, 새로운 값만 입력 되게
        const i = todoList.findIndex(todo => todo.value == inputValue);  // 존재하지 않으면 -1 반환
        if ( i == -1){ 
            if(inputValue !=''){//빈문자열 아닐경우
                todoList.push({...item}); //겍체 독립
                ongoingList.push({...item})
                input.value =''; //input란 비우기
                renderMainList()
            }
        } 
    }
})

const addButton = document.querySelector('#add')
addButton.addEventListener('click', getTodo);

function getTodo(){
    const inputValue = input.value.trim();
    const item ={value:inputValue, class:'normal'}
    //앞서 입력한 값이 다시 들어오면 입력안되고, 새로운 값만 입력 되게
    const i = todoList.findIndex(todo => todo.value == inputValue);  // 존재하지 않으면 -1 반환
    if ( i == -1){ 
        if(inputValue !=''){//빈문자열 아닐경우
            todoList.push({...item}); //겍체 독립
            ongoingList.push({...item})
            input.value =''; //input란 비우기
            renderMainList()
        }
    } 
}

// 메인리스트 화면 그리는 함수 만들기
// task class인 div 아래에 ul태그를 포함한 Html요소를 만든다.
const task = document.querySelector('.task')

function renderMainList(){
    // 기존 ul태그가 있다면 제거
    const oldUlTag = task.querySelector('ul');
    if(oldUlTag){
        oldUlTag.remove();
        //혹은 task.remove(oldUlTag)
    }
    task.innerHTML =''; // 확실하게 아무것도 없게 함.

    //새 ul태그 생성
    const ulTag = document.createElement('ul')
    ulTag.style.paddingLeft ='0px';

    //리스트를 바탕으로 ul태그 밑에 li태그 생성
    todoList.forEach( (todo)=>{
        const liTag = document.createElement('li');
        liTag.classList.add('todos');
        if(todo.class == 'completed'){
            liTag.classList.add('completed');
        }
        liTag.setAttribute('data-key', todo.value);
        liTag.innerHTML =`
            <div
        `
    })

}
