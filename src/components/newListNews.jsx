import React from 'react';
export default class NewListNews extends React.Component {
	render() {
		const _this = this;
		var newNews = function(item, index) {
			return (
				<li key={ index }>
					<div>{ item.title }  <i>{ item.date }</i></div>
					<div>
						{ item.body }
					</div>
					<span className="archive btn" onClick={ _this.props.archiveItem.bind(null, item['.key']) }>
            Archived
          </span>
				</li>
			);
		};
		return <div className="wrapper-list">
			<div className="title">New news</div>
			<ul>{ this.props.newItems.map(newNews) }</ul>
		</div>

	}
}