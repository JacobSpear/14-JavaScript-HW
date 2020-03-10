// from data.js
var tableData = data;

let cleanData = tableData.map(function(doc){
    doc.datetime = str_date_format(doc.datetime);
    return doc
});

let submit = d3.select('#submit');
let from_input = d3.select('#from_date');
let to_input = d3.select('#to_date')

function str_date_format(my_str){
    let date_array = my_str.split("/");
    return [date_array[2],date_array[0],date_array[1]].join("-");
}

function filter_data(){
    let from_date = new Date(from_input.node().value);
    let to_date = new Date(to_input.node().value);
    

    let filtered_data = tableData.filter(function(entry,index){ 
        doc = cleanData[index];
        compare_date = new Date(doc.datetime);
        console.log(doc.datetime);
        console.log(compare_date);
        // console.log(Date(doc.datetime) >= from_date && Date(doc.datetime) <= to_date)
       
        return (compare_date >= from_date && compare_date <= to_date);
    });    
    
    console.log(filtered_data);

    return filtered_data;
}


function construct_table(){
    tbody = d3.select('tbody');
    filter_data().forEach((doc) => {
        row = tbody.append('tr');
        cols = Object.keys(doc);
        cols.forEach(col => row.append('td').text(doc[col]));
    } );

}

submit.on('click',construct_table);

