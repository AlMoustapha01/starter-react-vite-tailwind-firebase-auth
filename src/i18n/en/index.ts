import type { Translation } from '../i18n-types'

const en = {
	// this is an example Translation, just rename or delete this folder if you want
	HI: 'Hallo {name}! Bitte hinterlasse einen Stern, wenn dir das Projekt gefällt: https://github.com/ivanhofer/typesafe-i18n',
	header:{
		login:'Login',
		sign_up:'Sign up',
		sign_out:'Logout'
	},
	home:{
		title:"React project starter",
		subtitle:"Start your react projects with a basic set of components",
		feature:{
			title:"Features"
		},
		tools:{
			title:"Tools"
		}
	},
	sign_up:{
		title:"Sign up with new account",
		sub_title:"Start your journey with us",
		name:"First name & Last name",
		email:"Email",
		phone:"Phone number",
		email_match_error:"Invalid email format",
		password:"Password",
		password_match_minuscule: "Must contains at least one minuscule character",
		password_match_majuscule: "Must contains at least one majuscule character",
		password_match_number: "Must contains at least one number",
		password_match_length: "Must be eight characters minimum",
		confirm_password:"Confirm Password",
		confirm_password_match:"Passwords must match",
		send:"Create account",
		signin_message:"Already have an account?",
		signin_text:"Sign in",
		forgot_password_message:"Don't remember your password?",
		required:"{field}! is required",
	},
	sign_in:{
		title:"Sign in",
		sub_title:"Continue your journey with us",
		email:"Email",
		email_match_error:"Invalid email format",
		password:"Password",
		
		send:"Login",
		signup_message:"Already don't have an account?",
		signup_text:"Sign up",
		forgot_password_message:"Don't remember your password ?",
		required:"{field}! est requis",
	},
	forgot_password:{

	},
	profile:{
		title:"User profile",
		name:"First name & Last name",
		email:"Email",
		phone:"Phone number",
		email_match_error:"Invalid email format",
		required:"{field}! est requis",
		modify:"Modify your profile",
		send:"Update frofile",
		confirm:"confirm"
	},
} satisfies Translation

export default en;
