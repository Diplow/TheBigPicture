
export const itemCreation = {
  ratings: {
    title: "A raisonné !",
    message: "Votre raison a bien été prise en compte.",
    type: "success"
  },
  bigpictures: {
    title: "Vue créée",
    message: "Votre vue a bien été créée.",
    type: "success"
  },
  subscriptions: {
    title: "Nouvel abonnement",
    message: "Vous avez un nouvel abonnement.",
    type: "success"
  },
  "endorsments": {
    title: "A voté !",
    message: "Votre vote a bien été pris en compte.",
    type: "success"
  }
}

export const itemModification = {
  bigpictures: {
    title: "Vue modifiée",
    message: "Votre vue a bien été modifiée.",
    type: "success"
  },
  ratings: {
    title: "Raison modifiée",
    message: "Votre raison a bien été modifiée.",
    type: "success"
  },
  users: {
    title: "Utilisateur modifié",
    message: "Vous avez bien modifié votre profil.",
    type: "success"
  },
  "endorsments": {
    title: "Vote modifié !",
    message: "Votre vote a bien été modifié.",
    type: "success"
  }
}

export const itemDeletion = {
  bigpictures: {
    title: "Vue supprimée",
    message: "Votre vue a bien été supprimée.",
    type: "success"
  },
  ratings: {
    title: "Raison supprimée",
    message: "Votre raison a bien été supprimée.",
    type: "success"
  },
  subscriptions: {
    title: "Abonnement annulé",
    message: "Votre abonnement a bien été annulé.",
    type: "success"
  },
  "endorsments": {
    title: "Vote annulé.",
    message: "Vous êtes revenu sur votre vote.",
    type: "success"
  }
}

export const DELETION_FAIL = {
  title: "Erreur de communication avec le serveur - L'objet n'a pas probablement pas été supprimé.",
  message: "Rafraîchissez la page (attention si vous avez un contenu en cours d'édition, vous perdrez vos dernières modifications) et si le problème persiste, n'hésitez pas à reporter ce bug à diplo@vue-d-ensemble.fr",
  type: "warning"
}

export const GET_FAIL = {
  title: "Erreur de communication avec le serveur",
  message: "Rafraîchissez la page (attention si vous avez un contenu en cours d'édition, vous perdrez vos dernières modifications) et si le problème persiste, n'hésitez pas à reporter ce bug à diplo@vue-d-ensemble.fr",
  type: "warning"
}

export const SERVER_ERROR = (error) => ({
  title: "Erreur de communication avec le serveur",
  message: error,
  type: "warning"
})

export const TITLE_ERROR = {
  title: "La vue n'a pas pu être créée",
  message: "Le champ titre doit être renseignée et suffisament court.",
  type: "warning"
}

export const REFERENCE_ERROR = {
  title: "La vue n'a pas pu être créée",
  message: "La référence n'existe pas (ou alors elle est privée et ne peut donc pas être référencée).",
  type: "warning"
}

export const WELCOME = (username) => ({
  title: "Identification réussie",
  message: "Bienvenue " + username,
  type: "success"
})

export const LOGOUT = {
  title: "Déconnexion réussie",
  message: "Vous devrez vous authentifier à nouveau pour utiliser votre compte.",
  type: "success"
}

export const IDENTIFICATION_FAIL = {
  title: "L'identification a échoué",
  message: "Êtes-vous certains d'avoir entré la bonne combinaison identifiant / mot de passe ?",
  type: "warning"
}

export const SESSION_EXPIRED = {
  title: "Session expirée",
  message: "Vous devez vous authentifier à nouveau pour réaliser cette action.",
  type: "warning"
}

export const SERVER_ERROR_500 = (action) => ({
  title: "Erreur de communication avec le serveur",
  message: "L'action " + action + " n'a pas pu être réalisée, vous pouvez contacter l'administrateur de la plateforme.",
  type: "warning"
})
