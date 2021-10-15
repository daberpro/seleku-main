import {
	Component
} from "@selekudev/core";


let card = new Component();


card.createChild("h1",{

	inner: "hello {{nama}}",
	props:{
		nama: ""
	},
	children: [

		card.createChild("small",{
			inner: " by daber "
		})

	]

},true);

export {
	card
}