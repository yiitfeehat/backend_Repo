"use strict"

console.log("module çalışıyor")

/* ------------------------ tek fonksiyon export etme ----------------------- */

// const testFunc = function(){
//     console.log("this is a function")
// }
// module.exports=testFunc


/* --------------- Birden fazla değer veya fonskiyon gönderme --------------- */

// const imren=14.01

// const dogumGünü=function(){
//     console.log("imren oğlak burcudur")
// }
// const dogumGünü2=function(){
//     console.log("defne koç burcudur")
// }
// // module.exports={dogumGünü,dogumGünü2}
// module.exports={
//     imrenBurc:dogumGünü,
//     defneBurc:dogumGünü2,
//     imren
// }

/* -------------------------- Array olarak gönderme ------------------------- */

// const tekRakam = function(){
//     console.log("1,3,5,7,9")
// }
// const ciftRakam= function(){
//     console.log("0,2,4,6,8")
// }
// module.exports=[tekRakam,ciftRakam]


//' Bizim kullanacağımız yöntem (piyasa standartı)

module.exports = {
    test1 : function(){
        console.log("test1 calisti")
    },
    test2: function(){
        console.log("test2 calisti")
    },
    test3: function(){
        console.log("test3 calisti")
    },
    deger: "fs18"
}