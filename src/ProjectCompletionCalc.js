import React from 'react';
import Moment from 'moment';
import './Calculator.css';

class ProjectCompletionCalc extends React.Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            startDate: '',
            endDate: ''
        }
    }

    updateHours(e) {  
        // We want to update the end date after we set the hours so call End Date update via callback   
        this.setState(
            { hours: e.target.value }, 
            this.updateEndDate
        );
    }

    updateStartDate(e) {
        this.setState({startDate: e.target.value});
    }

    updateEndDate() {
        // If it's under 6 hours then just say today.
        if (this.state.hours < 6) {
            this.setState({ endDate: Moment(this.state.startDate) });
        } else {
            // We want the ceiling because the work would overflow into the next day if we get a fraction
            let numDays = Math.ceil(this.state.hours / 6);
            let endDateVal = Moment(this.state.startDate).add(numDays, 'days').calendar();
            this.setState({ endDate: endDateVal });
        }
    }

    render() {
        return (
            <section className="calculator">
                <h1 className="calculator__title">Project Completion Calculator</h1>
                <form className="calculator__form">
                <div className="calculator__form-block">
                        <label htmlFor="StartDate">Start Date: </label>
                        <input 
                            id="StartDate" 
                            type="date" 
                            value={this.state.startDate} 
                            onChange={e => this.updateStartDate(e)}
                        />
                    </div>
                    <div className="calculator__form-block">
                        <label htmlFor="HoursInput">Hours Given: </label>
                        <input 
                            id="HoursInput" 
                            type="number" 
                            value={this.state.hours} 
                            onChange={e => this.updateHours(e)}
                        />
                    </div>
                    <div className="calculator__form-block">
                        <label htmlFor="ExpectedEndDate">Expected End Date: </label>
                        <output name="ExpectedEndValue" id="ExpectedEndDate" value={this.state.endDate.toString()}>{this.state.endDate.toString()}</output>
                    </div> 
                </form>
            </section>
        );
    }
}

export default ProjectCompletionCalc;