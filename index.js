console.log('server is working');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: '130.211.65.117'
	//host: 'localhost',
	connectionLimit: 1000,
	user: 'root',
	password: '',
	database: 'tophelfdb'
});

app.use(express.static('static'));
app.use(bodyParser.json());
app.post('/', function (req, res) {
	console.log(req.body);
	if (req.body == null || req.body.type == null) {
		res.status(400).end();
		return;
	} if (req.body.type === "UserCheck") {
		if (req.body.email == null
		|| req.body.pass == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT u_id, username, phone FROM users WHERE email = ? AND pass = ?;",[req.body.email,req.body.pass],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} if (req.body.type === "GetUserId") {
		if (req.body.username == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT u_id FROM users WHERE username = ?;",[req.body.username],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "Register") {
		if (req.body.username == null
		|| req.body.phone == null
		|| req.body.email == null
		|| req.body.pass == null
		|| req.body.image == null
		|| req.body.rating == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT u_id FROM users WHERE email = ? AND pass = ?;",[req.body.email,req.body.pass],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1) {
					connection.query("INSERT INTO Users(username,phone,email,pass,image,rating) VALUES (?,?,?,?,?,?);",[req.body.username,req.body.phone,req.body.email,req.body.pass,req.body.image,req.body.rating],function(err,rows,fields){
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(500).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							res.status(400).end();
							return;
						}
					});
				}
				connection.query("SELECT u_id FROM users WHERE email = ? AND pass = ?;",[req.body.email,req.body.pass],function(err,rows,fields){
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					connection.release();
					if (rows.length < 1) {
						res.status(400).end();
						return;
					}						
					res.status(200).json(rows).end();
				});
			});
		});
	} if (req.body.type === "UpdateUser") {
		if (req.body.username == null
		|| req.body.u_id == null
		|| req.body.phone == null
		|| req.body.old_pass == null
		|| req.body.new_pass == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("UPDATE users SET username = ?, phone = ?, pass = ? WHERE u_id = ? AND pass = ?;",[req.body.username,req.body.phone,req.body.new_pass,req.body.u_id,req.body.old_pass],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} /*else if (req.body.type === "Register") {
		if (req.body.username == null
		|| req.body.phone == null
		|| req.body.email == null
		|| req.body.pass == null
		|| req.body.image == null
		|| req.body.rating == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Users(username,phone,email,pass,image,rating) VALUES (?,?,?,?,?,?);",[req.body.username,req.body.phone,req.body.email,req.body.pass,req.body.image,req.body.rating],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	}*/ if (req.body.type === "GetPlace") {
		if (req.body.placename == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT p_id,info,location FROM place WHERE placename = ?;",[req.body.placename],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "Place") {
		if (req.body.location == null
		|| req.body.placename == null
		|| req.body.info == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT p_id FROM Place WHERE placename = ?;",[req.body.placename],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1) {
					connection.query("INSERT INTO Place(placename,location,info) VALUES (?,?,?);",[req.body.placename,req.body.location,req.body.info],function(err,rows,fields){
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(500).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							res.status(400).end();
							return;
						}
					});
					return;
				}
				connection.query("SELECT p_id FROM Place WHERE placename = ?;",[req.body.placename],function(err,rows,fields){
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					connection.release();
					if (rows.length < 1) {
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
				});
			});
		});
	} /*else if (req.body.type === "Place") {
		if (req.body.location == null
		|| req.body.placename == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Place(placename,location) SELECT * FROM (SELECT '"+req.body.placename+"','"+req.body.location+"') AS tmp WHERE NOT EXISTS (SELECT placename,location FROM Place WHERE placename="+req.body.placename+" AND location="+req.body.location+") LIMIT 1;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} */else if (req.body.type === "Tag") {
		if (req.body.tagname == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT t_id FROM Tag WHERE tagname = ?;",[req.body.tagname],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1) {
					connection.query("INSERT INTO Tag(tagname) VALUES (?);",[req.body.tagname],function(err,rows,fields){
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(500).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							res.status(400).end();
							return;
						}
					});
					return;
				}
				connection.query("SELECT t_id FROM Tag WHERE tagname = ?;",[req.body.tagname],function(err,rows,fields){
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					connection.release();
					if (rows.length < 1) {
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
				});
			});
		});
	} /*else if (req.body.type === "Tag") {
		if (req.body.tagname == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Tag(tagname) SELECT * FROM (SELECT '"+req.body.tagname+"') AS tmp WHERE NOT EXISTS (SELECT tagname FROM Tag WHERE tagname="+req.body.tagname+") LIMIT 1;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} */else if (req.body.type === "Comment") {
		if (req.body.comment == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT c_id FROM Comments WHERE content = ?;",[req.body.comment],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1) {
					connection.query("INSERT INTO Comments(content) VALUES (?);",[req.body.comment],function(err,rows,fields){
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(500).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							res.status(400).end();
							return;
						}
					});
					return;
				}
				connection.query("SELECT c_id FROM Comments WHERE content = ?;",[req.body.comment],function(err,rows,fields){
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					connection.release();
					if (rows.length < 1) {
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
				});
			});
		});
	} /*else if (req.body.type === "Comment") {
		if (req.body.comment == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Comments(content) VALUES (?);",[req.body.comment],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} */else if (req.body.type === "Vote") {
		if (req.body.u_id == null
		|| req.body.p_id == null
		|| req.body.t_id == null
		|| req.body.c_id == null
		|| req.body.rating == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Relations(u_id,p_id,t_id,c_id,rating) VALUES (?,?,?,?,?);",[req.body.u_id,req.body.p_id,req.body.t_id,req.body.c_id,req.body.rating],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} else if (req.body.type === "GetUser") {
		if (req.body.friend_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT username, email, image, rating FROM users WHERE u_id = ? ;",[req.body.friend_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetFriends") {
		if (req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT u_id2 FROM friend WHERE u_id1 = ?;",[req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetMyFriends") {
		if (req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT username, u_id, email FROM users WHERE u_id IN (SELECT u_id2 FROM friend WHERE u_id1 = ?);",[req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetUsersSearched") {
		if (req.body.username == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT * FROM users WHERE username LIKE '%" + req.body.username + "%' LIMIT 5;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetPlacesSearched") {
		if (req.body.placename == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT * FROM place WHERE placename LIKE '%" + req.body.placename + "%' LIMIT 5;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetTagsSearched") {
		if (req.body.tagname == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT * FROM tag WHERE tagname LIKE '%" + req.body.tagname + "%' LIMIT 5;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "IsFriend") {
		if (req.body.friend_id == null
		|| req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT EXISTS (SELECT * FROM Friend WHERE (u_id1 = ? and u_id2 = ?) );",[req.body.user_id,req.body.friend_id,req.body.friend_id,req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "AddFriend") {
		if (req.body.friend_id == null
		|| req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO Friend(u_id1,u_id2) VALUES (?,?);",[req.body.user_id,req.body.friend_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "RemoveFriend") {
		if (req.body.friend_id == null
		|| req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("DELETE FROM Friend WHERE (u_id1 = ? AND u_id2 = ?);",[req.body.user_id,req.body.friend_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetRelations") {
		if (req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT username,relations.u_id,email,placename,tagname,content,relations.rating,relationtime,r_id FROM place INNER JOIN relations ON place.p_id = relations.p_id INNER JOIN tag ON tag.t_id = relations.t_id INNER JOIN comments ON comments.c_id = relations.c_id INNER JOIN users ON users.u_id = relations.u_id WHERE relations.u_id = ? ORDER BY relationtime DESC;",[req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetPlaceRelations") {
		if (req.body.place_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT username,relations.u_id,email,placename,tagname,content,relations.rating, relationtime,r_id FROM place INNER JOIN relations ON place.p_id = relations.p_id INNER JOIN tag ON tag.t_id = relations.t_id INNER JOIN comments ON comments.c_id = relations.c_id INNER JOIN users ON users.u_id = relations.u_id WHERE relations.p_id = ? ORDER BY relationtime DESC;",[req.body.place_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetTagRelations") {
		if (req.body.tag_name == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT username,relations.u_id,email,placename,tagname,content,relations.rating, relationtime,r_id FROM place INNER JOIN relations ON place.p_id = relations.p_id INNER JOIN tag ON tag.t_id = relations.t_id INNER JOIN comments ON comments.c_id = relations.c_id INNER JOIN users ON users.u_id = relations.u_id WHERE relations.t_id = (SELECT t_id FROM tag WHERE tagname = ?) ORDER BY relationtime DESC;",[req.body.tag_name],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetRankings") {
		if (req.body.user_id == null 
		|| req.body.r_ids == null) {
			res.status(400).end();
			return;
		}
		var ids = [];
		for(var i = 0; i < req.body.r_ids.length; i++) {
			ids.push(parseInt(req.body.r_ids[i].r_id)); 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT relation_id,rank FROM ranking WHERE user_id = ? AND relation_id IN (?);",[req.body.user_id,ids],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "MakeRankings") {
		if (req.body.user_id == null 
		|| req.body.r_id == null
		|| req.body.rank == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO ranking(user_id, relation_id, rank) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rank = ?;",[req.body.user_id,req.body.r_id,req.body.rank,req.body.rank],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "CalcRankings") {
		if (req.body.user_id == null 
		|| req.body.vote == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("UPDATE users SET rating = rating + (?) WHERE u_id = ?; ",[req.body.vote,req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} /*else if (req.body.type === "GetPlacename") {
		if (req.body.user_id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT placename,tagname,content, relations.rating FROM place INNER JOIN relations ON place.p_id = relations.p_id INNER JOIN tag ON tag.t_id = relations.t_id INNER JOIN comments ON comments.c_id = relations.c_id WHERE u_id = ?;",[req.body.user_id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "UserLocation") {
		if (req.body.id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT LocationName,CustomerName,Address FROM Customer INNER JOIN Location ON Customer.LocationID=Location.LocationID WHERE CustomerId = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1) {
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "GetAddress") {
		if (req.body.id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT Address FROM Customer WHERE CustomerID=?;",[req.body.id], function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "SetAddress") {
		if (req.body.id == null
		|| req.body.address == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("UPDATE Customer SET Address=? WHERE CustomerID=?;",[req.body.address,req.body.id], function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				res.status(204).end();
				return;
			});
		});
	} else if (req.body.type === "AuthCheck") {
		if (req.body.id == null
		 || req.body.auth == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} else if (req.body.type === "ServiceCheck") {
		if (req.body.id == null
		 || req.body.auth == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServicePass FROM Service WHERE ServiceID = ?;", [req.body.id], function(err,rows,fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				if (rows.length < 1 || rows[0].ServicePass != req.body.auth) {
					res.status(400).end();
					return;
				}
				res.status(204).end();
			});
		});
	} else if (req.body.type === "ServiceView") {
		if (req.body.id == null
		 || req.body.auth == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServicePass FROM Service WHERE ServiceID = ?;", [req.body.id], function(err,rows,fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].ServicePass != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT s.ServiceItemID AS ServiceItemID, c.Address AS Address, c.CustomerPhone AS CustomerPhone, s.Description AS Description FROM ServiceItem s INNER JOIN Customer c ON s.CustomerID=c.CustomerID WHERE s.ServiceID IS NULL AND ServiceStatus=2 AND c.LocationID IN (SELECT LocationID FROM ServiceLocation WHERE ServiceID=?) AND s.ServiceCategoryID IN (SELECT ServiceCategoryID FROM ServiceLocation WHERE ServiceID=?);",[req.body.id, req.body.id], function(err, rows, fields) {
					connection.release();
					if (err) {
						console.error(err);
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					res.status(200).json(rows).end();
					return;
				});
			});
		});
	} else if (req.body.type === "ServiceTake") {
		if (req.body.id == null
		 || req.body.auth == null
		 || req.body.requestId == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServicePass FROM Service WHERE ServiceID = ?;", [req.body.id], function(err,rows,fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].ServicePass != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("UPDATE ServiceItem SET ServiceID = ?, ServiceStatus=0 WHERE ServiceItemID = ? AND ServiceID IS NULL AND ServiceStatus=2;",[req.body.id,req.body.requestId],function(err){
					connection.release();
					if (err) {
						console.error(err);
						//pool.end();
						res.status(400).end();
						return;
						//process.exit(1);
					}
					res.status(204).end();
				});
			});
		});
	} else if (req.body.type === "ServiceTaken") {
		if (req.body.id == null
		 || req.body.auth == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServicePass FROM Service WHERE ServiceID = ?;", [req.body.id], function(err,rows,fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].ServicePass != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT s.ServiceItemID AS ServiceItemID, c.Address AS Address,c.CustomerPhone AS CustomerPhone, s.Description AS Description FROM ServiceItem s INNER JOIN Customer c ON s.CustomerID=c.CustomerID WHERE s.ServiceID=? AND ServiceStatus=0;",[req.body.id], function(err, rows, fields) {
					connection.release();
					if (err) {
						console.error(err);
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					res.status(200).json(rows).end();
					return;
				});
			});
		});
	} else if (req.body.type === "ServiceMark") {
		if (req.body.id == null
		 || req.body.auth == null
		 || req.body.requestId == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServicePass FROM Service WHERE ServiceID = ?;", [req.body.id], function(err,rows,fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].ServicePass != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("UPDATE ServiceItem SET ServiceStatus = 1 WHERE ServiceItemID = ? AND ServiceID=? AND ServiceStatus=0;",[req.body.requestId,req.body.id],function(err){
					connection.release();
					if (err) {
						console.error(err);
						//pool.end();
						res.status(400).end();
						return;
						//process.exit(1);
					}
					res.status(204).end();
				});
			});
		});
	} else if (req.body.type === "CustomerService") {
		if (req.body.id == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServiceItemID, Description, ServiceStatus FROM ServiceItem WHERE CustomerID=? AND ServiceStatus != 1;",[req.body.id],function(err,rows,fields){
				connection.release();
				if (err) {
					console.error(err);
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				res.status(200).json(rows).end();
			});
		});
	} else if (req.body.type === "ServiceCancel") {
		if (req.body.id == null
		 || req.body.requestId == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("UPDATE ServiceItem SET ServiceStatus=1 WHERE CustomerID=? AND ServiceItemID=? AND ServiceID IS NULL;",[req.body.id,req.body.requestId],function(err){
				connection.release();
				if (err) {
					console.error(err);
					//pool.end();
					res.status(400).end();
					return;
					//process.exit(1);
				}
				res.status(204).end();
				return;
			});
		});
	} else if (req.body.type === "AddRequest") {
		if (req.body.id == null
		 || req.body.desc == null || req.body.category == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("INSERT INTO ServiceItem (ServiceItemTimestamp, CustomerID, ServiceID, Description, ServiceStatus, ServiceCategoryID) VALUES(FROM_UNIXTIME(UNIX_TIMESTAMP()),?,NULL,?,2,(SELECT ServiceCategoryID FROM ServiceCategory WHERE ServiceCategoryName=? LIMIT 1));",[req.body.id,req.body.desc,req.body.category],function(err) {
				connection.release();
				if (err) {
					console.error(err);
					//pool.end();
					res.status(400).end();
					return;
					//process.exit(1);
				}
				res.status(204).end();
				return;
			});
		});
	} else if (req.body.type === "CatList") {
		if (req.body.id == null
		 || req.body.auth == null) {
			res.status(400).end();
			return; 
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT CategoryName FROM Category INNER JOIN ShopLocation ON Category.CategoryID=ShopLocation.CategoryID WHERE ShopID=?",[req.body.id],function(err,rows,fields){
					connection.release();
					if (err) {
						console.error(err);
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
					return;
				});
			});
		});
	} else if (req.body.type === "ModifyProduct") {
		if (req.body.id == null
		 || req.body.auth == null
		 || req.body.pname == null
		 || req.body.price == null
		 || req.body.category == null
		 || req.body.quantity == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT LocationID,Category.CategoryID FROM ShopLocation INNER JOIN Category ON ShopLocation.CategoryID=Category.CategoryID WHERE ShopID = ? AND CategoryName=?;", [req.body.id,req.body.category], function(err, rows, fields) {
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(500).end();
						return;
						//process.exit(1);
					}
					var locationId = rows[0].LocationID;
					var categoryId = rows[0].CategoryID;
					connection.query("SELECT ProductID,LocationID,CategoryID FROM Product WHERE ProductName = ? AND LocationID = ? AND CategoryID = ?;",[req.body.pname, rows[0].LocationID, rows[0].CategoryID], function(err, rows, fields) {
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(400).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							connection.query("INSERT INTO Product (ProductName, LocationID, CategoryID, Price, Quantity) VALUES (?,?,?,?,?);", [req.body.pname, locationId, categoryId, req.body.price, req.body.quantity], function(err) {
								connection.release();
								if (err) {
									console.error(err);
									res.status(400).end();
									return;
								}
								res.status(204).end();
								return;
							});
						}
						else {
							connection.query("UPDATE Product SET Price=?,Quantity=? WHERE ProductName = ? AND LocationID = ? AND CategoryID = ?;", [req.body.price, req.body.quantity, req.body.pname, rows[0].LocationID, rows[0].CategoryID], function(err) {
								connection.release();
								if (err) {
									console.error(err);
									res.status(400).end();
									return;
								}
								res.status(204).end();
								return;
							});
						}
					});
					
				});
			});
		});
	} else if (req.body.type === "Favourite") {
		if (req.body.id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT p.ProductID,ProductName,Price,CategoryName FROM Favourite f INNER JOIN Product p ON f.ProductID=p.ProductID INNER JOIN Category c ON p.CategoryID = c.CategoryID WHERE CustomerID=? ORDER BY count DESC, lastUsed DESC LIMIT 10;",[req.body.id],function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				connection.release();
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "TopList") {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT p.ProductID,ProductName,Price,CategoryName FROM TopList t INNER JOIN Product p ON t.ProductID=p.ProductID INNER JOIN Category c ON p.CategoryID = c.CategoryID;",function(err,rows,fields){
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "Order") {
		if (req.body.id == null
		 || req.body.orderDay == null
		 || req.body.orderTime == null
		 || req.body.orderRepeat == null
		 || req.body.productId == null
		 || req.body.category == null
		 || req.body.quantity == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query('SELECT LocationID FROM Customer WHERE CustomerID = ?;',[req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query('SELECT ProductID,LocationID FROM Product INNER JOIN Category ON Product.CategoryId=Category.CategoryID WHERE ProductID = ? AND LocationID = ? AND CategoryName = ?;',[req.body.productId,rows[0].LocationID,req.body.category], function (err, rows, fields) {
					if (err) {
						console.error(err);
						connection.release();
						//pool.end();
						res.status(400).end();
						return;
						//process.exit(1);
					}
					if (rows.length < 1) {
						connection.release();
						res.status(400).end();
						return;
					}
					var productId = rows[0].ProductID;
					connection.query('SELECT ShopID FROM ShopLocation INNER JOIN Category ON ShopLocation.CategoryID=Category.CategoryID WHERE LocationID = ? AND CategoryName = ?;',[rows[0].LocationID, req.body.category],function(err, rows, fields) {
						if (err) {
							console.error(err);
							connection.release();
							//pool.end();
							res.status(400).end();
							return;
							//process.exit(1);
						}
						if (rows.length < 1) {
							connection.release();
							res.status(400).end();
							return;
						}
						var shopId = rows[0].ShopID;
						connection.query('SELECT OrderID FROM Orders WHERE OrderDay = ? AND OrderTime = ? AND OrderRepeat = ? AND CustomerID = ? AND ShopID = ? AND ProductID = ? AND OrderStatus = 1;',[req.body.orderDay,req.body.orderTime,req.body.orderRepeat,req.body.id,rows[0].ShopID,productId],function(err,rows,fields) {
							if (err) {
								console.error(err);
								connection.release();
								//pool.end();
								res.status(400).end();
								return;
								//process.exit(1);
							}
							if (rows.length < 1) {
								connection.query("INSERT INTO Orders (OrderTimestamp,OrderDay,OrderTime,OrderRepeat,CustomerID,ShopID,ProductID,OrderQuantity,OrderStatus) VALUES (FROM_UNIXTIME(UNIX_TIMESTAMP()),?,?,?,?,?,?,?,1);", [req.body.orderDay,req.body.orderTime,req.body.orderRepeat,req.body.id,shopId,productId,req.body.quantity], function(err) {
									if (err) {
										console.error(err);
										connection.release();
										res.status(400).end();
										return;
									}
									connection.query("SELECT * FROM Favourite WHERE CustomerID=? AND ProductID=?;",[req.body.id,req.body.productId],function(err,rows,fields){
										if (err) {
											console.error(err);
											connection.release();
											res.status(204).end();
											return;
										}
										if (rows.length < 1) {
											connection.query("INSERT INTO Favourite (CustomerID, ProductID, lastUsed, count) VALUES(?,?,FROM_UNIXTIME(UNIX_TIMESTAMP()),1);",[req.body.id,req.body.productId],function(err,rows,fields) {
												if (err) {
													console.error(err);
													connection.release();
													res.status(204).end();
													return;
												}
												connection.release();
												res.status(204).end();
												return;
											});
										} else {
											connection.query("UPDATE Favourite SET lastUsed=FROM_UNIXTIME(UNIX_TIMESTAMP()), count=count+1 WHERE CustomerID=? AND ProductID=?;",[req.body.id,req.body.productId],function(err,rows,fields) {
												if (err) {
													console.error(err);
													connection.release();
													res.status(204).end();
													return;
												}
												connection.release();
												res.status(204).end();
												return;
											});
										}
									});
								});
							}
							else {
								connection.query("UPDATE Orders SET OrderTimestamp=FROM_UNIXTIME(UNIX_TIMESTAMP()),OrderQuantity=? WHERE OrderDay=? AND OrderTime=? AND OrderRepeat=? AND CustomerID=? AND ShopID=? AND ProductID=? AND OrderStatus=1;", [req.body.quantity,req.body.orderDay,req.body.orderTime,req.body.orderRepeat,req.body.id,shopId,productId], function(err) {
									if (err) {
										console.error(err);
										connection.release();
										res.status(400).end();
										return;
									}
									connection.query("SELECT * FROM Favourite WHERE CustomerID=?;",[req.body.id],function(err,rows,fields){
										if (err) {
											console.error(err);
											connection.release();
											res.status(204).end();
											return;
										}
										if (rows.length < 1) {
											connection.query("INSERT INTO Favourite (CustomerID, ProductID, lastUsed, count) VALUES(?,?,FROM_UNIXTIME(UNIX_TIMESTAMP()),1);",[req.body.id,req.body.productId],function(err,rows,fields) {
												if (err) {
													console.error(err);
													connection.release();
													res.status(204).end();
													return;
												}
												connection.release();
												res.status(204).end();
												return;
											});
										} else {
											connection.query("UPDATE Favourite SET lastUsed=FROM_UNIXTIME(UNIX_TIMESTAMP()), count=count+1 WHERE CustomerID=? AND ProductID=?;",[req.body.id,req.body.productId],function(err,rows,fields) {
												if (err) {
													console.error(err);
													connection.release();
													res.status(204).end();
													return;
												}
												connection.release();
												res.status(204).end();
												return;
											});
										}
									});
								});
							}
						});
					});
				});
			});
		});
	} else if (req.body.type === "Register") {
		if (req.body.locationName == null
		 || req.body.customerName == null
		 || req.body.phone == null
		 || req.body.mail == null
		 || req.body.pass == null
		 || req.body.address == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT LocationID from Location WHERE LocationName = ?;",[req.body.locationName],function(err,rows,fields) {
				if (rows.length < 1) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("INSERT INTO Customer (LocationID, CustomerName, Address, CustomerPass, CustomerPhone, CustomerMail) VALUES (?,?,?,?,?,?);", [rows[0].LocationID, req.body.customerName, req.body.address, req.body.pass, req.body.phone, req.body.mail], function(err) {
					if (err) {
						console.error(err);
						connection.release();
						res.status(400).end();
						return;
					}
					connection.query("SELECT LAST_INSERT_ID();",function(err,value,fields){
						connection.release();
						if (err) {
							console.error(err);
							res.status(400).end();
							return;
						}
						res.status(200).json(value[0]['LAST_INSERT_ID()']).end();
						return;
					});
				});
			});
		});
	} else if (req.body.type === "LocList") {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT LocationName FROM Location ORDER BY LocationName;", function(err,rows,fields){
				connection.release();
				if (err) {
					console.error(err);
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "CustomerView") {
		if (req.body.id == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT OrderID,OrderDay,OrderTime,OrderRepeat,ShopName,ProductName,OrderQuantity,OrderStatus FROM Orders o INNER JOIN Product p ON o.ProductID=p.ProductID INNER JOIN Shop s ON o.ShopID=s.ShopID WHERE CustomerID = ? AND OrderStatus < 4 AND OrderQuantity > 0 ORDER BY OrderRepeat,OrderDay,OrderTime,ShopName;",[req.body.id], function(err,rows,fields){
				connection.release();
				if (err) {
					console.error(err);
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "ShopView") {
		if (req.body.id == null 
		|| req.body.auth == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT OrderID,OrderDay,OrderTime,OrderRepeat,Address,CustomerPhone,ProductName,OrderQuantity,OrderStatus FROM Orders o INNER JOIN Customer c ON o.CustomerID=c.CustomerID INNER JOIN Product p ON p.ProductID = o.ProductID WHERE ShopID=? AND OrderStatus < 3 AND OrderQuantity > 0 ORDER BY OrderDay,OrderTime,Address;",[req.body.id],function(err,rows,fields){
					connection.release();
					if (err) {
						console.error(err);
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
					return;
				});
			});
		});
	} else if (req.body.type === "ShopList") {
		if (req.body.id == null 
		|| req.body.auth == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("SELECT ProductName, Price, Quantity,CategoryName FROM Product INNER JOIN Category ON Product.CategoryID=Category.CategoryID WHERE LocationID IN (SELECT LocationID FROM ShopLocation WHERE ShopID = ?) AND Product.CategoryID IN (SELECT CategoryID FROM ShopLocation WHERE ShopID = ?) AND Quantity > 0;",[req.body.id,req.body.id],function(err,rows,fields){
					connection.release();
					if (err) {
						console.error(err);
						res.status(400).end();
						return;
					}
					res.status(200).json(rows).end();
					return;
				});
			});
		});
	} else if (req.body.type === "ShopStatus") {
		if (req.body.id == null 
		|| req.body.auth == null
		|| req.body.orderId == null
		|| req.body.status == null
		|| req.body.status < 2
		|| req.body.status > 4) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT AuthID FROM Shop WHERE ShopID = ?;", [req.body.id], function(err, rows, fields) {
				if (err) {
					console.error(err);
					connection.release();
					//pool.end();
					res.status(500).end();
					return;
					//process.exit(1);
				}
				if (rows.length < 1 || rows[0].AuthID != req.body.auth) {
					connection.release();
					res.status(400).end();
					return;
				}
				connection.query("UPDATE Orders SET OrderStatus=? WHERE ShopID=? AND OrderID=? AND OrderStatus !=4;",[req.body.status,req.body.id,req.body.orderId],function(err){
					connection.release();
					if (err) {
						console.error(err);
						res.status(400).end();
						return;
					}
					res.status(204).end();
					return;
				});
			});
		});
	} else if (req.body.type === "CustomerStatus") {
		if (req.body.id == null
		 || req.body.orderId == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("UPDATE Orders SET OrderStatus=4 WHERE CustomerID=? AND OrderID=? AND OrderStatus !=2;",[req.body.id,req.body.orderId],function(err){
				connection.release();
				if (err) {
					console.error(err);
					res.status(400).end();
					return;
				}
				res.status(204).end();
				return;
			});
		});
	} else if (req.body.type === "ProductList") {
		if (req.body.id == null
		 || req.body.category == null) {
			res.status(400).end();
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ProductID,ProductName,Price,Quantity FROM Product p INNER JOIN Category c ON p.CategoryID=c.CategoryID WHERE CategoryName=? AND LocationID IN (SELECT LocationID FROM Customer WHERE CustomerID=?) ORDER BY ProductName;",[req.body.category,req.body.id],function(err,rows,fields){
				connection.release();
				if (err) {
					console.error(err);
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
				return;
			});
		});
	} else if (req.body.type === "ServiceList") {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error(err);
				connection.release();
				//pool.end();
				res.status(500).end();
				return;
				//process.exit(1);
			}
			connection.query("SELECT ServiceCategoryName FROM ServiceCategory;",[],function(err,rows,fields){
				connection.release();
				if (err) {
					console.error(err);
					res.status(400).end();
					return;
				}
				res.status(200).json(rows).end();
				return;
			});
		});
	}*/
});

var server = app.listen(3000, function() {
	console.log("Listening at http://%s:%s", server.address().address, server.address().port);
});
