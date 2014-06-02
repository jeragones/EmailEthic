var app = require('../app');

exports.compare = function(req, res) {
  	
  	var query = 'SELECT correo, codigo, categoria FROM codigo WHERE '
  	if(req.body.gmail) {
  		query += 'correo="Gmail"';
  	}
  	if(req.body.hotmail) {
  		if(req.body.gmail) {
  			query += ' OR '
  		}
  		query += 'correo="Hotmail"';
  	}
  	if(req.body.yahoo) {
  		if(req.body.gmail || req.body.hotmail) {
  			query += ' OR '
  		}
  		query += 'correo="Yahoo"';
  	}
  	console.log(req.body.gmail+"-"+req.body.hotmail+"-"+req.body.yahoo);
  	console.log(query);
  	app.connection.query(query, function (err, resp) {
		if(err)
			console.log("ERROR: CONSULTA A LA BASE DE DATOS");
		else {
			if(resp.length > 0) {
				console.log("CONSULTA EXITOSA");
				var table = "<table>";
				for (var i in resp) { 
					table += '<tr><td>'+(resp[i].correo).toString()+'</td>';
					table += '<td>'+(resp[i].categoria).toString()+'</td></tr>';
				}
				table += "</table>";
				console.log(table);
				res.locals({table: table, isAjax: req.fjAjax || false});
				res.render('compare');
				
				//res.send(resp);
			}
		}
	});
	/*var table = '<table><tr><td>hola</td><td>Mundo</td></tr><tr><td><button class="btn btn-primary">press</button></td></tr></table>';
	res.locals.table = table;
	res.redirect('/compare');*/
}