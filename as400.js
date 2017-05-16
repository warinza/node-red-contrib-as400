module.exports = function(RED) {
	"use strict";
	var as400 = require('node-jt400');

	function as400Node(config) {
        RED.nodes.createNode(this,config);


        this.host = config.host;
        this.naming = config.naming || system;

        var node = this;

        var db = as400.pool({host: node.host, user: node.credentials.user, password: node.credentials.password, naming: node.naming});

        node.query = function(node, msg){
            if ( msg.payload !== null && typeof msg.payload === 'string' && msg.payload !== '') {
                db.query(msg.payload).then(function (rows) {
					if (rows) { 
                        var c = rows.length;
                        rows.forEach(function(row) {
                            c--
                            if(c==0){
                                node.send({ topic: msg.topic, payload: row, complete: true });
                            }else{
                                node.send({ topic: msg.topic, payload: row });
                            }
                        })
                        node.send([ null, { topic: msg.topic, control: 'end' }]);
                    }else{
                        node.error(msg); 
                    }
				});
            }
            else {
                if (msg.payload === null) { 
                    node.error("msg.payload : the query is not defined");
                }
                if (typeof msg.payload !== 'string') { 
                    node.error("msg.payload : the query is not defined as a string");
                }
                if (typeof msg.payload === 'string' && msg.payload === '') { 
                    node.error("msg.payload : the query string is empty");
                }
            }
        }
        
        node.on('input', function(msg) {
            node.send([ null, { control: 'start', query: msg.payload } ]);
            node.query(node, msg);
        });
    }
    
    RED.nodes.registerType("as400",as400Node,{
    	credentials: {
            user: {type: "text"},
            password: {type: "password"}
        }
    });
}