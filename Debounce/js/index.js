const initApp = () => {
    const button = document.querySelector('button');
    button.addEventListener('click',()=>{
        clickOrder();
        button.disabled = true;
        setTimeout(() => 
            button.disabled = false, 2000
        )
    });
    // button.addEventListener('click', debounce(clickOrder, 2000))
}

const clickOrder = () =>{
    console.log("Clicked order")
}

document.addEventListener('DOMContentLoaded', initApp)

//debounce(fn, deplay):
const debounce = (fn, deplay) => {
    deplay = deplay || 0;
    let timeId;
    console.log('timeId immedia load:::::', timeId);
    return ()=>{
        console.log(`timeId previous at::::${timeId}`);
        if(timeId) {
            clearTimeout(timeId);
            timeId = null;
        }

        timeId = setTimeout(()=>{
            fn();
        }, deplay)
    }
}