import type { BaseTranslation } from '../i18n-types'

const fr = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	header:{
		login:'Se connecter',
		sign_up:'S\'inscrire',
		sign_out:'Deconnexion'
	},
	home:{
		title:"Démarreur de projet React",
		subtitle:"Démarrer vos projets react avec un ensemble de composant de bases",
		feature:{
			title:"Fonctionnalité"
		},
		tools:{
			title:"Outils"
		}
	},
	sign_up:{
		title:"S'inscrire avec un nouveau compte",
		sub_title:"Commencez votre parcours avec nous",
		name:"Prénom & nom",
		phone:"Téléphone",
		email:"Email",
		email_match_error:"Format d'email invalide",
		password:"Mot de passe",
		password_match_minuscule: "Doit contenir au moins un caractère minuscule",
		password_match_majuscule: "Doit contenir au moins un caractère majuscule",
		password_match_number: "Doit contenir au moins un chiffre",
		password_match_length: "Doit comporter au moins huit caractères",
		confirm_password:"Confirmer le mot de passe",
		confirm_password_match:"Les mots de passe doivent correspondre",
		send:"Créer un compte",
		signin_message:"Disposez-vous déjà d'un compte ?",
		signin_text:"Se connecter",
		forgot_password_message:"Avez-vous oublié votre mot de passe ?",
		required:"{field:LocalizedString}! est requis",
	},
	sign_in:{
		title:"Connexion",
		sub_title:"Poursuivez votre voyage avec nous",
		email:"Email",
		email_match_error:"Format d'email invalide",
		password:"Mot de passe",
		
		send:"Se connecter",
		signup_message:"Vous ne disposez pas de compte ?",
		signup_text:"S'inscrire",
		forgot_password_message:"Avez-vous oublié votre mot de passe ?",
		required:"{field:LocalizedString}! est requis",
	},
	profile:{
		title:"Profile utilisateur",
		name:"Prénom & nom",
		phone:"Téléphone",
		email:"Email",
		email_match_error:"Format d'email invalide",
		required:"{field:LocalizedString}! est requis",
		modify:"Modifier votre profile",
		send:"Mettre à jour",
		confirm:"confirmer"
	},
	forgot_password:{

	}
} satisfies BaseTranslation

export default fr;
