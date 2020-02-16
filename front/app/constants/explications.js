import * as cst from './index'

const EXPLICATIONS = {
	[cst.PROBLEM]: {
		0: "Je ne comprends pas bien ce problème.",
		1: "Je pense que pour toute personne raisonnable, ce problème n'en est pas un.",
		2: "Je ne pense pas que ce problème structure la vue d'ensemble, mais je comprends que d'autres personnes raisonnables puissent le penser.",
		3: "Je suis partagé quant à ce problème. Il ne me semble pas très structurant tel quel, mais il met le doigt sur quelque chose.",
		4: "Ce problème est structurant pour la vue d'ensemble, et devrait être adressé.",
		5: "Ce problème structure totalement cette vue d'ensemble et me semble résolvable.",
	},
	[cst.RESOURCE]: {
		0: "Je ne comprends pas bien cette ressource.",
		1: "Je pense que cette ressource embrouille la vue d'ensemble, est hors sujet ou une fake news.",
		2: "Je ne pense pas que cette ressource aide à appréhender la vue d'ensemble, mais je comprends qu'elle puisse être considérée utile pour une autre analyse que la mienne.",
		3: "Je suis partagé quant à cette ressource. Elle met en avant des éléments intéressants mais en l'état je ne suis pas sûr de bien voir comment elle éclaire la vue d'ensemble.",
		4: "Cette ressource contribue à une meilleure compréhension de la vue d'ensemble.",
		5: "Cette ressource permet de tout comprendre rapidement et simplement. Elle donne l'essentiel des éléments pour juger par soi-même.",
	},
	[cst.SOLUTION]: {
		0: "Je ne comprends pas bien cette solution.",
		1: "Je pense que cette solution ne règlera pas le problème, qu'elle est impossible à implémenter ou qu'elle provoquera des problèmes plus grave que ceux qu'elle résout.",
		2: "Je pense que cette solution ne changera pas grand chose, qu'elle ne pourra pas être implémentée correctement ou qu'elle provoquera des effets de bord indésirables.",
		3: "Je pense que cette solution pourrait fonctionner mais j'ai encore des doutes quant à son efficacité et à sa faisabilité.",
		4: "Je pense qu'on gagnerait à essayer cette solution, elle devrait résoudre au moins une partie du problème, mais je ne pense pas qu'on puisse s'en contenter.",
		5: "Je suis convaincu que cette solution est faisable et efficace pour régler le problème.",
	},
	[cst.SUBJECT]: {
		0: "Je ne comprends pas bien cette solution.",
		1: "Je pense que cette solution ne règlera pas le problème, qu'elle est impossible à implémenter ou qu'elle provoquera des problèmes plus grave que ceux qu'elle résout.",
		2: "Je pense que cette solution ne changera pas grand chose, qu'elle ne pourra pas être implémentée correctement ou qu'elle provoquera des effets de bord indésirables.",
		3: "Je pense que cette solution pourrait fonctionner mais j'ai encore des doutes quant à son efficacité et à sa faisabilité.",
		4: "Je pense qu'on gagnerait à essayer cette solution, elle devrait résoudre au moins une partie du problème, mais je ne pense pas qu'on puisse s'en contenter.",
		5: "Je suis convaincu que cette solution est faisable et efficace pour régler le problème.",
	},
	[cst.RATING]: {
		0: "Je ne comprends pas bien ce commentaire.",
		1: "Je pense que ce commentaire n'apporte rien.",
		2: "Je ne trouve pas ce commentaire pertinent, mais je comprends que pour quelqu'un d'autre il puisse l'être.",
		3: "Je suis partagé quant à ce commentaire. Certains points soulevés me semblent pertinents mais l'ensemble n'est pas satisfaisant.",
		4: "Ce commentaire me semble pertinent et tout personne lisant le contenu associé gagnerait à en prendre connaissance.",
		5: "Ce commentaire devrait être épinglé à ce contenu de façon à ce que tout le monde en prenne connaissance.",
		6: "Ce commentaire est celui que j'aurai aimé écrire. Attention, on ne peut donner 6 étoiles qu'à un seul commentaire par objet (sujet, ressource, problème, solution, référence ou commentaire)."
	},
}

export default EXPLICATIONS