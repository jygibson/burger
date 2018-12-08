//* In the `orm.js` file, create the methods that will execute the necessary
// MySQL commands in the controllers. These are the methods you will need to use in order 
//to retrieve and store data in your database.

var connection = require("../config/connection.js");

//this thingy makes a helper function for questions marks from cats app

function printQuestionMarks(num){
    var arr =[];
    for(var i=0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

//this is another helper function which will convert object key/value pairs to SQL syntax from cats app

function objToSql(ob){
    var arr = [];
    for(var key in ob){
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob,key)){
            if (typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            arr.push(key+ "=" + value)
        }
    }
    return arr.toString();
}

//now create the ORM object for the SQL

var orm={
    selectAll: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err,result){
            if (err){
                throw err;
            }
            cb(result)
        });
    },
    insertOne: function(table, cols, vals, cb){
    var queryString = "INSERT INTO " + table;

queryString += " (";
queryString += cols.toString();
queryString += ") ";
queryString += "VALUES (";
queryString += printQuestionMarks(vals.length);
queryString += ") ";

console.log(queryString);

connection.query(queryString, vals, function(err, result){
    if (err){
        throw err;
    }

    cb(result);
});
},

updateOne: function(table, objColVals, condition, cb){
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result){
        if (err){
            throw err;
        }
        cb(result)
    });
},

deleteOne: function(table, condition, cb){
    var queryString = "DELETE FROM " + table + " WHERE " + condition;
    console.log(queryString)
    connection.query(queryString, function(err,result){
        if (err){
            throw err;
        }
        cb(result)
    });
}
}

 //  * Export the ORM object in `module.exports`.
 module.exports = orm;