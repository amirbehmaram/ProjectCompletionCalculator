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
        let actualNumDays;

        // If it's under 6 hours then just say today, accounting for if today is a weekend.
        if (this.state.hours <= 6) {
            let startDate = Moment(this.state.startDate);

            if (startDate.isoWeekday() === 6) {
                actualNumDays = 2;
            } else if (startDate.isoWeekday() === 7) {
                actualNumDays = 1;
            } else {
                actualNumDays = 0;
            }
        } else {
            // We want the ceiling because the work would overflow into the next day if we have a remainder
            let numDays = Math.ceil(this.state.hours / 6);
            let startDate = Moment(this.state.startDate);
            actualNumDays = numDays;

            // Account for weekends because work suxs on the weekends.
            for (let i = 0; i < numDays; i++) {
                let tempDate = Moment(startDate).add(i, 'days');
                console.log(tempDate.toString());

                if (tempDate.isoWeekday() === 6 || tempDate.isoWeekday() === 7) {
                    actualNumDays += 1;
                }
            }

            console.log("Num Days: " + numDays);
            console.log("Actual Days: " + actualNumDays);   
        }

        this.setState({ endDate: Moment(this.state.startDate).add(actualNumDays, 'days').calendar() });
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