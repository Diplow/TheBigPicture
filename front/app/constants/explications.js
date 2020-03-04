import * as cst from './index'

const EXPLICATIONS = {
	[cst.PROBLEM]: {
		0: "Je ne comprends pas bien ce problème.",
		1: "Ce problème n'en est pas un.",
		2: "Ce problème n'est pas important.",
		3: "Ce problème pourrait être important.",
		4: "Ce problème est important.",
		5: "Ce problème est excellent.",
	},
	[cst.RESOURCE]: {
		0: "Je ne comprends pas bien cette ressource.",
		1: "Cette ressource est contre productive.",
		2: "Cette ressource est inutile.",
		3: "Cette ressource pourrait être utile.",
		4: "Cette ressource est utile.",
		5: "Cette ressource est excellente.",
	},
	[cst.SOLUTION]: {
		0: "Je ne comprends pas bien cette solution.",
		1: "Cette solution posera davantage de problème qu'elle n'en résoudra.",
		2: "Cette solution ne sera pas efficace.",
		3: "Cette solution pourrait aider à résoudre le problème.",
		4: "Cette solution est efficace.",
		5: "Cette solution est excellente.",
	},
	[cst.SUBJECT]: {
		0: "Je ne comprends pas bien ce sujet.",
		1: "Ce sujet est néfaste.",
		2: "Ce sujet est inintéressant.",
		3: "Ce sujet pourrait être intéressant.",
		4: "Ce sujet est intéressant.",
		5: "Ce sujet est excellent.",
	},
	[cst.RATING]: {
		0: "Je ne comprends pas bien ce commentaire.",
		1: "Ce commentaire est néfaste.",
		2: "Ce commentaire n'est pas pertinent.",
		3: "Ce commentaire pourrait être pertinent.",
		4: "Ce commentaire est pertinent.",
		5: "Ce commentaire est excellent.",
		6: "Ce commentaire est celui que j'aurai aimé écrire. Attention, on ne peut donner 6 étoiles qu'à un seul commentaire par objet (sujet, ressource, problème, solution, ou commentaire)."
	},
}

export default EXPLICATIONS