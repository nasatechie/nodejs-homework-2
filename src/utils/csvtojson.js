export function CsvToJson(csvData){
    let rows = csvData.split('\n');
    let headers = rows[0].replace('/\r/g', '').split(',');
    let output = [];
    rows.forEach((row, index) => {
        row = row.replace('/\r/g', '');
        if(index !== 0){
            let fields = row.split(',');
            let object = {};
            fields.forEach((field, index) => {
                object[headers[index]] = field; 
            });
            output.push(object);
        }
    });
    return output;
}