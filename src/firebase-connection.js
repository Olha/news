/**
 * Created by olha on 10.10.16.
 */

import Firebase from 'firebase';

// Initialize Firebase on frontend
const config = {
	apiKey: "AIzaSyBreVH135DsM13KGuUvjSJVL4H6LZq43Us",
	authDomain: "test-8d654.firebaseapp.com",
	databaseURL: "https://test-8d654.firebaseio.com",
	storageBucket: "test-8d654.appspot.com",
	messagingSenderId: "101705867127"
};

Firebase.initializeApp(config);
var NewsData = Firebase.database().ref('news');
export default NewsData;



