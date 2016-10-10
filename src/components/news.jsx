import React from 'react';
import NewsData from '../firebase-connection';

import NewListNews from './newListNews.jsx';
import ArchiveListNews from './archiveListNews.jsx';

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
		this.firebaseRef = NewsData;
		this.firebaseRef.on('value', (newsList) => {
			var newItems = [],
				archiveItems = [];
			newsList.forEach((newsItem) => {
				const item = newsItem.val();
				item['.key'] = newsItem.key;
				if (!item.archive) {
					newItems.push(item);
				} else {
					archiveItems.push(item);
				}
				this.setState({
					newItems: this.orderByDate(newItems),
					archiveItems: this.orderByDate(archiveItems)
				});
			});
		});
	}

	componentWillUnmount() {
		this.firebaseRef.off();
	}

	orderByDate(list) {
		let sortedList = list.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime()
		});
		return sortedList;
	}

	onChangeTitle(e) {
		this.setState({title: e.target.value});
	}

	onChangeBody(e) {
		this.setState({body: e.target.value});
	}

	removeItem(key) {
		let firebaseRef = NewsData;
		firebaseRef.child(key).remove();
	}

	archiveItem(key) {
		let firebaseRef = NewsData;
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
		return (
			<div className="container">
				<form onSubmit={ this.handleSubmit }>
					<input placeholder="Type title" onChange={ this.onChangeTitle } value={ this.state.title } />
					<input placeholder="Type body" onChange={ this.onChangeBody } value={ this.state.body } />
					<button>{ 'Add news' + (this.state.newItems.length + 1) }</button>
				</form>
				<NewListNews newItems={ this.state.newItems } archiveItem={ this.archiveItem } />
				<ArchiveListNews archiveItems={ this.orderByDate(this.state.archiveItems) } removeItem={ this.removeItem } />
			</div>
		);
	}
}

