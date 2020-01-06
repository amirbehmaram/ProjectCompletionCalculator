import React from 'react';
import Moment from 'moment';
import './Calculator.css';

class ProjectCompletionCalc extends React.Component {
    constructor() {
        // Have to call super to give our components access to these bad boys
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
        // We want to update the end date after we set the start date also so call End Date update via callback 
        this.setState(
            {startDate: e.target.value},
            this.updateEndDate
        );
    }

    updateEndDate() { 
        let actualEndDate;
        let startDate = Moment(this.state.startDate);

        // If it's under 6 hours then just say today, accounting for if today is a weekend.
        if (this.state.hours <= 6) {
            let actualNumDays = 0;

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
            
            // Inclusive of today
            numDays -= 1;
            let calcEndDate = Moment(this.state.startDate).add(numDays, 'days');
            this.adjustForWeekends(calcEndDate);

            // Get the number of weeks between the start and end so we can figure out how many
            // Weekend days we will need to skip.
            let numWeeks = calcEndDate.diff(startDate, 'weeks');
            let weekendDaysToAdd = numWeeks * 2;
            let additionalDays = 0;

            // Check if the new date will overlap any additional weekends and get an additional count of them
            for (let i = 1; i <= weekendDaysToAdd; i++) {
                let tempDate = Moment(this.state.startDate).add(numDays, 'days');
                let dayOfWeek = tempDate.add(i, 'days');

                if (dayOfWeek.isoWeekday() === 6 || dayOfWeek.isoWeekday() === 7) {
                    additionalDays++;
                }
            }

            /**
             * Add numDays which is just our sum total of days including weekends.
             * Add weekendDaysToAdd which is how many weekends were included in numDays
             * Add additionalDays which account for any weekends that were added from the result of numDays + weekendDaysToAdd
             */
            actualEndDate = Moment(this.state.startDate).add((numDays + weekendDaysToAdd + additionalDays), 'days');
            this.adjustForWeekends(actualEndDate);
            
            actualEndDate = actualEndDate.format("dddd, MM/DD/YYYY");
        }

        this.setState({ endDate: actualEndDate });
    }

    /**
     * Accepts a Moment.js obj and moves the date of it to the neatest weekday
     * 
     * @param {*} momentObj A Moment.js obj
     * 
     * @return null Since its an object it gets passed by reference so that's rad
     */
    adjustForWeekends(momentObj) {
        if (momentObj.isoWeekday() === 6) {
            momentObj.add(2, 'days');
        } else if (momentObj.isoWeekday() === 7) {
            momentObj.add(1, 'days');
        }
    }

    render() {
        return (
            <section className="calculator">
                <h1 className="calculator__title">Project Completion Calculator</h1>
                <p><b>The otter will do the math for you.</b></p>
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