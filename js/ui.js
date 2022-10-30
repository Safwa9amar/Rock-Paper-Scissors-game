// get rules-btn element using queryselector and add event listener
document.querySelector('.rules-btn').addEventListener('click', () => {
    document.querySelector(".rules-wrapper").style.visibility = "visible";
});
// get .close-rules element using queryselector and add event listener
document.querySelector('.close-rules').addEventListener('click', () => {
    document.querySelector(".rules-wrapper").style.visibility = "hidden";
}); 