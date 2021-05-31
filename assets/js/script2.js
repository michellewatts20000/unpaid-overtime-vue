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
        start: '9:00am',
        finish: '5:00pm',
        fifteenmin: '15',
        thirtymin: '30',
        fortyfivemin: '45',
        sixtymin: '60',
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
        // turns string into a number, converts it to 24 hour time if it's past 12pm
        startTime: function () {
            var arr = this.start.split(':');
            var dec = parseInt((arr[1] / 6) * 10, 10);
            var startTime = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
            console.log("startTime", startTime);
            return startTime
        },

        finishTime: function () {
            var arr = this.finish.split(':');
            var dec = parseInt((arr[1] / 6) * 10, 10);
            var finishTime = parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
            console.log("finishTime", finishTime);
            return finishTime
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