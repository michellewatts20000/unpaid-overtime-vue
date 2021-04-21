Vue.use(VueCleave);

var app = new Vue({
    // the element to apply the code to
    el: '#app',
    //define the variables
    data: {
        email: '',
        occupation: '',
        industry: '',
        salary: '',
        years: '',
        finish: '',
        start: '',
        working_days: 230,
        total_days: 260,
        working_hours: 7.5,
        button_text: 'Submit',
        calculated: false,
        unpaid_overtime: '',
        dollar_options: {
            prefix: '$',
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        }
    },
    watch: {
        total_unpaid_overtime: function () {

        },

    },


    methods: {

        // time: function () {





        // },

        // returns unpaid overtime
        total_unpaid_overtime: function () {


            newStart = this.start.split(':')
            newFinish = this.finish.split(':')

            newTime = (newFinish[0] - newStart[0]) - 7.5


            totalOvertime = newTime * 230
            salaryDay = this.salary / 260
            salaryHour = salaryDay / 7.5
            result = totalOvertime * salaryHour

            return Math.ceil(result)
        },

        // returns unpaid overtime
        total_hours_overtime: function () {
            newStart = this.start.split(':')
            newFinish = this.finish.split(':')

            newTime = (newFinish[0] - newStart[0]) - 7.5


            totalOvertime = newTime * 230

            return totalOvertime
        },


        submitForm: function () {

            //show loading animation
            this.button_text =
                '<i style="color:white; font-size: 1.1em;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';

            var formData = {
                "person": {

                    "email_addresses": [{
                        "address": this.email,
                    }],

                    "custom_fields": {
                        "Industry": this.industry,
                        "Occupation/Role": this.occupation,
                        "Salary": this.salary,
                        "Retire": this.retire


                    },

                },


                "triggers": {
                    "autoresponse": {
                        "enabled": true
                    }

                },

                "add_tags": [
                    "C: Save Super",
                    "I: Superannuation",
                    "A: Calculator"

                ]

            };


            axios.post(
                'https://actionnetwork.org/api/v2/forms/3b7e6aba-b5b9-4d3f-a29d-f7c65d934441/submissions',
                formData, {

                }).then(data => {
                this.calculated = true;
                console.log(data);
                this.button_text = 'Submit';
            })



        },


        // makes sure input is a number
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },

        // only shows the result if the years and salary have been entered
        showHide: function () {
            if (this.salary > 0 && this.years > 0) {
                this.calculated = true;
            } else {
                this.calculated = false;
            }
        },






    },


});