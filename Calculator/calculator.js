const display = document.querySelector(".calculator-input");
// const clear = document.querySelector(".clear");
// böyle hepsine tek tek vermek yerine containera vermek daha mantıklı.

const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let operator = null;
let firstValue = null;
let waitingSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

// keys.addEventListener("click", tiklanincaYapilacaklar); //burda çalıştırılacak function adını yazıyoruz. bu functıonu şu an çalıştır demiyoruz. zaten function çalışması için parantez aç-kapa lazım. 

//call-back function bak(aşağıdaki yani). 

keys.addEventListener("click", function (e) {
    const element = e.target; //tıklanan elemanın ne oldugunu soyluyor.
    const value = element.value; //const tanımlamamızın sebebi o an seçilen değerin süreç içerisinde hiç değişmeden aynı kalması hata vermemesi için yani value = bilmemne diyemememiz için. let yazsan da çalışır.
    console.log(value);
    if (!element.matches("button")) return;

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;

        case ".":
            inputDecimal();
            break;
        case "clear":
            clear();
            break;
        default:
            inputNumber(value);
            break;
    }
    updateDisplay();

    console.log(value);
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    console.log("Operator: ",operator, "Next operator:",nextOperator);
    if(operator && waitingSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue ===null) {
        firstValue = value;
    } else {
        const result = calculate(firstValue, operator, value);
        displayValue = parseFloat(result.toFixed(7));
        firstValue = result; //bir işlem yapıp işleme devam etmek istersem orda o hesaplanan değer firstValue olacak.
        //girilen sayı tutulmalı kaybolmamalı ve operatöre basınca sıfırlanmalı.
        //waitingsecondvalue öncekini silmem gereken modda mıyım yoksa yazdığım rakam sayının devamı olsun mu şeklinde mi olsun diye koşul olarak kullanıldı. falsesa yanyana yazmaya devam ediyor true olunca yanyana yazmıyor.
    }
    operator = nextOperator;
    waitingSecondValue = true;
    console.log(firstValue, operator, displayValue,waitingSecondValue);
}

function inputNumber(num) {
    // if (displayValue === "0") {
    //     displayValue = num;
    // } else {
    //     displayValue += num;
    // }
    if (waitingSecondValue) {
        displayValue=num;
        waitingSecondValue = false;        
    } else {
    displayValue = displayValue === "0" ? num : displayValue + num ;
}
} 
console.log(firstValue, operator, displayValue,waitingSecondValue);

function calculate(first, op, second) {
    switch (op) {
        case "+":
            return first + second;            
            break;
        case "-":
            return first - second;            
            break;
        case "*":
            return first * second;            
            break;
        case "/":
            return first / second;            
            break;

    }

}
//cleara basınca tüm değerleri sıfırlaması sanki ilk kez çalışıyor gibi olmalı tüm değerler. ve displayde değer 0 olmalı.
//0 olmasının sebebi switchcase içerisinde updatedisplay fonksiyonunun çalışıp displayvalueyi 0 yapması clear fonksiyonu içerisinde.
function clear() {
displayValue = "0";
operator = null;
firstValue =null;
waitingSecondValue = false;
}
 //içinde nokta olup olmadığını anlayacağım değer displayvalue. ekranda görünen değer yani. birden fazla nokta olmasın diye.

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue+= "."
    }

    //second way;
    // displayValue = !displayValue.includes(".") ? displayValue + "." : displayValue;
}




// function tiklanincaYapilacaklar(e) {
//     // alert("Merhaba, tıkladın!")
//     // alert(e.target);
//     const element = e.target;
//     alert(element.value);
// };


//workspace file-save workspace
//başka klasör ekleme boş alanda ctrl+b add folder to workspace. kaldırmak için remove from workspace.




//ÖDEV: 1) bunun üzerinde frontend tarafıyla ilgili çalışabilirsin. display üstte yaptığın işlemi göstermeye çalış. windows calculator gibi. işlemler ekleyebilirsin yüzde almak, karekök gibi. 
// 2) Yeni hesap makinesi, yapılışını anlatan sayfa bul ve onu dene. codepen.io incele. online js editor, online frontend editor vs arayabilirsin. 