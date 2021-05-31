Vue.use(VueCleave);

var app = new Vue({
    // the element to apply the code to
    el: '#app',

    //define the variables
    data: {
        email: '',
        occupation: '',
        industry: '',
        salary_unformatted: '',
        years: '',
        finish: '5:00pm',
        start: '9:00am',
        yeslunch: '',
        nolunch: '',
        fulltime: false,
        parttime: false,
        working_days: 230,
        total_days: 260,
        working_hours: 8,
        button_text: 'Submit',
        calculated: false,
        unpaid_overtime: '',
        dollar_options: {
            prefix: '$',
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        },
        time_options: [
            '5:00am',
            '6:00am',
            '7:00am',
            '8:00am',
            '9:00am',
            '10:00am',
            '11:00am',
            '12:00pm',
            '1:00pm',
            '2:00pm',
            '3:00pm',
            '4:00pm',
            '5:00pm',
            '6:00pm',
            '7:00pm',
            '8:00pm',
            '9:00pm',
            '10:00pm',
            '11:00pm',
            '12:00am',
            '1:00am',
            '2:00am',
            '3:00am',
            '4:00am'
        ]
    },


    methods: {
        // turns string into a number, converts it to 24 hour time if it's past 12pm
        newStart: function () {
            newStart2 = this.start.split('');
            newStart = this.start.split(':');
            console.log(newStart);

            if (newStart2[5] == 'p' || newStart2[4] == 'p') {
                var integer = parseInt(newStart[0], 10);
                bestStart = integer + 12;
                console.log(bestStart);
            } else {
                var integer = parseInt(newStart[0], 10);
                bestStart = integer;
                console.log(bestStart);
                return bestStart;
            }
        },

        newFinish: function () {
            newFinish2 = this.finish.split('');
            newFinish = this.finish.split(':');
            console.log(newFinish);

            if (newFinish2[5] == 'p' || newFinish2[4] == 'p') {
                var integer2 = parseInt(newFinish[0], 10);
                bestFinish = integer2 + 12;
                console.log(bestFinish);
            } else {
                var integer2 = parseInt(newFinish[0], 10);
                bestFinish = integer2;
                console.log(bestFinish);
                return bestFinish;
            }
        },

        lunchOrNot: function () {
            if (this.nolunch === 'nolunch') {
                this.working_hours = 7.5;
                return this.working_hours;
            } else {
                this.working_hours = 8;
                return this.working_hours;
            }
        },

        // returns unpaid overtime
        total_unpaid_overtime: function (newStart, newFinish, lunchOrNot) {
            newStart();
            newFinish();
            lunchOrNot();

            if (bestStart > bestFinish) {
                newTimeBegin = (bestStart - bestFinish) / 2;
                newTime = newTimeBegin - this.working_hours;
                console.log(bestStart, bestFinish, this.working_hours);
                console.log(newTime);
            } else {
                newTime = bestFinish - bestStart - this.working_hours;
                console.log(bestFinish, bestStart, this.working_hours);
                console.log(newTime);
            }

            if (newTime < 0) {
                console.log(newTime);
                alert('this calculator only works with a minimum 7.5 hour day');
                this.calculated = false;
                return;
            }

            this.salary = this.salary_unformatted.replace(/\D/g, '');
            totalOvertime = newTime * 230;
            salaryDay = this.salary / 260;
            salaryHour = salaryDay / 8.0;
            result = totalOvertime * salaryHour;
            return Math.ceil(result);
        },

        // returns total hours of unpaid overtime
        total_hours_overtime: function (newStart, newFinish, lunchOrNot) {
            newStart();
            newFinish();
            lunchOrNot();

            if (bestStart > bestFinish) {
                newTimeBegin = (bestStart - bestFinish) / 2;
                newTime = newTimeBegin - this.working_hours;
                console.log(bestStart, bestFinish, this.working_hours);
                console.log(newTime);
            } else {
                newTime = bestFinish - bestStart - this.working_hours;
                console.log(newTime);
            }

            totalOvertime = newTime * 230;
            return totalOvertime;
        },

        submitForm: function () {
            //show loading animation
            this.button_text =
                '<i style="color:white; font-size: 1.1em;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';

            var formData = {
                person: {
                    email_addresses: [{
                        address: this.email
                    }],

                    custom_fields: {
                        Industry: this.industry,
                        'Occupation/Role': this.occupation,
                        Salary: this.salary,
                        Retire: this.retire
                    }
                },

                triggers: {
                    autoresponse: {
                        enabled: true
                    }
                },

                add_tags: ['C: Unpaid Overtime', 'A: Calculator']
            };

            axios
                .post(
                    'https://actionnetwork.org/api/v2/forms/3b7e6aba-b5b9-4d3f-a29d-f7c65d934441/submissions',
                    formData, {}
                )
                .then(data => {
                    this.calculated = true;
                    console.log(data);
                    this.button_text = 'Submit';
                });
        }
    }
});