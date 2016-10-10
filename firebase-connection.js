/**
 * Created by helga on 07.10.16.
 */

import Firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBreVH135DsM13KGuUvjSJVL4H6LZq43Us",
	authDomain: "test-8d654.firebaseapp.com",
	databaseURL: "https://test-8d654.firebaseio.com",
	storageBucket: "test-8d654.appspot.com",
	messagingSenderId: "101705867127"
};
Firebase.initializeApp(config);
var db = Firebase.database();

var newsRef = db.ref("news");

var initialNews = require("./news.json");
var index = 0;
function setItemIntoBase() {
	if (index < initialNews.length) {
		let item = initialNews[index];
		item.date = (new Date(item.date)).toISOString();
		newsRef.push(item);
		index++;
	}
}

setInterval(setItemIntoBase, 2000);

