# node-red-contrib-as400

A <a href="http://nodered.org" target="_new">Node-RED</a> node to read and write to a AS400 system.

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

    npm install node-red-contrib-as400

Usage
-----

Allows basic access to a AS400 system.

The `msg.payload` must hold the <i>query</i>

and the result is returned in `msg.payload`.

Each row will send a new payload, so you can work with big results.

The last row sends also a msg.complete message, so you can join the results.

If nothing is found for the key then <i>null</i> is returned.

