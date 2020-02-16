import * as cst from './index'

const EXPLICATIONS = {
	[cst.PROBLEM]: {
		0: "Je ne comprends pas bien ce problème.",
		1: "Je ne pense pas que ce problème soit important, et je pense qu'il est déraisonnable de le penser.",
		2: "Je ne pense pas que ce problème soit important, mais je comprends que d'autres personnes raisonnables puissent le penser.",
		3: "Je suis partagé quant à ce problème. Je ne suis pas convaincu de son importance en l'état, mais il met le doigt sur quelque chose.",
		4: "Je pense que ce problème est important, mais je comprends que pour d'autres personnes raisonnables il ne le soit pas.",
		5: "Je pense que ce problème est important, et il devrait l'être pour toute personne raisonnable.",
	},
	[cst.RESOURCE]: {
		0: "Je ne comprends pas bien cette ressource.",
		1: "Je pense que cette ressource nuit à la compréhension de la vue d'ensemble.",
		2: "Je pense que cette ressource n'est pas très utile à la compréhension de la vue d'ensemble.",
		3: "Je suis partagé quant à cette ressource. Son objectif me semble utile mais en l'état je ne saurai pas vraiment la recommander.",
		4: "Je pense que cette ressource est utile à la compréhension de la vue d'ensemble.",
		5: "Je pense que cette ressource est suffisante pour comprendre la vue d'ensemble.",
	},
	[cst.SOLUTION]: {
		0: "Je ne comprends pas bien cette solution.",
		1: "Je ne pense pas que cette solution soit efficace, et je pense qu'il est déraisonnable de le penser.",
		2: "Je ne pense pas que cette solution soit efficace, mais je comprends que d'autres personnes raisonnables puissent le penser.",
		3: "Je suis partagé quant à cette solution. Je ne suis pas convaincu de son efficacité en l'état, mais elle met le doigt sur quelque chose.",
		4: "Je pense que cette solution est efficace, mais je comprends que pour d'autres personnes raisonnables elle ne le soit pas.",
		5: "Je pense que cette solution est efficace, et elle devrait l'être pour toute personne raisonnable.",
	},
	[cst.SUBJECT]: {
		0: "Je ne comprends pas bien cette vue d'ensemble.",
		1: "Je pense que cette vue d'ensemble donne une fausse représentation du sujet et est néfaste à son appréhension.",
		2: "Je pense que cette vue d'ensemble ne permet pas de bien comprendre le sujet, certains points sont pertinents mais l'ensemble est lacunaire.",
		3: "Je pense que cette vue d'ensemble peut permettre de débroussailler le sujet, mais c'est laborieux.",
		4: "Je pense que cette vue d'ensemble permet de bien comprendre le sujet mais ne rend pas justice aux différents points de vue.",
		5: "Je pense que cette vue d'ensemble permet de bien comprendre le sujet dans sa globalité et se complexité. Elle permet de se forger un avis éclairé.",
	},
	[cst.RATING]: {
		0: "Je ne comprends pas bien ce commentaire.",
		1: "Je pense que ce commentaire n'apporte rien.",
		2: "Je ne trouve pas ce commentaire pertinent, mais je comprends que pour quelqu'un d'autre il puisse l'être.",
		3: "Je suis partagé quant à ce commentaire. Certains points soulevés me semblent pertinents mais l'ensemble n'est pas satisfaisant.",
		4: "Ce commentaire me semble pertinent et tout personne lisant le contenu associé gagnerait à en prendre connaissance.",
		5: "Ce commentaire devrait être épinglé à ce contenu de façon à ce que tout le monde en prenne connaissance.",
		6: "Ce commentaire est celui que j'aurai aimé écrire. Attention, on ne peut donner 6 étoiles qu'à un seul commentaire par objet (sujet, ressource, problème, solution, ou commentaire)."
	},
}

export default EXPLICATIONS