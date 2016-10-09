import React from 'react';

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


export class NewList extends React.Component {
	render() {
		const _this = this;
		var newNews = function(item, index) {
			return (
				<li key={ index }>
					<div>{ item.title }  <i>{ item.date }</i></div>
					<div>
						{ item.body }
					</div>
          <span onClick={ _this.props.archiveItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            Archived
          </span>
				</li>
			);
		};
		return <ul>{ this.props.newItems.map(newNews) }</ul>;

	}
}

export class ArchiveListNews extends React.Component {
	render() {
		const _this = this;
		console.log(this.props);
		var archiveNews = function(item, index) {
			return (
				<li key={ index }>
					<div>{ item.title }  <i>{ item.date }</i></div>
					<div>
						{ item.body }
					</div>
          <span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            Remove
          </span>
				</li>
			);
		};
		return <ul>{ this.props.archiveItems.map(archiveNews) }</ul>;

	}
}


export default class News extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			newItems: [],
			archiveItems: [],
			title: '',
			body: ''
		};

		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeBody = this.onChangeBody.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}




	componentWillMount() {
		this.firebaseRef = Firebase.database().ref('news');
		this.firebaseRef.on('value', (newsList) => {
			var newItems = [],
				archiveItems = [];
			newsList.forEach((newsItem) => {
				const item = newsItem.val();
				item['.key'] = newsItem.key;
				console.log(item);
				if (!item.archive) {
					newItems.push(item);
				} else {
					archiveItems.push(item);
				}
				this.setState({
					newItems,
					archiveItems
				});
			});
		});
	}

	componentWillUnmount() {
		this.firebaseRef.off();
	}

	onChangeTitle(e) {
		this.setState({title: e.target.value});
	}

	onChangeBody(e) {
		this.setState({body: e.target.value});
	}

	removeItem(key) {
		let firebaseRef = Firebase.database().ref('news');
		firebaseRef.child(key).remove();
	}

	archiveItem(key) {
		let firebaseRef = Firebase.database().ref('news');
		firebaseRef.child(key).update({archive: true});

	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.title && this.state.title.trim().length !== 0 &&
			this.state.body && this.state.body.trim().length !== 0) {
			this.firebaseRef.push({
				title: this.state.title,
				body: this.state.body,
				date: (new Date()).toISOString()
			});
			this.setState({
				title: '',
				body: ''
			});
		}
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<form onSubmit={ this.handleSubmit }>
					<input placeholder="Type title" onChange={ this.onChangeTitle } value={ this.state.title } />
					<input placeholder="Type body" onChange={ this.onChangeBody } value={ this.state.body } />
					<button>{ 'Add news' + (this.state.newItems.length + 1) }</button>
				</form>
				<NewList newItems={ this.state.newItems } archiveItem={ this.archiveItem } />
				<ArchiveListNews archiveItems={ this.state.archiveItems } removeItem={ this.removeItem } />
			</div>
		);
	}
}

