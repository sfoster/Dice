dojo.provide("dice");
dojo.require("dojo.fx");

(function(dojo, dice){

	function fadeEffect(node, posn) {
		return dojo.animateProperty({
			node: node,
			delay: 100, 
			duration: 1000,
			properties: {
				borderColor: { start: "#ffff00", end: "#990000"}
			}
		});
	}
	function rollDie() {
		var anims = [];
		dojo.forEach(arguments, function(nodeOrId){
			var node = dojo.byId(nodeOrId);
			var result = Math.floor(Math.random() * 6);
			var posy = (-128 * result); // + "px";
			anims.push( fadeEffect(node) );
			// console.log("animating to top: ", result);
			anims.push( dojo.animateProperty({
				node: node.firstChild,
				duration: 200,
				properties: {
					top: posy
				}

			}));
		});
		var anim = (anims.length > 1) ? 
			dojo.fx.combine(anims) :
			anims.pop();

		setTimeout(function(){
			anim.play();
		}, 1000);
		var audioNode = dojo.byId('sound');
		dojo.byId('sound').play();
	}

	function clickToRoll(evt) {
		rollDie(evt.target);
	}

	dice.init = function() {
		dojo.forEach(["die1", "die2"], function(id){
			dojo.connect(dojo.byId(id), "onclick", clickToRoll);
		});
		dojo.connect(dojo.byId("roll1"), "onclick", function(){ 
			rollDie( dojo.byId("die1") );
		});
		dojo.connect(dojo.byId("roll2"), "onclick", function(){ 
			rollDie( dojo.byId("die1"), dojo.byId("die2") );
		});
		dojo.connect(document, "keyup", function(evt){ 
			switch(evt.keyCode) {
				case dojo.keys.ENTER: 
				case dojo.keys.SPACE: 
				case 49: 
					dojo.stopEvent(evt);
					rollDie( dojo.byId("die1") );
					break;
				case 50:
					dojo.stopEvent(evt);
					rollDie( "die1", "die2" );
					break;
			}
		});
	};
	
})(dojo, dice);
