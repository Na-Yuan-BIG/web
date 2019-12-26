// var host = "localhost:9888/cgvd/";

// $('#geneid').select2({
//     placeholder: {
//             id: '-1', // the value of the option
//             text: 'Select an option'
//     },
//     allowClear:true
// });
$('#alleid').select2({
    placeholder: "Select a *allele",
    }
);
$('#clintype').select2();
$('#cantype').select2({
    placeholder: "Select a cancer",
});
$('#genetype').select2(
    {
        placeholder: "Select a gene",
    }
);



$('#conid').select2();

$('#clinvarid').select2();
$('#funcid').select2();

$('#dt').select2({
    // placeholder: {
    //     id: '-1', // the value of the option
    //     text: 'Select an option'
    // }
});





// $('#keyword').select2({
//     tags: true,
//     ajax: {
//         url: "${host}/keywords/name",
//         dataType: 'json',
//         data: function (params) {
//             return {
//                 q: params.term
//             }
//         },
//         processResults: function (data) {
//             var result = [];
//             for (var i = 0; i < data.length; i++) {
//                 result[i] = {id: data[i], text: data[i]};
//             }
//             console.log(data);
//             return {
//                 results: result
//             };
//         }
//     }
// });