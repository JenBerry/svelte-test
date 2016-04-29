const ReactDOM = require('react-dom');
const React = require('react');
const html = require('./index.html');
const styles = require('./styles.scss');
const scripts = require('./scripts');

const data = [
		{code:"booking_id", desc:"Filter using the ID of a Booking", selected: false, category:"booking", visible:true},
		{code:"booking_status", desc:"Filter using the STATUS of a Booking", selected: false, category:"booking", visible:true},
		{code:"pickup_address", desc:"Filter using the PICKUP ADDRESS of a Booking", selected: false, category:"booking", visible:true},
		{code:"dropoff_address", desc:"Filter using the DROPOFF ADDRESS of a Booking", selected: false, category:"booking", visible:true},
		{code:"passenger_name", desc:"Filter using the Name of a Passenger", selected: false, category:"passanger", visible:true},
		{code:"passenger_surname", desc:"Filter using the Surname of a Passenger", selected: false, category:"passanger", visible:true},
		{code:"driver_ref_no", desc:"Filter using the Ref No of a Driver", selected: false, category:"driver", visible:true},
];

const Filter = (props) => {
	return (
		<div className='filter' data-code={props.code}>
			<span>{props.code} </span>
			<input type='text' />
			{' '}
			<span className='close' onClick={props.onClick}>x</span>
		</div>
	);
};
const FilterBox = React.createClass({
	handleClick(code){
		this.props.removeFilter(code);
	},
	handleInput(event){
		this.props.updateInput(event.target.innerHTML);
	},
	render(){
		const filters = this.props.filters.map((filter,i)=>{
			const boundClick = this.handleClick.bind(this, filter.code);
			return(
				<Filter key={i} code={filter.code} onClick={boundClick}/>
			);
		}, this);
		return(
			<div className="filter-box">
				<div>
					<div className="filters">
						{filters}
					</div>
					<span className="main-input" contentEditable="true" onInput={this.handleInput}>{this.props.input}</span>
				</div>
			</div>
		);
	}
});

const FilterListItem = (props) => {
	return (
		<li data-code={props.code} onClick={props.onClick}>
			<span className="code">{props.code} </span>
			<span className="desc">{props.desc}</span>
		</li>
	);
};

const FilterList = React.createClass({
	handleClick(code){
		this.props.addFilter(code);
	},
	render(){
		const filterListItems = this.props.filters.map((filter, i)=>{
			const boundClick = this.handleClick.bind(this, filter.code)
			return (<FilterListItem key={i} code={filter.code} desc={filter.desc} onClick={boundClick} />)
		}, this);
		return(
			<ul className={this.props.category + "-filters"}>
				{filterListItems}
			</ul>
		);
	}
});


const FilterLists = React.createClass({
	render(){
		const sortFintersIntoLists = (filters) =>{
			const filterLists = [];
			filters.forEach((e)=>{
				const newCategory = e.category;
				const existingCategoryIndex = filterLists.findIndex((f)=> f.category === newCategory);
				if (existingCategoryIndex === -1){
					filterLists.push({category: newCategory, filters:[e]})
				} else {
					filterLists[existingCategoryIndex].filters.push(e)
				}
			});
			return filterLists;
		};
		let filterLists = sortFintersIntoLists(this.props.filters);
		filterLists = filterLists.map((filter, i)=>{
			return (<FilterList key={i} filters={filter.filters} category={filter.category} addFilter={this.props.addFilter} />)
		}, this);
		return(
			<div className="filter-list">
				{filterLists}
			</div>
		);
	}
});

const App = React.createClass({
	getInitialState(){
		return{filterData: data, input:""};
	},
	addFilter(code){
		const indexOfFilter = this.state.filterData.findIndex((e)=>e.code === code);
		const newData = this.state.filterData;
		newData[indexOfFilter].selected = true;
		newData.forEach((e)=>{
				e.visible = true
		});
		this.setState({filterData:newData, input:""});
	},
	removeFilter(code){
		const indexOfFilter = this.state.filterData.findIndex((e)=>e.code === code);
		const newData = this.state.filterData;
		newData[indexOfFilter].selected = false;
		this.setState({filterData:newData});
	},
	updateInput(text){
		let newData = this.state.filterData;
		newData.forEach((e)=>{
			if (e.code.startsWith(text)){
				e.visible = true
			} else {
				e.visible = false
			};
		});
		this.setState({filterData: newData, input:text});
	},
	render(){
		const selectedFilters = this.state.filterData.filter((e)=>e.selected);
		const unselectedFilters = this.state.filterData.filter((e)=>!e.selected);
		const visibleFilters = unselectedFilters.filter((e)=>e.visible);
		return (
			<div className="filter-bar">
				<div className="container">
					<FilterBox filters={selectedFilters} removeFilter={this.removeFilter} updateInput={this.updateInput} input={this.state.input} />
					<FilterLists filters={visibleFilters} addFilter={this.addFilter} />
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<App />, 
	document.getElementById('app')
);