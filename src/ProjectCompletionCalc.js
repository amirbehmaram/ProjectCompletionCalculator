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
            { hours: parseInt(e.target.value) }, 
            this.updateEndDate
        );
    }

    updateStartDate(e) {
        this.setState(
            {startDate: e.target.value},
            this.updateEndDate
        );
    }

    updateEndDate() { 
        let actualEndDate;

        // If it's under 6 hours then just say today, accounting for if today is a weekend.
        if (this.state.hours <= 6) {
            let actualNumDays = 0;
            let startDate = Moment(this.state.startDate);

            if (startDate.isoWeekday() === 6) {
                actualNumDays = 2;
            } else if (startDate.isoWeekday() === 7) {
                actualNumDays = 1;
            } else {
                actualNumDays = 0;
            }
            actualEndDate = Moment(this.state.startDate).add(actualNumDays, 'days').format("dddd, MM/DD/YYYY");

        } else {
            // We want the ceiling because the work would overflow into the next day if we have a remainder
            let numDays = Math.ceil(this.state.hours / 6);

            console.log("Number of days of work: " + numDays);

            // Minus 1 from number of Days since add skips today's work
            numDays -= 1;

            let calcEndDate = Moment(this.state.startDate).add(numDays, 'days');

            console.log("Calculated End: " + calcEndDate.toString());

            // What we can use to determine whether or not to add days.
            // Will need to add in the loop to go through all the days and count
            // How many weekends we are going to skip through still
            if (calcEndDate.isoWeekday() === 6) {
                actualEndDate =  Moment(this.state.startDate).add(numDays + 2, 'days').format("dddd, MM/DD/YYYY");
            } else if (calcEndDate.isoWeekday() === 7) {
                actualEndDate =  Moment(this.state.startDate).add(numDays + 2, 'days').format("dddd, MM/DD/YYYY");
            } else {
                actualEndDate = Moment(this.state.startDate).add(numDays, 'days').format("dddd, MM/DD/YYYY");
            }  
            
            console.log("Actual End: " + actualEndDate);
        }

        // Define and update our End Date
        this.setState({ endDate: actualEndDate });
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
                        <output name="ExpectedEndValue" htmlFor="StartDate HoursInput" id="ExpectedEndDate" value={this.state.endDate.toString()}>{this.state.endDate.toString()}</output>
                    </div> 
                </form>
            </section>
        );
    }
}

export default ProjectCompletionCalc;