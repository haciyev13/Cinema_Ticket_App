const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seat = document.querySelectorAll(".seat:not(.reserve)");

getFromLocaleStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if ( e.target.classList.contains("seat") && !e.target.classList.contains("reserve")){
    e.target.classList.toggle("selected");
  }
  calculateTotal();
});

select.addEventListener("change", function(e){
    calculateTotal();
})

function calculateTotal(e){
    const selectedSeat = container.querySelectorAll(".seat.selected");
    let selectedSeatCount = selectedSeat.length;

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeat.forEach(function(seats){
        selectedSeatsArr.push(seats)
    })
    seat.forEach(function(seat){
        seatsArr.push(seat);
    })

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })
    console.log(selectedSeatIndexs);

    count.innerText = selectedSeatCount;
    amount.innerText= selectedSeatCount * select.value;
    saveToLocaleStorage(selectedSeatIndexs);
}

function getFromLocaleStorage(){
    const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"))
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"))
    if (selectedSeat != null && selectedSeat.length > 0) {
        seat.forEach(function(seat, index){
            if (selectedSeat.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }
    if (selectedMovie != null) {
        select.selectedIndex= selectedMovie;
    }
}

function saveToLocaleStorage(indexs){
    localStorage.setItem("selectedSeat", JSON.stringify(indexs));
    localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex))
};