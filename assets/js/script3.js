Vue.use(VueCleave);

var app = new Vue({
    // the element to apply the code to
    el: '#app2',
    //define the variables
    data: {
        email: '',
        industry: '',
        salary_unformatted: '',
        daysWorked: '',
        paidHours: '',
        actualHours: '',
        fifteenmin: '',
        thirtymin: '',
        fortyfivemin: '',
        sixtymin: '',
        yeslunch: '',
        nolunch: '',
        fulltime: false,
        parttime: false,
        working_days: 230,
        total_days: 260,
        working_hours: 7.6,
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
            '5:30am',
            '6:00am',
            '6:30am',
            '7:00am',
            '7:30am',
            '8:00am',
            '8:30am',
            '9:00am',
            '9:30am',
            '10:00am',
            '10:30am',
            '11:00am',
            '11:30am',
            '12:00pm',
            '12:30pm',
            '1:00pm',
            '1:30pm',
            '2:00pm',
            '2:30pm',
            '3:00pm',
            '3:30pm',
            '4:00pm',
            '4:30pm',
            '5:00pm',
            '5:30pm',
            '6:00pm',
            '6:30pm',
            '7:00pm',
            '7:30pm',
            '8:00pm',
            '8:30pm',
            '9:00pm',
            '9:30pm',
            '10:00pm',
            '10:30pm',
            '11:00pm',
            '11:30pm',
            '12:00am',
            '12:30am',
            '1:00am',
            '1:30am',
            '2:00am',
            '2:30am',
            '3:00am',
            '3:30am',
            '4:00am',
            '4:30am'
        ]
    },

    methods: {
        // turns start time into a decimal, converts it to 24 hour time if it's past 12pm
        startTime: function () {
            arr = this.start.split(':');
            arr2 = arr[1].split('')
            if (arr2[2] == 'p') {
                arr3 = arr2[0] * 10
                dec = parseInt((arr3 / 6) * 10, 10);
                startTimeResult = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec) + 12;
                return startTimeResult
            } else {
                arr3 = arr2[0] * 10
                dec = parseInt((arr3 / 6) * 10, 10);
                startTimeResult = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
                return startTimeResult
            }
        },

        // turns finish time into a decimal, converts it to 24 hour time if it's past 12pm
        finishTime: function () {
            arr = this.finish.split(':');
            arr2 = arr[1].split('')
            if (arr2[2] == 'p') {
                arr3 = arr2[0] * 10
                dec = parseInt((arr3 / 6) * 10, 10);
                finishTimeResult = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec) + 12;
                return finishTimeResult
            } else {
                arr3 = arr2[0] * 10
                dec = parseInt((arr3 / 6) * 10, 10);
                finishTimeResult = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
                return finishTimeResult
            }
        },

        // did they check the lunch break radio and what to do with that
        lunchOrNot: function () {
            if (this.nolunch === 'nolunch') {
                workingHours = 7.1;
                return workingHours;
            } else {
                workingHours = 8;
                return workingHours;
            }
        },

        // did they select any extra time outside of work
        extraTime2: function () {
            if (this.fifteenmin === '15') {
                extraTimeRes = 0.25 * 365;
                return extraTimeRes
            } else if (this.thirtymin === '30') {
                extraTimeRes = 0.5 * 365;
                return extraTimeRes
            } else if (this.fortyfivemin === '45') {
                extraTimeRes = 0.75 * 365;
                return extraTimeRes;
            } else if (this.sixtymin === '60') {
                extraTimeRes = 1 * 365;
                return extraTimeRes;
            } else {
                extraTimeRes = 0;
                return extraTimeRes;
            }
        },

        dailySalary: function () {
            formattedSalary = this.salary_unformatted.replace(/\D/g, '');
            dailySalaryRes = (formattedSalary / 260) / 7.6;
            return dailySalaryRes;
        },

        overtimeEachYear: function (startTime, finishTime, lunchOrNot, extraTime, dailySalary) {
            startTime();
            finishTime();
            lunchOrNot();
            extraTime();
            dailySalary();
            oneDay = (finishTimeResult - startTimeResult) - workingHours;
            eachYear = oneDay * 230
            plusExtra = eachYear + extraTimeRes


            overtimeDollars = plusExtra * dailySalaryRes
            console.log("overtime $$", overtimeDollars.toFixed(2));
            console.log("one day", oneDay);
            console.log("each year", eachYear);
            console.log("plus extra", plusExtra);
            console.log("startTimeResult", startTimeResult);
            console.log("finishTimeResult", finishTimeResult);
            console.log("lunch", workingHours);
            console.log("extra", extraTimeRes);
            console.log("unformatted salary", this.salary_unformatted);
            console.log("formatted salary", formattedSalary);
            console.log("daily salary res", dailySalaryRes.toFixed(2));

            return '$' + overtimeDollars.toFixed(0) + ' for ' + plusExtra.toFixed(2)

        },



        submitForm: function () {
            this.calculated = true;
            // //show loading animation
            // this.button_text =
            //     '<i style="color:white; font-size: 1.1em;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';

            // var formData = {
            //     person: {
            //         email_addresses: [{
            //             address: this.email
            //         }],

            //         custom_fields: {
            //             Industry: this.industry,
            //             Salary: this.salary,
            //             Retire: this.retire
            //         }
            //     },

            //     triggers: {
            //         autoresponse: {
            //             enabled: true
            //         }
            //     },

            //     add_tags: ['C: Unpaid Overtime', 'A: Calculator']
            // };

            // axios
            //     .post(
            //         'https://actionnetwork.org/api/v2/forms/3b7e6aba-b5b9-4d3f-a29d-f7c65d934441/submissions',
            //         formData, {}
            //     )
            //     .then(data => {
            //         this.calculated = true;
            //         console.log(data);
            //         this.button_text = 'Submit';
            //     });

        }
    }
});