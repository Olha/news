import React from 'react';
export default class ArchiveListNews extends React.Component {
	render() {
		const _this = this;
		var archiveNews = function(item, index) {
			return (
				<li key={ index }>
					<div>{ item.title }  <i>{ item.date }</i></div>
					<div>
						{ item.body }
					</div>
          <span className='remove btn' onClick={ _this.props.removeItem.bind(null, item['.key']) }>
            Remove
          </span>
				</li>
			);
		};
		return <div className="wrapper-list">
               	<div className="title archive">New news</div>
               	<ul>{ this.props.archiveItems.map(archiveNews) }</ul>;
            </div>
	}
}